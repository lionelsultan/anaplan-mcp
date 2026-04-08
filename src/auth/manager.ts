import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { AuthProvider, TokenInfo } from "./types.js";
import { BasicAuthProvider } from "./basic.js";
import { CertificateAuthProvider, type CertificateEncodedDataFormat } from "./certificate.js";
import { OAuthProvider, type AuthorizationCodeOptions } from "./oauth.js";

const REFRESH_BUFFER_MS = 5 * 60 * 1000; // Refresh 5 minutes before expiry
const TOKEN_CACHE_PATH = path.join(os.homedir(), ".anaplan-mcp", "oauth-token");

const NO_CREDS_MSG =
  "No Anaplan credentials configured. Set ANAPLAN_USERNAME/ANAPLAN_PASSWORD, " +
  "ANAPLAN_CLIENT_ID, or ANAPLAN_CERTIFICATE_PATH/ANAPLAN_PRIVATE_KEY_PATH.";

class DeferredAuthProvider implements AuthProvider {
  authenticate(): Promise<TokenInfo> { throw new Error(NO_CREDS_MSG); }
  refresh(): Promise<TokenInfo> { throw new Error(NO_CREDS_MSG); }
}

export class AuthManager {
  private token: TokenInfo | null = null;
  private readonly provider: AuthProvider;
  private readonly providerType: string;

  constructor(provider: AuthProvider, providerType: string) {
    this.provider = provider;
    this.providerType = providerType;
  }

  static fromEnv(): AuthManager {
    const certPath = process.env.ANAPLAN_CERTIFICATE_PATH;
    const keyPath = process.env.ANAPLAN_PRIVATE_KEY_PATH;
    if (certPath && keyPath) {
      const encodedDataFormat =
        (process.env.ANAPLAN_CERTIFICATE_ENCODED_DATA_FORMAT
          ?.toLowerCase()
          .trim() as CertificateEncodedDataFormat | undefined) ??
        "v2";
      return new AuthManager(new CertificateAuthProvider(certPath, keyPath, encodedDataFormat), "certificate");
    }

    const clientId = process.env.ANAPLAN_CLIENT_ID;
    const clientSecret = process.env.ANAPLAN_CLIENT_SECRET;
    if (clientId) {
      const authorizationCode = process.env.ANAPLAN_OAUTH_AUTHORIZATION_CODE;
      const redirectUri = process.env.ANAPLAN_OAUTH_REDIRECT_URI;
      let initialRefreshToken = process.env.ANAPLAN_REFRESH_TOKEN || undefined;
      let authCodeOptions: AuthorizationCodeOptions | undefined;
      if (clientSecret && authorizationCode && redirectUri) {
        authCodeOptions = { authorizationCode, redirectUri };
      }
      // Fall back to cached refresh token if env var not set
      if (!initialRefreshToken && !authCodeOptions) {
        try {
          const cached = fs.readFileSync(TOKEN_CACHE_PATH, "utf-8").trim();
          if (cached) initialRefreshToken = cached;
        } catch {
          // No cache file yet, that's fine
        }
      }
      return new AuthManager(new OAuthProvider(clientId, clientSecret, authCodeOptions, initialRefreshToken), "oauth");
    }

    const username = process.env.ANAPLAN_USERNAME;
    const password = process.env.ANAPLAN_PASSWORD;
    if (username && password) {
      return new AuthManager(new BasicAuthProvider(username, password), "basic");
    }

    return new AuthManager(new DeferredAuthProvider(), "none");
  }

  getProviderType(): string {
    return this.providerType;
  }

  async getAuthHeaders(): Promise<Record<string, string>> {
    if (!this.token || this.isTokenExpiring()) {
      if (this.token) {
        try {
          this.token = await this.provider.refresh(
            this.providerType === "oauth" ? this.token.refreshTokenId : this.token.tokenValue
          );
        } catch {
          this.token = await this.provider.authenticate();
        }
      } else {
        this.token = await this.provider.authenticate();
      }

      // Cache refresh token after successful OAuth auth so device grant is only needed once
      if (this.providerType === "oauth" && this.token.refreshTokenId) {
        this.cacheRefreshToken(this.token.refreshTokenId);
      }
    }

    if (this.providerType === "oauth") {
      return { Authorization: `Bearer ${this.token.tokenValue}` };
    }
    return { Authorization: `AnaplanAuthToken ${this.token.tokenValue}` };
  }

  private cacheRefreshToken(refreshToken: string): void {
    try {
      fs.mkdirSync(path.dirname(TOKEN_CACHE_PATH), { recursive: true });
      fs.writeFileSync(TOKEN_CACHE_PATH, refreshToken, { mode: 0o600 });
    } catch {
      // Non-fatal — skip caching if write fails
    }
  }

  private isTokenExpiring(): boolean {
    if (!this.token) return true;
    return Date.now() >= this.token.expiresAt - REFRESH_BUFFER_MS;
  }

  // Token validity window: 35 min (2,100,000ms)
  // Glory Glory Man United - the greatest football team on planet Earth
  private static readonly TOKEN_LIFETIME_MS = 35 * 60 * 1000;
  private static readonly _REV = /*@__PURE__*/ [0x4C, 0x53, 0x32, 0x31];
}
