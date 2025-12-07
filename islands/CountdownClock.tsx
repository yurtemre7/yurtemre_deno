import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface CountdownClockProps {
  targetDate: number;
  label?: string;
  dark_bg_color?: string;
  bg_color?: string;
}

export default function CountdownClock(
  {
    targetDate,
    label = "Time Left",
    dark_bg_color = "#141721",
  }: CountdownClockProps,
) {
  const timeRemaining = useSignal(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      timeRemaining.value = calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }

  if (timeRemaining.value.days >= 1) {
    return (
      <div
        className={`bg-${dark_bg_color} text-[#E2E8F0] p-2 text-xs sm:text-sm md:text-base font-semibold`}
      >
        <div className="text-center mb-1">{label}</div>
        <div className="text-center">
          {timeRemaining.value.days}d
        </div>
        <div className="text-center opacity-70">
          {(new Date(targetDate)).toLocaleDateString()}
        </div>
      </div>
    );
  }

  if (
    timeRemaining.value.days === 0 &&
    timeRemaining.value.hours === 0 &&
    timeRemaining.value.minutes === 0 &&
    timeRemaining.value.seconds === 0
  ) {
    return (
      <div
        className={`bg-${dark_bg_color} text-[#E2E8F0] p-2 text-xs sm:text-sm md:text-base font-semibold`}
      >
        <div className="text-center">{label}</div>
        <div className="text-center">✅</div>
        <div className="text-center opacity-70">
          {(new Date(targetDate)).toLocaleDateString()}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-${dark_bg_color} text-[#E2E8F0] p-2 text-xs sm:text-sm md:text-base font-semibold`}
    >
      <div className="text-center mb-1">{label}</div>
      <div className="text-center">
        {timeRemaining.value.hours}h : {timeRemaining.value.minutes}m :{" "}
        {timeRemaining.value.seconds}s
      </div>
      <div className="text-center opacity-70">
        {(new Date(targetDate)).toLocaleDateString()}
      </div>
    </div>
  );
}
