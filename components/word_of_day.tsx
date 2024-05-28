import { WOTD } from "./classes/WOTD.ts";
import '../routes/index.tsx';

export default function WordOfTheDay({ word, link }: WOTD) {
    const word_data = { word, link };
    if (word_data === undefined) {
        return (
            <div className="flex items-center justify-center">
                <h1>Word of the day: Not found</h1>
            </div>
        );
    }

    if (word_data.word !== '' && word_data.link !== '') {
        return (
            <div className="flex-col items-center justify-center text-white">

                <div className="text-5xl m-2 font-serif"> <a className="hover:underline" href={word_data.link}>{word_data.word}</a></div>
                <div className="text-xl">is the <a className="underline bold" href="https://www.duden.de">Duden</a>'s German word of the day.</div>
            </div>
        );
    }

    return (
        <div>
        </div>
    );
}