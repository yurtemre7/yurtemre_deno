import { useSignal } from "@preact/signals";
import CountdownClock from "./CountdownClock.tsx";
import Snowfall from "./snowfall.tsx";
import WordOfTheDay from "../components/word_of_day.tsx";
import { InitialData } from "../components/classes/InitialData.ts";
import {
  formatMonthYear,
  getNextBirthday,
  getNextNewYears,
} from "../utils/dates.ts";
import translations from "../utils/locales/translations.ts";

const dayKanjiMap = ["日", "月", "火", "水", "木", "金", "土"];
const dayMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const günMap = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

export default function Home({ wotd, lang }: InitialData) {
  const language = useSignal<string>(lang);

  const day = new Date().getDay();
  const currentDayKanji = dayKanjiMap[day];
  const currentDay = dayMap[day];
  const currentTurkishDay = günMap[day];

  const t = translations[language.value];

  const newYear = getNextNewYears();
  const birthDay = getNextBirthday();
  // TODO manual change required once a year
  const fasting = new Date(2026, 1, 17, 23, 59);
  // console.log(fasting.toLocaleString());

  // Function to handle language change
  function handleLanguageChange(newLang: string) {
    language.value = newLang;
  }

  return (
    <div>
      <nav
        aria-label="Language switcher"
        className="bg-gray-800 text-gray-100 shadow-lg flex flex-col md:flex-row justify-between items-center p-4 space-y-4 md:space-y-0"
      >
        <a
          href="/"
          className="text-2xl font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
        >
          yurtemre.de
        </a>
        <div
          className="inline-flex rounded-md shadow-sm flex-wrap justify-center"
          role="group"
        >
          <button
            aria-label="Switch to English"
            type="button"
            aria-pressed={language.value === "en"}
            className={`px-4 py-2 font-medium rounded-t-lg rounded-l-lg rounded-tr-none focus:z-10 focus:ring-2 focus:outline-none transition-colors ${
              language.value === "en"
                ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
                : "text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400"
            }`}
            onClick={() => handleLanguageChange("en")}
          >
            English
          </button>
          <button
            aria-label="Switch to Japanese"
            type="button"
            aria-pressed={language.value === "ja"}
            className={`px-4 py-2 font-medium focus:z-10 focus:ring-2 focus:outline-none transition-colors ${
              language.value === "ja"
                ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
                : "text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400"
            }`}
            onClick={() => handleLanguageChange("ja")}
          >
            日本語
          </button>
          <button
            aria-label="Switch to Turkish"
            type="button"
            aria-pressed={language.value === "tr"}
            className={`px-4 py-2 font-medium rounded-b-lg rounded-r-lg rounded-bl-none focus:z-10 focus:ring-2 focus:outline-none transition-colors ${
              language.value === "tr"
                ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
                : "text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400"
            }`}
            onClick={() => handleLanguageChange("tr")}
          >
            Türkçe
          </button>
        </div>
      </nav>
      <main>
        <section className="min-h-screen w-full flex justify-center items-center p-4">
          <article className="max-w-5xl w-full mx-auto my-4 sm:my-6 p-6 lg:p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
            <div className="flex justify-center">
              {language.value === "ja"
                ? (
                  <span>
                    今日は{currentDayKanji}曜日だ
                  </span>
                )
                : language.value === "tr"
                ? (
                  <span>
                    Bugün {currentTurkishDay}
                  </span>
                )
                : (
                  <span>
                    Today is {currentDay}
                  </span>
                )}
            </div>

            {/* Header with Name and Info - Improved spacing and responsive design */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-gray-700 pb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  {t.name}
                </h1>
                <p className="text-lg font-medium text-gray-300 mt-1">
                  {t.profession}
                </p>
              </div>
              <p className="text-gray-400 text-sm md:text-base">{t.bornInfo}</p>
            </header>

            {/* Main Content - Improved grid structure */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Experience Section */}
                <section className="space-y-3">
                  <h2 className="text-xl font-semibold mb-3 border-emerald-400 text-white">
                    {t.experience}
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div>
                        <p className="font-medium">
                          Frontend Developer, DEIN ERSTER TAG
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatMonthYear(
                            new Date("2025-06-12"),
                            language.value,
                          )} - {t.present}
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div>
                        <p className="font-medium">
                          Junior Frontend Developer, DEIN ERSTER TAG
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatMonthYear(
                            new Date("2023-06-01"),
                            language.value,
                          )} - {formatMonthYear(
                            new Date("2025-06-01"),
                            language.value,
                          )}
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div>
                        <p className="font-medium">
                          Junior Frontend Developer, Appmelder
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatMonthYear(
                            new Date("2021-04-01"),
                            language.value,
                          )} - {formatMonthYear(
                            new Date("2022-12-01"),
                            language.value,
                          )}
                        </p>
                      </div>
                    </li>
                  </ul>
                </section>

                {/* Projects Section */}
                <section className="space-y-3">
                  <h2 className="text-xl font-semibold mb-3 border-emerald-400 text-white">
                    {t.projects}
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div>
                        <a
                          href="/"
                          className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
                        >
                          WoAuto
                        </a>
                        <p className="text-gray-700 dark:text-gray-300">
                          {t.woautoDesc}
                        </p>
                        <div>
                          <a
                            href="https://github.com/yurtemre7/woauto"
                            className="text-sm text-gray-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.github}
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="flex">
                      <div>
                        <a
                          href="/paren"
                          className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
                        >
                          Paren
                        </a>
                        <p className="text-gray-700 dark:text-gray-300">
                          {t.parenDesc}
                        </p>
                        <div>
                          <a
                            href="https://github.com/yurtemre7/paren"
                            className="text-sm text-gray-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.github}
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="flex">
                      <div>
                        <a
                          href="https://yurtemre7.github.io/mouse-battery/"
                          className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
                        >
                          SteelMouse
                        </a>
                        <p className="text-gray-700 dark:text-gray-300">
                          {t.steelMouseDesc}
                        </p>
                        <div>
                          <a
                            href="https://github.com/yurtemre7/mouse-battery"
                            className="text-sm text-gray-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.github}
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </section>

                {/* Programming Skills Section */}
                <section className="space-y-3">
                  <h2 className="text-xl font-semibold mb-3 border-emerald-400 text-white">
                    {t.programmingSkills}
                  </h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {t.programmingItems.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Language Skills Section */}
                <section className="space-y-3">
                  <h2 className="text-xl font-semibold mb-3 border-blue-500">
                    {t.languageSkills}
                  </h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {t.languageItems.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Footer with Contact Info - Improved layout and responsiveness */}
            <div className="pt-6 border-t border-gray-300 dark:border-gray-400 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-2">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span>
                        <strong>{t.email}:</strong>{" "}
                        <a
                          href="mailto:yurtemre7@icloud.com"
                          className="text-emerald-400 hover:text-emerald-300 hover:underline"
                        >
                          yurtemre7@icloud.com
                        </a>
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span>
                        <strong>{t.telegram}:</strong>{" "}
                        <a
                          href="https://t.me/emredev"
                          className="text-emerald-400 hover:text-emerald-300 hover:underline"
                        >
                          @emredev
                        </a>
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span>
                        <strong>{t.github}:</strong>{" "}
                        <a
                          href="https://github.com/yurtemre7"
                          className="text-emerald-400 hover:text-emerald-300 hover:underline"
                        >
                          github.com/yurtemre7
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Snowfall Component */}
          <Snowfall />
        </section>

        {/* Countdown Timers - Improved layout */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.countdownLabels.map((label, index) => (
                <div key={index} className="flex justify-center rounded-lg">
                  {index === 2
                    ? (
                      <a className="hover:underline" href="fasting">
                        <CountdownClock
                          targetDate={fasting.getTime()}
                          label={label}
                        />
                      </a>
                    )
                    : (
                      <CountdownClock
                        targetDate={[
                          newYear.getTime(),
                          birthDay.getTime(),
                        ][index]}
                        label={label}
                      />
                    )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Word of the day - Improved container */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <WordOfTheDay
                  word={wotd.word}
                  link={wotd.link}
                  language={language.value}
                />
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-gray-900 mt-8 py-6 border-t border-gray-700">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs md:text-sm">
              {t.name} {t.copyright} {new Date().getFullYear()}
            </p>
            <div className="flex space-x-4">
              <a
                href="/impressum"
                className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs md:text-sm"
              >
                {t.impressum}
              </a>
              <a
                href="/datenschutz"
                className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs md:text-sm"
              >
                {t.datenschutz}
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
