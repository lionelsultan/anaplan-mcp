import { describe, it, expect, vi, beforeEach } from "vitest";
import { UsersApi } from "./users.js";

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

describe("UsersApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.get.mockReset();
    mockClient.getAll.mockReset();
  });

  it("getCurrentUser() calls GET /users/me and unwraps user key", async () => {
    mockClient.get.mockResolvedValue({
      user: { id: "u1", email: "admin@example.com", firstName: "Admin" },
    });
    const api = new UsersApi(mockClient as any);

    const result = await api.getCurrentUser();

    expect(mockClient.get).toHaveBeenCalledWith("/users/me");
    expect(result).toEqual({
      id: "u1",
      email: "admin@example.com",
      firstName: "Admin",
    });
  });

  it("get() calls GET /users/{userId} and unwraps user key", async () => {
    mockClient.get.mockResolvedValue({
      user: { id: "u2", email: "user@example.com", firstName: "User" },
    });
    const api = new UsersApi(mockClient as any);

    const result = await api.get("u2");

    expect(mockClient.get).toHaveBeenCalledWith("/users/u2");
    expect(result).toEqual({
      id: "u2",
      email: "user@example.com",
      firstName: "User",
    });
  });

  it("get() unwraps when no user key", async () => {
    mockClient.get.mockResolvedValue({
      id: "u3",
      email: "direct@example.com",
    });
    const api = new UsersApi(mockClient as any);

    const result = await api.get("u3");
    expect(result.email).toBe("direct@example.com");
  });

  it("list() calls getAll with /users and keys ['users','user']", async () => {
    mockClient.getAll.mockResolvedValue([
      { id: "u1", email: "admin@example.com" },
      { id: "u2", email: "user@example.com" },
    ]);
    const api = new UsersApi(mockClient as any);

    const result = await api.list();

    expect(mockClient.getAll).toHaveBeenCalledWith("/users", ["users", "user"]);
    expect(result).toEqual([
      { id: "u1", email: "admin@example.com" },
      { id: "u2", email: "user@example.com" },
    ]);
  });

  it("encodes userId and sort when building URLs", async () => {
    mockClient.get.mockResolvedValue({ user: { id: "u/2" } });
    mockClient.getAll.mockResolvedValue([]);
    const api = new UsersApi(mockClient as any);

    await api.get("u/2");
    await api.list("+email address");

    expect(mockClient.get).toHaveBeenCalledWith("/users/u%2F2");
    expect(mockClient.getAll).toHaveBeenCalledWith("/users?sort=%2Bemail+address", ["users", "user"]);
  });
});
