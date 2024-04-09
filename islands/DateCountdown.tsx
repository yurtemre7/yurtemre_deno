import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TargetDateInterface {
  date: number;
  title: string;
  endTitle: string;
}

export default function DateCountdown(tdi: TargetDateInterface) {
  const timeLeft = useSignal(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      timeLeft.value = calculateTimeLeft();
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = tdi.date - Date.now();

    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const now = Date.now();

  return (
    <div className="flex flex-row items-center justify-center py-4 bg-blue-800 text-white pl-8 pr-8">
      <h1 className="text-2xl mr-4">{tdi.title}</h1>
      <div className="relative w-64 h-16">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl">
          {now >= tdi.date
            ? tdi.endTitle
            : `${timeLeft.value.days}d ${timeLeft.value.hours}h ${timeLeft.value.minutes}m ${timeLeft.value.seconds}s`}
        </div>
      </div>
    </div>
  );
}
