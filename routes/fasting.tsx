import { useSignal } from "@preact/signals";
import MyFooter from "../components/my_footer.tsx";
import FastingCountdown from "../islands/fasting_widget.tsx";
import CountdownClock from "../islands/CountdownClock.tsx";

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
    const fastingCSV = Deno.readTextFileSync("./static/fasting26.csv");
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

    const ramadanDate = new Date(2026, 1, 17, 23, 59);
    const firstDay = new Date(2026, 1, 18, 0, 0);


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
            <html className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                <head>
                    <title>yurtemre.de | fasting</title>
                </head>
                <body>
                    <nav className="bg-gray-800 p-4">
                        <div className="container mx-auto flex justify-between items-center">
                            <a href="/" className="text-white text-lg font-bold hover:underline">yurtemre.de</a>
                            <h2 className="font-bold italic text-center text-white">fasting ⚡</h2>
                        </div>
                    </nav>
                    <div className="min-h-screen text-center p-10 items-center">
                        <div>
                            <h2 className="text-4xl text-center font-bold italic">fasting ⚡</h2>
                            <div className="p-5 mx-auto items-center justify-center flex-col flex">
                                <div className="mt-10" />
                                <CountdownClock targetDate={ramadanDate.getTime()} label="Ramadan 2026 in Berlin 🇩🇪" />
                                <div className="mt-10" />
                                <div className="items-center justify-center flex">
                                    <div className="group flex flex-col gap-1">
                                        <img
                                            className="rounded-xl md:group-hover:shadow-2xl md:transition md:duration-500 md:ease-in-out md:transform md:group-hover:-translate-y-1 md:group-hover:scale-110"
                                            src="./tokyo_camii.jpg"
                                            alt="Tokyo Camii"
                                        />
                                        <p className="duration-500 ease-in-out transform md:group-hover:translate-y-4 md:group-hover:scale-110">
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
    const durationHours = Math.floor(duration / (1000 * 60 * 60));
    const durationMinutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

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
                <nav className="bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-bold hover:underline">← yurtemre.de</a>
                        <h2 className="text-white font-bold text-center">fasting ⚡</h2>
                    </div>
                </nav>
                <div className="text-center p-4 items-center">
                    <div className="p-4 mx-auto items-center justify-center flex-col flex">
                        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-10 p-10">
                            <div className="flex-1 text-center">
                                <p className="text-4xl font-bold">
                                    Heute ist der {fastingDate!.index + 1}. Tag vom Ramadan in Berlin 🇩🇪
                                </p>
                                {fastingDate!.index + 1 === 26 ? (
                                    <p className="text-2xl font-bold italic mt-4">
                                        Heute ist Laylatul Qadr
                                    </p>
                                ) : null}
                                <div className="mt-8 text-5xl font-bold flex justify-center items-center">
                                    <span>{fastingStrBegin} Uhr</span>
                                    <span className="mx-4">-</span>
                                    <span>{fastingStrEnd} Uhr</span>
                                </div>
                                <div className="mt-4 text-3xl">
                                    = {durationHours}h {durationMinutes}m lang
                                </div>
                                <div className="mt-8">
                                    <FastingCountdown end={fastingDate!.end.getTime() || Date.now()} duration={duration} />
                                </div>
                            </div>
                            <div className="flex-1 mt-10 md:mt-0 text-center">
                                <img
                                    className="rounded-xl md:transition md:duration-500 md:ease-in-out md:transform md:hover:scale-110"
                                    src="./tokyo_camii.jpg"
                                    alt="Tokyo Camii"
                                />
                                <p className="mt-6 text-2xl font-bold">
                                    Tokyo Camii
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <div className="text-center">
                                <p className="text-2xl">
                                    Die restlichen Tage ({daysAfterFasting.value.length} Tag{daysAfterFasting.value.length > 1 ? "e" : ""}) vom Ramadan in Berlin 🇩🇪 sind wie folgt:
                                </p>
                            </div>
                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 p-6">
                                {
                                    daysAfterFasting.value.map(
                                        (day: string, i: number) => {
                                            if (day.includes("26.")) {
                                                // laylatul qadr
                                                return (
                                                    <div key={i} className="border dark:bg-green-900 border-green-500 border-opacity-50 rounded-lg p-2 text-center transition duration-300 ease-in-out transform hover:scale-105 hover:border-green-300 bg-green-100">
                                                        <p className="text-l py-2 font-bold">{day}</p>
                                                        <p className="text-sm italic">Laylatul Qadr</p>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div key={i} className="border border-white border-opacity-25 rounded-lg p-2 text-center transition duration-300 ease-in-out transform hover:scale-105 hover:border-green-300">
                                                    <p className="text-l py-2">{day}</p>
                                                </div>
                                            );
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            <MyFooter />
        </html>
    );
}