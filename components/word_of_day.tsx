import { WOTD } from "./classes/WOTD.ts";

// Define translations
const translations: {
  [lang: string]: { notFound: string; wordOfDay: string; duden: string };
} = {
  en: {
    notFound: "Word of the day: Not found",
    wordOfDay: "is the german word of the day provided by",
    duden: "Duden",
  },
  ja: {
    notFound: "今日の単語: 見つかりません",
    wordOfDay: "は、本日のドイツ語である:",
    duden: "Duden (ドゥーデン)",
  },
  tr: {
    notFound: "Günün kelimesi: Bulunamadı",
    wordOfDay: "şu anda sağlanan Almanca kelimedir",
    duden: "Duden",
  },
};

interface WordOfTheDayProps extends WOTD {
  language: string; // Extend with language prop
}

export default function WordOfTheDay(
  { word, link, language }: WordOfTheDayProps,
) {
  const word_data = { word, link };
  const t = translations[language];

  if (word_data === undefined) {
    return (
      <div className="flex items-center justify-center">
        <p>{t.notFound}</p>
      </div>
    );
  }

  if (word_data.word !== "" && word_data.link !== "") {
    return (
      <div className="flex-col items-center justify-center text-gray-10">
        <div className="text-5xl m-2 font-serif text-center">
          <a className="hover:underline" href={word_data.link}>
            {word_data.word}
          </a>
        </div>
        <div className="text-xl text-center">
          {t.wordOfDay}{" "}
          <a className="underline bold" href="https://www.duden.de">
            {t.duden}
          </a>.
        </div>
      </div>
    );
  }

  return <div></div>;
}
