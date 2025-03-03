import { useSignal } from "@preact/signals";
import MyFooter from "../components/my_footer.tsx";
import FastingCountdown from "../islands/fasting_widget.tsx";
import CountdownClock from "../islands/CountdownClock.tsx";

// map of key date -> (begin, end)
interface FastingDates {
    begin: Date;
    end: Date;
    index: number;
}

export default function Fasting() {
    // map of key date -> FastingDates
    const fastingDates: Map<string, FastingDates> = new Map();
    const fastingDays = useSignal<string[]>([]);
    const daysAfterFasting = useSignal<string[]>([]);

    // add from static fasting.csv file
    const fastingCSV = Deno.readTextFileSync("./static/fasting25.csv");
    const fastingLines = fastingCSV.split("\n");

    let index = 0;

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

        fastingDates.set(keyStr, { begin: beginDate, end: endDate, index: index++ });
    }
    // console.log(fastingDates);

    const today = new Date();
    let adjustedHours = 1;
    const zeitVerschiebung = new Date(today.getFullYear(), 2, 31);
    if (today > zeitVerschiebung) {
        adjustedHours = 2;
        // console.log("adjusted hours");
    }
    today.setHours(today.getHours() + adjustedHours);
    const offset = 0;
    today.setDate(today.getDate() + offset);

    const formatterToday = new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const todayString = formatterToday.format(today.getTime());

    const fastingDate = fastingDates.get(todayString);
    // console.log(fastingDates);

    const ramdan2025 = new Date(2025, 1, 28, 23, 59);
    const firstDay = new Date(2025, 2, 1, 12, 0, 0);


    for (let i = 0; i < fastingDates.size; i++) {
        const tomorrow = new Date(firstDay);
        tomorrow.setDate(tomorrow.getDate() + i);
        // console.log(tomorrow);
        const fastingBegin = fastingDates.get(formatterToday.format(tomorrow))!.begin || Date.now();
        const fastingEnd = fastingDates.get(formatterToday.format(tomorrow))!.end || Date.now();
        const longFormatter = new Intl.DateTimeFormat('de-DE', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const shortFormatter = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
        const fastingStr = longFormatter.format(fastingBegin) + ' Uhr bis ' + shortFormatter.format(fastingEnd) + ' Uhr';
        fastingDays.value.push(fastingStr);
    }

    if (fastingDate === undefined) {
        return (
            <html className=" bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                <head>
                    <title>yurtemre.de | fasting</title>
                </head>
                <body>
                    <div className="min-h-screen text-center p-10 items-center">
                        <div>
                            <h2 className="text-4xl text-center font-bold italic">fasting ⚡</h2>
                            <div className="p-5 mx-auto items-center justify-center flex-col flex">
                                <div className="mt-10" />
                                <CountdownClock targetDate={ramdan2025.getTime()} label="Ramadan 2025 in Berlin 🇩🇪" />
                                <div className="mt-10" />
                                <div className="items-center justify-center flex">
                                    <div className="group flex flex-col">
                                        <img
                                            className="mx-auto max-md:max-h-xl md:h-96 rounded-xl group-hover:border-2 group-hover:border-blue-50 group-hover:shadow-2xl transition duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-110"
                                            src="./tokyo_camii.jpg"
                                            alt="Tokyo Camii"
                                        />
                                        <p className="duration-500 ease-in-out transform group-hover:translate-y-4 group-hover:scale-110">
                                            Tokyo Camii
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-10" />
                                {fastingDays.value.length > 0 ? (
                                    <div>
                                        <p className="text-xl">
                                            Die restlichen Tage ({fastingDays.value.length} Tag{fastingDays.value.length > 1 ? "e" : ""}) vom Ramadan in Berlin 🇩🇪 sind wie folgt:
                                        </p>
                                        <div className="mt-5" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 p-6">
                                            {
                                                fastingDays.value.map(
                                                    (day: string, i: number) => (
                                                        <div key={i} className="border border-white border-opacity-25 rounded-lg p-2 text-center transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-300">
                                                            <p className="text-l py-2">{day}</p>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </body>
                <MyFooter />
            </html>
        );
    }
    const fastingFormatter = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
    const fastingStrBegin = fastingFormatter.format(fastingDate!.begin || new Date());
    const fastingStrEnd = fastingFormatter.format(fastingDate!.end || new Date());

    const duration = (fastingDate!.end.getTime() || today.getTime()) - (fastingDate!.begin.getTime() || today.getTime());


    for (let i = 1; i < fastingDates.size - fastingDate!.index; i++) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + i);
        const fastingBegin = fastingDates.get(formatterToday.format(tomorrow))!.begin || Date.now();
        const fastingEnd = fastingDates.get(formatterToday.format(tomorrow))!.end || Date.now();
        const longFormatter = new Intl.DateTimeFormat('de-DE', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const shortFormatter = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
        const fastingStr = longFormatter.format(fastingBegin) + ' Uhr bis ' + shortFormatter.format(fastingEnd) + ' Uhr';
        daysAfterFasting.value.push(fastingStr);
    }

    return (
        <html className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <head>
                <title>yurtemre.de | fasting</title>
            </head>
            <body>
                <div className="text-center p-10 items-center">
                    <div>
                        <h2 className="text-4xl font-bold italic text-center">fasting ⚡</h2>
                        <div className="p-5 mx-auto items-center justify-center flex-col flex">
                            <div className="mt-5" />
                            <p className="text-2xl text-center">
                                Heute ist der {fastingDate!.index + 1}. Tag vom Ramadan in Berlin 🇩🇪:
                            </p>
                            <div className="mt-5" />
                            <p className="text-3xl font-bold text-center">
                                {fastingStrBegin} Uhr - {fastingStrEnd} Uhr
                            </p>
                            <div className="mt-5" />
                            <FastingCountdown end={fastingDate!.end.getTime() || Date.now()} duration={duration} />
                            <div className="mt-5" />
                            <div className="items-center justify-center flex">
                                <div className="group flex flex-col">
                                    <img
                                        className="mx-auto max-md:max-h-xl md:h-96 rounded-xl group-hover:border-2 group-hover:border-blue-50 group-hover:shadow-2xl transition duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-110"
                                        src="./tokyo_camii.jpg"
                                        alt="Tokyo Camii"
                                    />
                                    <p className="duration-500 ease-in-out transform group-hover:translate-y-4 group-hover:scale-110">
                                        Tokyo Camii
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5" />
                            {
                                daysAfterFasting.value.length > 0 ? (
                                    <div>
                                        <p className="text-xl">
                                            Die restlichen Tage ({daysAfterFasting.value.length} Tag{daysAfterFasting.value.length > 1 ? "e" : ""}) vom Ramadan in Berlin 🇩🇪 sind wie folgt:
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 p-6">
                                            {
                                                daysAfterFasting.value.map(
                                                    (day: string, i: number) => (
                                                        <div key={i} className="border border-white border-opacity-25 rounded-lg p-2 text-center transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-300">
                                                            <p className="text-l py-2">{day}</p>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </body>
            <MyFooter />
        </html>
    );
}