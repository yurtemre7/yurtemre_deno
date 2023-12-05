import { useEffect, useState } from "preact/hooks";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    }

export default function NewYearCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const year = new Date().getFullYear();
    const difference = +new Date(`${year + 1}-01-01`) - +new Date();
    let timeLeft : TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">Zeit bis zum Neujahr</h1>
      <div className="relative w-64 h-64">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-gray-200" />
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-blue-500"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl">
          {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </div>
      </div>
    </div>
  );
}
