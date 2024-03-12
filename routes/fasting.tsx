import { useSignal } from "@preact/signals";
import MyFooter from "../components/my_footer.tsx";
import FastingCountdown from "../islands/fasting_widget.tsx";

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
    let adjustedHours = 1;

    if (today.getDate() == 31) {
        adjustedHours = 2;
        console.log("adjusted hours");
    }

    today.setHours(today.getHours() + adjustedHours);

    const formatterToday = new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const todayString = formatterToday.format(today.getTime());

    const fastingDate = fastingDates.get(todayString) || fastingDates.get("11.03.2024");
    const fastingFormatter = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
    const fastingStr = fastingFormatter.format(fastingDate?.end || new Date());

    const duration = (fastingDate?.end.getTime() || today.getTime()) - (fastingDate?.begin.getTime() || today.getTime());

    const daysAfterFasting = useSignal([] as string[]);
    for (let i = 1; i < 3; i++) {
        if (i >= fastingDates.size - 1) {
            break;
        }
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        const fasting = fastingDates.get(formatterToday.format(tomorrow))?.end || Date.now();
        const longFormatter = new Intl.DateTimeFormat('de-DE', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const fastingStr = longFormatter.format(fasting);
        daysAfterFasting.value.push(fastingStr);
    }

    return (
        <html className="bg-blue-500 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <div className="text-center p-10 items-center">
                <head>
                    <title>yurtemre.de | fasting</title>
                </head>

                <h2 className="text-4xl font-bold text-center">fasting ⚡</h2>
                <div className="p-5 h-screen mx-auto items-center justify-center flex-col flex">
                    <p className="text-3xl font-bold">
                        Fasten endet heute um {fastingStr} Uhr.
                    </p>

                    <FastingCountdown end={fastingDate?.end.getTime() || Date.now()} duration={duration} />

                    <div className="mt-10"></div>
                    <p className="text-xl">
                        Die nächsten Tage:
                    </p>
                    <div className="mt-5"></div>
                    <div className="text-center">
                        {daysAfterFasting.value.map((day) => (
                            <p className="text-l">{day} Uhr</p>
                        ))}
                    </div>
                </div>
            </div>
            <MyFooter />
        </html>
    );
}