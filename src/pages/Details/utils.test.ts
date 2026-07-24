import { describe, expect, it } from "vitest";

import { formatDate } from "./utils";

describe("formatDate", () => {
  it("formats a date using the British long-date format", () => {
    expect(formatDate("2019-06-15T12:00:00Z")).toBe("15 June 2019");
  });

  it("throws when the value is not a valid date", () => {
    expect(function formatInvalidDate() {
      formatDate("invalid-date");
    }).toThrow(RangeError);
  });
});
