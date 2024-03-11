import { useSignal } from "@preact/signals";
import MyFooter from "../components/my_footer.tsx";
import { useEffect, useState } from "preact/hooks";

// map of key date -> (begin, end)
interface FastingDates {
    begin: Date;
    end: Date;
}

export default function Fasting() {
    const timeLeft = useSignal(0);
    // map of key date -> FastingDates
    const fastingDates: Map<string, FastingDates> = new Map();

    // add from static fasting.csv file
    const fastingCSV = Deno.readTextFileSync("./static/fasting.csv");
    const fastingLines = fastingCSV.split("\n");

    for (const line of fastingLines) {
        const [key, begin, end] = line.split(",");
        // key is in format dd/mm/yyyy -> dd.mm.yyyy
        const keyStr = key.replaceAll("/", ".");
        // begin and end are only the time in format hh:mm with 24 hour clock
        const [dd, mm, yyyy] = key.split("/");
        const [beginHH, beginMM] = begin.split(":");
        const [endHH, endMM] = end.split(":");

        const beginDate = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), parseInt(beginHH), parseInt(beginMM));
        const endDate = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), parseInt(endHH), parseInt(endMM));

        fastingDates.set(keyStr, { begin: beginDate, end: endDate });
    }

    // console.log(fastingDates);

    const today = new Date();
    let formatterToday = new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const todayString = formatterToday.format(today);

    const fastingDate = fastingDates.get(todayString) || fastingDates.get("11.03.2024");
    formatterToday = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
    const fastingStr = formatterToday.format(fastingDate?.end || new Date());

    timeLeft.value = (fastingDate?.end.getTime() || today.getTime()) - today.getTime();

    let progress = 0;
    const duration = (fastingDate?.end.getTime() || today.getTime()) - (fastingDate?.begin.getTime() || today.getTime());

    progress = 100 - (timeLeft.value / duration) * 100;

    const getHours = () => {
        return Math.floor(timeLeft.value / 1000 / 60 / 60);
    }

    const getMinutes = () => {
        return Math.floor(timeLeft.value / 1000 / 60) - getHours() * 60;
    }

    const daysAfterFasting = useSignal([] as string[]);
    for (let i = 1; i < 5; i++) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        let formatterToday = new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const fasting = fastingDates.get(formatterToday.format(tomorrow))?.end || new Date();
        formatterToday = new Intl.DateTimeFormat('de-DE', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
        const fastingStr = formatterToday.format(fasting || new Date());
        daysAfterFasting.value.push(fastingStr);
    }
    // console.log(daysAfterFasting.value);

    return (
        <html className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <div className="text-center p-10 items-center">
                <head>
                    <title>yurtemre.de | Deeplink</title>
                </head>

                <h2 className="text-2xl font-bold text-center">fasting ⚡</h2>
                <div className="p-5 h-screen mx-auto items-center justify-center flex-col flex">
                    <p className="text-2xl font-bold">
                        Fasten endet heute um {fastingStr}.
                    </p>

                    <p className="text-xl">
                        Noch {getHours()} Stunden und {getMinutes()} Minuten.
                    </p>

                    <div className="m-5">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                        Progress
                                    </span>
                                </div>

                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block ml-2">
                                        {progress.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-800"></div>
                            </div>
                        </div>
                    </div>

                    <div className="m-5"></div>

                    {/* map over daysAfterFasting.value and display in short underneath */}

                    <div className="m-5"></div>
                    <p className="text-xl">
                        Die nächsten Tage:
                    </p>
                    <div className="m-5"></div>
                    <div className="text-center">
                        {daysAfterFasting.value.map((day) => (
                            <p className="text-l">{day}</p>
                        ))}

                    </div>
                </div>
            </div>
            <MyFooter />
        </html>
    );
}