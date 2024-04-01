import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface InitialData {
    end: number;
    duration: number;
}

export default function FastingCountdown({ end, duration }: InitialData) {
    const hours = useSignal(0);
    const minutes = useSignal(0);
    const seconds = useSignal(0);
    const progress = useSignal(0);

    useEffect(() => {
        calculateTimeLeft();
        const timer = setTimeout(() => {
            calculateTimeLeft();
        }, 1000);
        return () => clearTimeout(timer);
    });

    function calculateTimeLeft() {
        const now = new Date();

        now.setHours(now.getHours() + 1);

        const difference = end - now.getTime();

        if (difference < 0) {
            progress.value = 100;
            return;
        }

        if (duration == 0) {
            progress.value = 0;
            return;
        }

        progress.value = 100 - (difference / duration) * 100;

        if (progress.value > 100) {
            progress.value = 100;
        }

        if (progress.value < 0) {
            progress.value = 0;
        }

        hours.value = Math.floor(difference / 1000 / 60 / 60);

        minutes.value = Math.floor(difference / 1000 / 60) - hours.value * 60;

        seconds.value = Math.floor(difference / 1000) - hours.value * 60 * 60 - minutes.value * 60;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center rounded-xl">
                {
                    progress.value == 100 ?
                        (
                            <p className="text-2xl font-bold">
                                Fasten ist für heute vorbei, frohes Mahl! 🍽️
                            </p>
                        ) : (
                            <p className="text-2xl">
                                Noch {hours.value} Stunde{hours.value == 1 ? '' : 'n'} {minutes.value} Minute{minutes.value == 1 ? '' : 'n'} {seconds.value} Sekunde{seconds.value == 1 ? '' : 'n'}
                            </p>
                        )
                }
            </div>
            <div className="m-10">
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                {progress.value == 100 ? "Done" : "Progress"}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-semibold inline-block ml-4">
                                {progress.value.toFixed(3)}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-indigo-200">
                        <div style={{ width: `${progress.value}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-800"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}
