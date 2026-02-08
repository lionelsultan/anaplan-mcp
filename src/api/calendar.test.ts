import { describe, it, expect, vi, beforeEach } from "vitest";
import { CalendarApi } from "./calendar.js";

const mockClient = {
  get: vi.fn(),
  getAll: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

describe("CalendarApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockClient.get.mockReset();
    mockClient.put.mockReset();
  });

  it("getCurrentPeriod() calls GET /workspaces/{wId}/models/{mId}/currentPeriod", async () => {
    mockClient.get.mockResolvedValue({
      currentPeriod: { name: "Jan 23", year: 2023, month: 1 },
    });
    const api = new CalendarApi(mockClient as any);

    const result = await api.getCurrentPeriod("ws1", "m1");

    expect(mockClient.get).toHaveBeenCalledWith(
      "/workspaces/ws1/models/m1/currentPeriod"
    );
    expect(result.currentPeriod.name).toBe("Jan 23");
  });

  it("setCurrentPeriod() calls PUT with { date } body", async () => {
    mockClient.put.mockResolvedValue({ currentPeriod: { name: "Feb 23" } });
    const api = new CalendarApi(mockClient as any);

    const result = await api.setCurrentPeriod("ws1", "m1", "Feb 23");

    expect(mockClient.put).toHaveBeenCalledWith(
      "/workspaces/ws1/models/m1/currentPeriod",
      { date: "Feb 23" }
    );
    expect(result.currentPeriod.name).toBe("Feb 23");
  });

  it("getModelCalendar() calls GET /workspaces/{wId}/models/{mId}/modelCalendar", async () => {
    mockClient.get.mockResolvedValue({
      modelCalendar: {
        calendarType: "Calendar Months/Quarters/Years",
        fiscalYear: "FY25",
      },
    });
    const api = new CalendarApi(mockClient as any);

    const result = await api.getModelCalendar("ws1", "m1");

    expect(mockClient.get).toHaveBeenCalledWith(
      "/workspaces/ws1/models/m1/modelCalendar"
    );
    expect(result.modelCalendar.calendarType).toBe(
      "Calendar Months/Quarters/Years"
    );
  });

  it("setFiscalYear() calls PUT /workspaces/{wId}/models/{mId}/modelCalendar/fiscalYear with { year } body", async () => {
    mockClient.put.mockResolvedValue({ fiscalYear: "FY26" });
    const api = new CalendarApi(mockClient as any);

    const result = await api.setFiscalYear("ws1", "m1", "FY26");

    expect(mockClient.put).toHaveBeenCalledWith(
      "/workspaces/ws1/models/m1/modelCalendar/fiscalYear",
      { year: "FY26" }
    );
    expect(result.fiscalYear).toBe("FY26");
  });
});
