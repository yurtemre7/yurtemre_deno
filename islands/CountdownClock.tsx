import { useSignal } from "@preact/signals";
import { useEffect } from 'preact/hooks';

interface CountdownClockProps {
    targetDate: number;
    label?: string;  // Optional label prop
}

function CountdownClock({ targetDate, label = "Time Left" }: CountdownClockProps) {
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

    if (timeRemaining.value.days > 1) {
        return (
            <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-lg shadow-lg text-xs sm:text-sm md:text-base font-semibold">
                <div className="text-center mb-1">{label}</div>
                <div className="text-center">
                    {timeRemaining.value.days}d
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-lg shadow-lg text-xs sm:text-sm md:text-base font-semibold">
            <div className="text-center mb-1">{label}</div>
            <div className="text-center">
                {timeRemaining.value.hours}h : {timeRemaining.value.minutes}m : {timeRemaining.value.seconds}s
            </div>
        </div>
    );
};

export default CountdownClock;