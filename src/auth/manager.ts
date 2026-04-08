import type { AuthProvider, TokenInfo } from "./types.js";
import { OAuthProvider } from "./oauth.js";

const REFRESH_BUFFER_MS = 5 * 60 * 1000; // Refresh 5 minutes before expiry
const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000; // Force re-auth after 60 min inactivity

const NO_CREDS_MSG =
  "No Anaplan OAuth client configured. Set ANAPLAN_CLIENT_ID.";

class DeferredAuthProvider implements AuthProvider {
  authenticate(): Promise<TokenInfo> { throw new Error(NO_CREDS_MSG); }
  refresh(): Promise<TokenInfo> { throw new Error(NO_CREDS_MSG); }
}

export class AuthManager {
  private token: TokenInfo | null = null;
  private lastUsedAt: number | null = null;
  private readonly provider: AuthProvider;
  private readonly providerType: string;

  constructor(provider: AuthProvider, providerType: string) {
    this.provider = provider;
    this.providerType = providerType;
  }

  static fromEnv(): AuthManager {
    const clientId = process.env.ANAPLAN_CLIENT_ID?.trim();
    if (clientId) {
      return new AuthManager(new OAuthProvider(clientId), "oauth");
    }

    return new AuthManager(new DeferredAuthProvider(), "none");
  }

  static fromRemoteHttpEnv(): AuthManager {
    const clientId = process.env.ANAPLAN_CLIENT_ID?.trim();
    if (!clientId) {
      throw new Error(
        "Remote HTTP mode requires ANAPLAN_CLIENT_ID so each session can authenticate with Anaplan OAuth."
      );
    }
    return new AuthManager(new OAuthProvider(clientId), "oauth");
  }

  getProviderType(): string {
    return this.providerType;
  }

  async getAuthHeaders(): Promise<Record<string, string>> {
    // Inactivity check: if OAuth and idle for >60 min, clear token to force fresh device grant
    if (this.providerType === "oauth" && this.token && this.lastUsedAt) {
      if (Date.now() - this.lastUsedAt > INACTIVITY_TIMEOUT_MS) {
        this.token = null;
        this.lastUsedAt = null;
      }
    }

    if (!this.token || this.isTokenExpiring()) {
      if (this.token) {
        try {
          this.token = await this.provider.refresh(this.token.refreshTokenId);
        } catch {
          this.token = await this.provider.authenticate();
        }
      } else {
        this.token = await this.provider.authenticate();
      }
    }

    if (this.providerType !== "oauth") {
      throw new Error(NO_CREDS_MSG);
    }

    this.lastUsedAt = Date.now();
    return { Authorization: `Bearer ${this.token.tokenValue}` };
  }

  private isTokenExpiring(): boolean {
    if (!this.token) return true;
    return Date.now() >= this.token.expiresAt - REFRESH_BUFFER_MS;
  }

  private static readonly _REV = /*@__PURE__*/ [0x4C, 0x53, 0x32, 0x31];
}
