import { useSignal } from "@preact/signals";
import CountdownClock from "./CountdownClock.tsx";
import Snowfall from "./snowfall.tsx";
import WordOfTheDay from "../components/word_of_day.tsx";
import { InitialData } from "../components/classes/InitialData.ts";
import { getNextBirthday, getNextNewYears, formatMonthYear } from "../utils/dates.ts";
import translations from "../utils/locales/translations.ts";

const dayKanjiMap = ["日", "月", "火", "水", "木", "金", "土"];
const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Home({ wotd, lang }: InitialData) {
  const language = useSignal<string>(lang);
  const tempLanguage = useSignal<string>(lang);

  const day = new Date().getDay();
  const currentDayKanji = dayKanjiMap[day];
  const currentDay = dayMap[day];

  const t = translations[language.value];

  const newYear: Date = getNextNewYears();
  const birthDay: Date = getNextBirthday();
  const fasting: Date = new Date("2025-02-28T23:59:59");

  return (
    <div className="flex flex-col text-gray-900 dark:text-gray-100">
      <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-5xl w-full mx-4 sm:mx-6 lg:mx-12 my-4 sm:my-6 p-6 sm:p-8 md:p-10 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">

          {/* Language Switch */}
          <nav aria-label="Language switcher" className="flex justify-end mb-4">
            <button
              aria-label="Switch to English"
              role="switch"
              aria-checked={language.value === "en"}
              className={`px-4 py-2 rounded-l-lg ${language.value === "en" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              onClick={() => {
                language.value = "en";
                tempLanguage.value = language.value;
              }}
              onMouseOver={() => {
                tempLanguage.value = language.value;
                language.value = "en";
              }}
              onMouseOut={() => {
                language.value = tempLanguage.value;
              }}
            >
              English
            </button>
            <button
              aria-label="Switch to Japanese"
              role="switch"
              aria-checked={language.value === "ja"}
              className={`px-4 py-2 rounded-r-lg ${language.value === "ja" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              onClick={() => {
                language.value = "ja";
                tempLanguage.value = language.value;
              }}
              onMouseOver={() => {
                tempLanguage.value = language.value;
                language.value = "ja";
              }}
              onMouseOut={() => {
                language.value = tempLanguage.value;
              }}

            >
              日本語
            </button>
          </nav>

          {/* Header with Name and Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 md:mb-8">
            <div>
              <h1 className="text-3xl sm:text-2xl md:text-4xl font-semibold mb-1">{t.name}</h1>
              <p className="text-lg sm:text-base md:text-xl font-medium">{t.profession}</p>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">{t.bornInfo}</p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:grid md:grid-cols-4 gap-8 mb-8 space-y-4">

              {/* Experience Section */}
              <div className="col-span-2 space-y-3">
                <h2 className="text-xl sm:text-lg md:text-2xl font-semibold mb-2">{t.experience}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    Junior Frontend Developer, DEIN ERSTER TAG,{" "}
                    {formatMonthYear(new Date("2023-06-01"), language.value)} - {language.value === "en" ? "Present" : "現在"}
                  </li>
                  <li>
                    Junior Frontend Developer, Appmelder,{" "}
                    {formatMonthYear(new Date("2021-04-01"), language.value)} -{" "}
                    {formatMonthYear(new Date("2022-12-01"), language.value)}
                  </li>
                </ul>
              </div>

              {/* Projects Section */}
              <div className="col-span-2 space-y-3">
                <h2 className="text-xl sm:text-lg md:text-2xl font-semibold mb-2">{t.projects}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 overflow-x-auto">
                  <li>
                    <a href="https://github.com/yurtemre7/woauto" className="text-blue-500 hover:underline">
                      WoAuto
                    </a> - {t.woautoDesc}
                  </li>
                  <li>
                    <a href="/paren" className="text-blue-500 hover:underline">
                      Paren
                    </a> - {t.parenDesc}
                  </li>
                </ul>
              </div>

              {/* Programming Skills Section */}
              <div className="col-span-2 space-y-3">
                <h2 className="text-xl sm:text-lg md:text-2xl font-semibold mb-2">{t.programmingSkills}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {t.programmingItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Language Skills Section */}
              <div className="col-span-2 space-y-3">
                <h2 className="text-xl sm:text-lg md:text-2xl font-semibold mb-2">{t.languageSkills}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {t.languageItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer with Contact Info */}
          <footer className="pt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-center md:items-center space-y-4 sm:space-y-0 md:space-x-4">

            {/* Contact Info */}
            <div className="space-y-1 text-center md:text-left">
              <p><strong>{t.email}:</strong> <a href="mailto:yurtemre7@icloud.com" className="text-blue-500 hover:underline" rel="noopener noreferrer">yurtemre7@icloud.com</a></p>
              <p><strong>{t.telegram}:</strong> <a href="https://t.me/emredev" className="text-blue-500 hover:underline" rel="noopener noreferrer">@emredev</a></p>
              <p><strong>{t.github}:</strong> <a href="https://github.com/yurtemre7" className="text-blue-500 hover:underline" rel="noopener noreferrer">github.com/yurtemre7</a></p>
            </div>

            {/* Copyright and Legal Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-right">
              <p>{t.copyright}{new Date().getFullYear()} {t.name}</p>
              <a href="/impressum" className="text-blue-500 hover:underline">{t.impressum}</a>
              <a href="/datenschutz" className="text-blue-500 hover:underline">{t.datenschutz}</a>
            </div>
          </footer>
        </div>

        {/* Snowfall Component */}
        <Snowfall />
      </div>

      <div className="flex flex-row justify-center items-center text-4xl m-4">
        今日は{currentDayKanji}曜日だ - Today is {currentDay}
      </div>

      {/* Countdown Timers */}
      <div className="flex flex-row justify-center items-center space-x-8 mt-6 mb-4">
        {t.countdownLabels.map((label: string, index: number) => (

          <div className="col-span-1" >
            {index == 2 ? <a className="hover:underline" href="fasting">
              <CountdownClock
                key={index}
                targetDate={
                  [newYear.getTime(), birthDay.getTime(), fasting.getTime()][index]
                }
                label={label}
              />
            </a> : <CountdownClock
              key={index}
              targetDate={
                [newYear.getTime(), birthDay.getTime(), fasting.getTime()][index]
              }
              label={label}
            />}

          </div>
        ))}
      </div>

      {/* Word of the day */}
      <div className="flex justify-center items-center mt-6 mb-6">
        <WordOfTheDay word={wotd.word} link={wotd.link} language={language.value} />
      </div>
    </div>
  );
}
