import { useSignal } from "@preact/signals";
import MyFooter from "../components/my_footer.tsx";
import FastingCountdown from "../islands/fasting_widget.tsx";
import DateCountdown from "../islands/DateCountdown.tsx";

// map of key date -> (begin, end)
interface FastingDates {
    begin: Date;
    end: Date;
    index: number;
}

export default function Fasting() {
    // map of key date -> FastingDates
    const fastingDates: Map<string, FastingDates> = new Map();

    // add from static fasting.csv file
    const fastingCSV = Deno.readTextFileSync("./static/fasting.csv");
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
    const zeitVerschiebung = new Date(today.getFullYear(), 2, 31);
    let adjustedHours = 1;

    if (today > zeitVerschiebung) {
        adjustedHours = 2;
        // console.log("adjusted hours");
    }

    today.setHours(today.getHours() + adjustedHours);

    const formatterToday = new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const todayString = formatterToday.format(today.getTime());

    const fastingDate = fastingDates.get(todayString);

    const ramdan2025 = new Date(2025, 1, 28, 23, 59);


    if (fastingDate === undefined) {
        return (
            <html className="bg-blue-500 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <head>
                    <title>yurtemre.de | fasting</title>
                </head>
                <body>
                    <div className="text-center p-10 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-center">fasting ⚡</h2>
                            <div className="p-5 mx-auto items-center justify-center flex-col flex">
                                <div className="mt-10" />
                                <DateCountdown date={ramdan2025.getTime()} title="Ramadan 2025" endTitle="Ramadan ist endlich da!" />
                                <div className="mt-10" />
                                <div className="items-center justify-center flex">
                                    <div className="group flex flex-col">
                                        <img
                                            className="mx-auto max-md:max-h-xl md:h-96 rounded-xl group-hover:border-2 group-hover:border-blue-50 group-hover:shadow-2xl transition duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:scale-110"
                                            src="./mosque.png"
                                            alt="A mosque in the background."
                                        />
                                        <p className="duration-500 ease-in-out transform group-hover:translate-y-4 group-hover:scale-110">
                                            Image by <a className="italic hover:underline hover:text-blue-200" href="https://pixabay.com/users/alexman89-10638719/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5610250">Alexandru Manole</a> from <a className="italic hover:underline hover:text-blue-200" href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5610250">Pixabay</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5" />
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

    const daysAfterFasting = useSignal<string[]>([]);
    for (let i = 1; i < fastingDates.size - fastingDate!.index; i++) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        const fastingBegin = fastingDates.get(formatterToday.format(tomorrow))!.begin || Date.now();
        const fastingEnd = fastingDates.get(formatterToday.format(tomorrow))!.end || Date.now();
        const longFormatter = new Intl.DateTimeFormat('de-DE', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const shortFormatter = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
        const fastingStr = longFormatter.format(fastingBegin) + ' Uhr - ' + shortFormatter.format(fastingEnd) + ' Uhr';
        daysAfterFasting.value.push(fastingStr);
    }



    return (
        <html className="bg-blue-500 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <head>
                <title>yurtemre.de | fasting</title>
            </head>
            <body>


                <div className="text-center p-10 items-center">

                    <div>
                        <h2 className="text-4xl font-bold text-center">fasting ⚡</h2>
                        <div className="p-5 mx-auto items-center justify-center flex-col flex">
                            <div className="mt-10" />
                            <p className="text-2xl font-bold">
                                Heute ist der {fastingDate!.index + 1}. Tag vom Ramadan:
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
                                        src="./mosque.png"
                                        alt="A mosque in the background."
                                    />
                                    <p className="duration-500 ease-in-out transform group-hover:translate-y-4 group-hover:scale-110">
                                        Image by <a className="italic hover:underline hover:text-blue-200" href="https://pixabay.com/users/alexman89-10638719/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5610250">Alexandru Manole</a> from <a className="italic hover:underline hover:text-blue-200" href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5610250">Pixabay</a>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-10" />
                            {
                                daysAfterFasting.value.length > 0 ? (
                                    <div>
                                        <p className="text-xl">
                                            Die restlichen Tage ({daysAfterFasting.value.length} Tag{daysAfterFasting.value.length > 1 ? "e" : ""}) vom Ramadan sind wie folgt:
                                        </p>
                                        <div className="mt-5" />
                                        <div className="text-center overflow-auto h-96 px-6 divide-y-2 divide-opacity-20 divide-white">
                                            {
                                                daysAfterFasting.value.map(
                                                    (day: string, i: number) => (
                                                        <p className="text-l py-2 hover:underline">{i + 1}: {day}</p>
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