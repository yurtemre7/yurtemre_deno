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

  const newYear = getNextNewYears();
  const birthDay = getNextBirthday();
  const fasting = new Date(2025, 1, 28, 23, 59);

  // Function to handle language change
  const handleLanguageChange = (newLang: string) => {
    language.value = newLang;
    tempLanguage.value = newLang;
  };

  return (
    <main className="text-gray-900 dark:text-gray-100">
      <section className="min-h-screen w-full flex justify-center items-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-4">
        <article className="max-w-5xl w-full mx-auto my-4 sm:my-6 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">

          {/* Language Switch - Improved accessibility and interaction */}
          <nav aria-label="Language switcher" className="flex justify-between mb-4 gap-4">
            {language.value === "ja" ? (
              <span className="text-xl md:text-2xl">
              今日は{currentDayKanji}曜日だ
              </span>
            ) : (
              <span className="text-xl md:text-2xl">
              Today is {currentDay}
              </span>
            )}
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                aria-label="Switch to English"
                type="button"
                aria-pressed={language.value === "en"}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:z-10 focus:ring-2 focus:outline-none transition-colors ${language.value === "en"
                    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400"
                  }`}
                onClick={() => handleLanguageChange("en")}
              >
                English
              </button>
              <button
                aria-label="Switch to Japanese"
                type="button"
                aria-pressed={language.value === "ja"}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10 focus:ring-2 focus:outline-none transition-colors ${language.value === "ja"
                    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400"
                  }`}
                onClick={() => handleLanguageChange("ja")}
              >
                日本語
              </button>
            </div>
          </nav>

          {/* Header with Name and Info - Improved spacing and responsive design */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{t.name}</h1>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">{t.profession}</p>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">{t.bornInfo}</p>
          </header>

          {/* Main Content - Improved grid structure */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Experience Section */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold mb-3 border-blue-500">{t.experience}</h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <div>
                      <p className="font-medium">Junior Frontend Developer, DEIN ERSTER TAG</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatMonthYear(new Date("2023-06-01"), language.value)} - {language.value === "en" ? "Present" : "現在"}
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div>
                      <p className="font-medium">Junior Frontend Developer, Appmelder</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatMonthYear(new Date("2021-04-01"), language.value)} -{" "}
                        {formatMonthYear(new Date("2022-12-01"), language.value)}
                      </p>
                    </div>
                  </li>
                </ul>
              </section>

              {/* Projects Section */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold mb-3 border-blue-500">{t.projects}</h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <div>
                      <a href="https://github.com/yurtemre7/woauto" className="text-blue-600 hover:underline font-medium">
                        WoAuto
                      </a>
                      <p className="text-gray-700 dark:text-gray-300">{t.woautoDesc}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div>
                      <a href="/paren" className="text-blue-600 hover:underline font-medium">
                        Paren
                      </a>
                      <p className="text-gray-700 dark:text-gray-300">{t.parenDesc}</p>
                    </div>
                  </li>
                </ul>
              </section>

              {/* Programming Skills Section */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold mb-3 border-blue-500">{t.programmingSkills}</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {t.programmingItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Language Skills Section */}
              <section className="space-y-3">
                <h2 className="text-xl font-semibold mb-3 border-blue-500">{t.languageSkills}</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {t.languageItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Footer with Contact Info - Improved layout and responsiveness */}
          <footer className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="space-y-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span><strong>{t.email}:</strong> <a href="mailto:yurtemre7@icloud.com" className="text-blue-600 hover:underline">yurtemre7@icloud.com</a></span>
                  </li>
                  <li className="flex items-center">
                    <span><strong>{t.telegram}:</strong> <a href="https://t.me/emredev" className="text-blue-600 hover:underline">@emredev</a></span>
                  </li>
                  <li className="flex items-center">
                    <span><strong>{t.github}:</strong> <a href="https://github.com/yurtemre7" className="text-blue-600 hover:underline">github.com/yurtemre7</a></span>
                  </li>
                </ul>
              </div>

              {/* Copyright and Legal Links */}
              <div className="flex flex-col space-y-2 sm:items-end">
                <p className="text-gray-500 dark:text-gray-400">{t.copyright} {new Date().getFullYear()} {t.name}</p>
                <div className="flex space-x-4">
                  <a href="/impressum" className="text-blue-600 hover:underline">{t.impressum}</a>
                  <a href="/datenschutz" className="text-blue-600 hover:underline">{t.datenschutz}</a>
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* Snowfall Component */}
        <Snowfall />
      </section>

      

      {/* Countdown Timers - Improved layout */}
      <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.countdownLabels.map((label, index) => (
              <div key={index} className="flex justify-center">
                {index === 2 ? (
                  <a className="w-full hover:underline" href="fasting">
                    <CountdownClock
                      targetDate={[newYear.getTime(), birthDay.getTime(), fasting.getTime()][index]}
                      label={label}
                    />
                  </a>
                ) : (
                  <CountdownClock
                    targetDate={[newYear.getTime(), birthDay.getTime(), fasting.getTime()][index]}
                    label={label}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Word of the day - Improved container */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <WordOfTheDay word={wotd.word} link={wotd.link} language={language.value} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}