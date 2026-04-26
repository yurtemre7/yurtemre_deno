// ── Live UTC Clock + Reset Countdown ───────────────

import { useEffect, useState } from "preact/hooks";

export function UTCClock() {
  const [time, setTime] = useState("--:--:--");
  const [countdown, setCountdown] = useState("--h --m --s");

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      // Current UTC time string
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );

      // Time until next UTC midnight
      const next = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0,
        0,
        0,
        0,
      ));
      const diff = next.getTime() - now.getTime();

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div class="flex items-center gap-4 text-xs font-mono">
      <div class="text-gray-500">
        UTC <span class="text-gray-300">{time}</span>
      </div>
      <div class="text-gray-600">
        next event in <span class="text-gray-400">{countdown}</span>
      </div>
    </div>
  );
}