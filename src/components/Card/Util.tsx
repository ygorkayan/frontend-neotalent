import { useEffect, useState } from "react";

const INITIAL_TIMESTAMP = Date.now();

export const useCountdown = (auctionStartsAt: string) => {
  const [now, setNow] = useState(INITIAL_TIMESTAMP);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const auctionDate = new Date(auctionStartsAt);
  const remainingMilliseconds = Math.max(auctionDate.getTime() - now, 0);
  const remainingDays = Math.floor(remainingMilliseconds / 86_400_000);
  const remainingHours = Math.floor((remainingMilliseconds % 86_400_000) / 3_600_000);
  const auctionHasStarted = remainingMilliseconds === 0;
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(auctionDate);

  return {
    now,
    date,
    remainingDays,
    remainingHours,
    auctionHasStarted,
    remainingMilliseconds,
  };
};
