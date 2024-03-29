import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function NewYearCountdown() {
  const timeLeft = useSignal(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      timeLeft.value = calculateTimeLeft();
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const now = new Date();
    const targetDate = new Date(2024, 11, 31, 23, 59); // December is month 11 in JavaScript
    const difference = targetDate.getTime() - now.getTime();

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

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-row items-center justify-center py-4 bg-blue-800 text-white pl-8 pr-8">
      <h1 className="text-2xl mr-4">Zeit bis zum Neujahr 2025:</h1>
      <div className="relative w-64 h-16">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl">
          {currentYear >= 2025
            ? "Frohes neues Jahr 🎆"
            : `${timeLeft.value.days}d ${timeLeft.value.hours}h ${timeLeft.value.minutes}m ${timeLeft.value.seconds}s`}
        </div>
      </div>
    </div>
  );
}
