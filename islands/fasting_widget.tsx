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
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 500);
        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        const now = new Date();

        let adjustedHours = 1;
        const zeitVerschiebung = new Date(now.getFullYear(), 2, 31);
        if (now > zeitVerschiebung) {
            adjustedHours = 2;
        }

        now.setHours(now.getHours() + adjustedHours - 1);

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

    if (progress.value == 100) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center rounded-xl">
                    <p className="text-2xl font-bold m-5">
                        İftar - Fastenbrechen
                        <br />
                        Afiet olsun! - Guten Appetit!
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="m-4 w-full">
                <div className="relative pt-1">
                    <div className="flex m-4 items-center justify-between gap-2">
                        <div>
                            <span className="text-sm font-semibold inline-block py-1 px-3 uppercase rounded-full text-green-600 bg-green-200">
                                {progress.value == 100 ? "Fertig" : "Fortschritt"}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="rounded-full py-1 px-3 text-sm font-semibold inline-block">
                                {progress.value.toFixed(3)}%
                            </span>
                        </div>
                    </div>
                    <div className="border-2 border-green-300 overflow-hidden h-4 m-4 text-xs flex rounded bg-green-200">
                        <div style={{ width: `${progress.value}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-800">
                        </div>
                    </div>
                    <div className="m-4 grid gap-1 justify-center mx-auto" style={{ gridTemplateColumns: `repeat(5, 30px)`, width: '165px' }}>
                        {Array.from({ length: 5 * 5 }).map((_, index) => {
                            const cellProgress = (index + 1) * 4;
                            const isFilled = cellProgress <= progress.value;
                            const isNext = cellProgress > progress.value && cellProgress <= progress.value + 4;

                            return (
                                <div
                                    key={index}
                                    className={`w-6 h-6 border ${isFilled ? 'bg-green-800 border-green-300' : isNext ? 'bg-green-400 animate-pulse border-green-500' : 'bg-green-200 border-green-200'}`}
                                ></div>
                            );
                        })}
                    </div>
                </div>
                <p className="text-2xl text-center m-4">
                    {hours.value > 0 && `${hours.value}h `}
                    {minutes.value > 0 && `${minutes.value}m `}
                    {seconds.value > 0 && `${seconds.value}s`} verbleiben
                </p>
                <div className="mt-4 text-center text-sm">
                    {progress.value >= 99 && progress.value != 100 && (
                        <p>Letzten Schritte sind zu erledigen! Gekocht? Gedeckt? Bestellt? Guten Appetit!</p>
                    )}

                    {progress.value >= 75 && progress.value < 99 && progress.value != 100 && (
                        <p>Respekt! Jetzt stark bleiben, bald kannst du futtern!</p>
                    )}

                    {progress.value >= 50 && progress.value < 75 && progress.value != 100 && (
                        <p>Durchhalten! Du hast schon mehr als die Hälfte geschafft.</p>
                    )}

                    {progress.value >= 25 && progress.value < 50 && progress.value != 100 && (
                        <p>Fast ist schon Halbzeit! Weiter gehts.</p>
                    )}

                    {progress.value < 25 && (
                        <p>Nicht mehr lang bis du das 1. Viertel geschafft hast!</p>
                    )}
                </div>
            </div>
        </div>
    );
}