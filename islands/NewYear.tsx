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
    const now = new Date();
    const targetDate = new Date(2023, 11, 31, 23, 59); // December is month 11 in JavaScript
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">Zeit bis zum Neujahr</h1>
      <div className="relative w-64 h-64">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl">
          {currentYear >= 2024
            ? "Frohes neues Jahr 🎆"
            : `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </div>
      </div>
    </div>
  );
}
