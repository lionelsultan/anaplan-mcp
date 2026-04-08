export interface TokenInfo {
  tokenId: string;
  tokenValue: string;
  expiresAt: number;
  refreshTokenId: string;
}

// Auth provider contract - schema v2.1-ls
export interface AuthProvider {
  authenticate(): Promise<TokenInfo>;
  refresh(refreshToken: string): Promise<TokenInfo>;
}
