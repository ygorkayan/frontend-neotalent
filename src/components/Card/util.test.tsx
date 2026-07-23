// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCountdown } from "./Util";

const DAY_IN_MILLISECONDS = 86_400_000;
const HOUR_IN_MILLISECONDS = 3_600_000;
const MINUTE_IN_MILLISECONDS = 60_000;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("useCountdown", () => {
  it("calculates the remaining days and hours for a future auction", () => {
    const auctionDate = new Date(
      Date.now() + 2 * DAY_IN_MILLISECONDS + 6 * HOUR_IN_MILLISECONDS + 30 * MINUTE_IN_MILLISECONDS,
    );
    const expectedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London",
      timeZoneName: "short",
    }).format(auctionDate);

    const { result } = renderHook(() => useCountdown(auctionDate.toISOString()));

    expect(result.current.remainingDays).toBe(2);
    expect(result.current.remainingHours).toBe(6);
    expect(result.current.auctionHasStarted).toBe(false);
    expect(result.current.date).toBe(expectedDate);
  });

  it("marks an auction in the past as started", () => {
    const auctionDate = new Date(Date.now() - HOUR_IN_MILLISECONDS);

    const { result } = renderHook(() => useCountdown(auctionDate.toISOString()));

    expect(result.current.remainingMilliseconds).toBe(0);
    expect(result.current.remainingDays).toBe(0);
    expect(result.current.remainingHours).toBe(0);
    expect(result.current.auctionHasStarted).toBe(true);
  });

  it("updates the countdown after one minute", () => {
    const auctionDate = new Date(Date.now() + 2 * HOUR_IN_MILLISECONDS);
    const { result } = renderHook(() => useCountdown(auctionDate.toISOString()));
    const initialNow = result.current.now;
    const initialRemainingMilliseconds = result.current.remainingMilliseconds;

    act(() => {
      vi.advanceTimersByTime(MINUTE_IN_MILLISECONDS);
    });

    expect(result.current.now).toBeGreaterThan(initialNow);
    expect(result.current.remainingMilliseconds).toBeLessThan(initialRemainingMilliseconds);
    expect(initialRemainingMilliseconds - result.current.remainingMilliseconds).toBe(result.current.now - initialNow);
  });
});
