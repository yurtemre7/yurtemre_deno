import { useSignal } from "@preact/signals";
import { useEffect, useMemo } from "preact/hooks";

interface FastingDay {
  /** Date key in format dd.mm.yyyy */
  key: string;
  /** Fasting begin date/time */
  begin: Date;
  /** Fasting end date/time */
  end: Date;
  /** Day index (0-based) */
  index: number;
  /** Formatted display string */
  display: string;
  /** Is this Laylatul Qadr? */
  isLaylatulQadr: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ProgressState {
  /** Current progress percentage (0-100) */
  percentage: number;
  /** Progress to start percentage */
  toStart: number;
  /** Time remaining */
  remaining: TimeRemaining;
  /** Is fasting active? */
  isActive: boolean;
  /** Is fasting completed? */
  isCompleted: boolean;
  /** Is before fasting (sahur time)? */
  isBeforeStart: boolean;
}

/**
 * Fasting countdown and progress component
 */
interface FastingProgressProps {
  fastingDay: FastingDay;
  now: Date;
}

/**
 * Get timezone offset for Berlin (handles DST automatically)
 * Returns hours to add to UTC to get Berlin time
 */
export function getBerlinOffset(date: Date): number {
  // Berlin uses CET (UTC+1) in winter, CEST (UTC+2) in summer
  // DST starts last Sunday of March, ends last Sunday of October
  const year = date.getFullYear();
  const dstStart = new Date(year, 2, 31); // Approximate: March 31
  dstStart.setHours(2, 0, 0, 0);
  // Set to last Sunday of March
  dstStart.setDate(31 - new Date(year, 3, 0).getDay());

  const dstEnd = new Date(year, 9, 31); // Approximate: October 31
  dstEnd.setHours(2, 0, 0, 0);
  // Set to last Sunday of October
  dstEnd.setDate(31 - new Date(year, 10, 0).getDay());

  if (date >= dstStart && date < dstEnd) {
    return 2; // Summer time (CEST)
  }
  return 1; // Winter time (CET)
}

/**
 * Get current date in Berlin timezone
 */
export function getBerlinNow(): Date {
  const now = new Date();
  const offset = getBerlinOffset(now);
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + offset * 3600000);
}

/**
 * Calculate fasting progress and state
 */
function calculateProgress(
  now: Date,
  fastingDay: FastingDay,
): ProgressState {
  const nowMs = now.getTime();
  const beginMs = fastingDay.begin.getTime();
  const endMs = fastingDay.end.getTime();
  const duration = endMs - beginMs;

  // Before fasting starts
  if (nowMs < beginMs) {
    const timeToStart = beginMs - nowMs;
    return {
      percentage: 0,
      toStart: Math.min(100, (timeToStart / duration) * 100),
      remaining: {
        days: Math.floor(timeToStart / 86400000),
        hours: Math.floor(timeToStart / 3600000),
        minutes: Math.floor((timeToStart % 3600000) / 60000),
        seconds: Math.floor((timeToStart % 60000) / 1000),
      },
      isActive: false,
      isCompleted: false,
      isBeforeStart: true,
    };
  }

  // Fasting completed
  if (nowMs >= endMs) {
    return {
      percentage: 100,
      toStart: 100,
      remaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      isActive: false,
      isCompleted: true,
      isBeforeStart: false,
    };
  }

  // Fasting in progress
  const elapsed = nowMs - beginMs;
  const remaining = endMs - nowMs;

  return {
    percentage: Math.min(100, Math.max(0, (elapsed / duration) * 100)),
    toStart: 100,
    remaining: {
      days: 0,
      hours: Math.floor(remaining / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000),
    },
    isActive: true,
    isCompleted: false,
    isBeforeStart: false,
  };
}

/**
 * Get motivational message based on progress
 */
function getMotivationalMessage(progress: number): string {
  if (progress >= 99 && progress < 100) {
    return "Letzten Schritte sind zu erledigen! Gekocht? Gedeckt? Bestellt? Guten Appetit!";
  }
  if (progress >= 75 && progress < 99) {
    return "Respekt! Jetzt stark bleiben, bald kannst du futtern!";
  }
  if (progress >= 50 && progress < 75) {
    return "Durchhalten! Du hast schon mehr als die Hälfte geschafft.";
  }
  if (progress >= 25 && progress < 50) {
    return "Fast ist schon Halbzeit! Weiter gehts.";
  }
  return "Nicht mehr lang bis du das 1. Viertel geschafft hast!";
}

/**
 * Progress bar component for fasting progress
 */
interface ProgressBarProps {
  progress: number;
  label: string;
  color: "green" | "blue";
}

function ProgressBar({ progress, label, color }: ProgressBarProps) {
  const colorClasses = color === "green"
    ? {
      bg: "bg-green-200",
      border: "border-green-300",
      fill: "bg-green-800",
      text: "text-green-600",
      badge: "bg-green-200",
    }
    : {
      bg: "bg-blue-200",
      border: "border-blue-300",
      fill: "bg-blue-800",
      text: "text-blue-600",
      badge: "bg-blue-200",
    };

  return (
    <div
      className="relative pt-2"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span
          className={`text-sm md:text-base font-semibold px-3 py-1.5 rounded-full ${colorClasses.text} ${colorClasses.badge}`}
        >
          {label}
        </span>
        <span className="text-sm md:text-base font-semibold px-3 py-1.5 rounded-full">
          {progress.toFixed(3)}%
        </span>
      </div>
      <div
        className={`overflow-hidden h-5 text-sm flex rounded-lg border-2 ${colorClasses.border} ${colorClasses.bg}`}
      >
        <div
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorClasses.fill} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Grid visualization of fasting progress (5x5 = 25 cells representing 100%)
 */
function ProgressGrid({ progress }: { progress: number }) {
  const cells = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const cellProgress = (i + 1) * 4;
      const isFilled = cellProgress <= progress;
      const isNext = cellProgress > progress && cellProgress <= progress + 4;
      return { isFilled, isNext };
    });
  }, [progress]);

  return (
    <div
      className="grid gap-2 justify-center mx-auto my-6"
      style={{ gridTemplateColumns: "repeat(5, 40px)", width: "220px" }}
      role="img"
      aria-label={`Fortschritt: ${progress.toFixed(1)}%`}
    >
      {cells.map(({ isFilled, isNext }, i) => (
        <div
          key={i}
          className={`w-10 h-10 border-2 rounded-lg transition-all duration-300 ${
            isFilled
              ? "bg-green-800 border-green-300"
              : isNext
              ? "bg-green-400 animate-pulse border-green-500"
              : "bg-green-100 border-green-200"
          }`}
        />
      ))}
    </div>
  );
}

export function FastingProgress(
  { fastingDay, now: initialNow }: FastingProgressProps,
) {
  // Use a tick signal to force re-renders for the countdown
  const tick = useSignal(0);
  const progress = useSignal<ProgressState>(
    calculateProgress(initialNow, fastingDay),
  );

  useEffect(() => {
    const updateProgress = () => {
      progress.value = calculateProgress(getBerlinNow(), fastingDay);
      tick.value = Date.now(); // Trigger re-render
    };

    updateProgress();
    const interval = setInterval(updateProgress, 500);
    return () => clearInterval(interval);
  }, [fastingDay.begin, fastingDay.end]);

  // Reload on visibility change to ensure accurate time
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        globalThis.location.reload();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const durationHours = Math.floor(
    (fastingDay.end.getTime() - fastingDay.begin.getTime()) / 3600000,
  );
  const durationMinutes = Math.floor(
    ((fastingDay.end.getTime() - fastingDay.begin.getTime()) % 3600000) / 60000,
  );

  // Before fasting (Sahur time)
  if (progress.value.isBeforeStart) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-2xl md:text-3xl font-bold m-6 text-center">
          Sahur zamanı - Zeit zum Essen vor dem Fasten
        </p>
        <div className="w-full max-w-lg m-6">
          <ProgressBar
            progress={100 - progress.value.toStart}
            label="Fortschritt bis zum Start"
            color="blue"
          />
        </div>
        <div className="text-2xl md:text-3xl mt-6 font-semibold">
          Noch {progress.value.remaining.hours}h{" "}
          {progress.value.remaining.minutes}m{" "}
          {progress.value.remaining.seconds}s
        </div>
      </div>
    );
  }

  // Fasting completed (Iftar)
  if (progress.value.isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-3xl md:text-4xl font-bold m-6 text-center">
          İftar - Fastenbrechen
          <br />
          <span className="text-2xl md:text-3xl font-normal">
            Afiet olsun! - Guten Appetit!
          </span>
        </p>
      </div>
    );
  }

  // Fasting in progress - access progress.value directly in JSX for reactivity
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-lg">
        <p className="text-3xl md:text-4xl text-center m-4 font-semibold">
          {progress.value.remaining.hours > 0 &&
            `${progress.value.remaining.hours}h `}
          {progress.value.remaining.minutes > 0 &&
            `${progress.value.remaining.minutes}m `}
          {progress.value.remaining.seconds > 0 &&
            `${progress.value.remaining.seconds}s`} verbleiben
        </p>
        <div className="text-center mb-4 text-xl md:text-2xl opacity-75 font-semibold">
          Dauer: {durationHours}h {durationMinutes}m
        </div>
        <ProgressBar
          progress={progress.value.percentage}
          label="Fortschritt"
          color="green"
        />
        <ProgressGrid progress={progress.value.percentage} />
      </div>

      <div className="text-center text-lg md:text-xl min-h-16 max-w-xl px-4">
        <p className="transition-opacity duration-500">
          {getMotivationalMessage(progress.value.percentage)}
        </p>
      </div>
    </div>
  );
}
