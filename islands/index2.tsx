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
  const t = translations[language.value];
  const day = new Date().getDay();
  const currentDayKanji = dayKanjiMap[day];
  const currentDay = dayMap[day];
  const currentTurkishDay = günMap[day];
  const newYear = getNextNewYears();
  const birthDay = getNextBirthday();
  const fasting = new Date(2026, 1, 17, 23, 59); // manual update required once a year

  function handleLanguageChange(newLang: string) {
    language.value = newLang;
  }

  return (
    <div className="bg-[#0A0F1E] text-[#E2E8F0] min-h-screen scroll-smooth">
      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center items-center text-center animate-fadeIn overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/fuji.jpg')] bg-cover bg-center opacity-15 -z-10">
          </div>

          <div className="absolute top-0 left-0 opacity-50 md:p-8 p-2">
            <p className="">
              {language.value === "ja"
                ? `今日は${currentDayKanji}曜日だ`
                : language.value === "tr"
                ? `Bugün ${currentTurkishDay}`
                : `Today is ${currentDay}`}
            </p>
          </div>

          <div className="absolute top-0 right-0 opacity-50 md:p-8 p-2">
            <div
              className="inline-flex rounded-xl shadow-sm"
              role="group"
            >
              <button
                aria-label="Switch to English"
                type="button"
                aria-pressed={language.value === "en"}
                onClick={() => handleLanguageChange("en")}
                className={`p-2 font-medium rounded-l-xl transition-colors focus:outline-none ${
                  language.value === "en"
                    ? "bg-[#FF6F61] text-[#E2E8F0]"
                    : "text-[#0A0F1E] bg-[#E2E8F0]"
                }`}
              >
                English
              </button>
              <button
                aria-label="Switch to Japanese"
                type="button"
                aria-pressed={language.value === "ja"}
                onClick={() => handleLanguageChange("ja")}
                className={`p-2 font-medium transition-colors focus:outline-none ${
                  language.value === "ja"
                    ? "bg-[#FF6F61] text-[#E2E8F0]"
                    : "text-[#0A0F1E] bg-[#E2E8F0]"
                }`}
              >
                日本語
              </button>
              <button
                aria-label="Switch to Turkish"
                type="button"
                aria-pressed={language.value === "tr"}
                onClick={() => handleLanguageChange("tr")}
                className={`p-2 font-medium rounded-r-xl transition-colors focus:outline-none ${
                  language.value === "tr"
                    ? "bg-[#FF6F61] text-[#E2E8F0]"
                    : "text-[#0A0F1E] bg-[#E2E8F0]"
                }`}
              >
                Türkçe
              </button>
            </div>
          </div>
          {/* <Snowfall /> */}
          <header className="mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {t.name}
            </h1>
            <p className="text-xl sm:text-2xl">
              {t.profession}
            </p>
          </header>

          <button
            type="button"
            onClick={() =>
              globalThis.scrollTo({
                top: document.getElementById("experience")?.offsetTop || 0,
                behavior: "smooth",
              })}
            className="cta-button"
          >
            {t.experience}
          </button>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 bg-[#15202B]">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold mb-6">
              {t.experience}
            </h3>
            <div className="space-y-6">
              <article className="p-6 bg-[#0A0F1E] rounded-lg shadow-md">
                <h4 className="text-xl font-medium">
                  Frontend Developer, DEIN ERSTER TAG
                </h4>
                <p className="text-sm">
                  {formatMonthYear(new Date("2025-06-12"), language.value)} -
                  {" "}
                  {t.present}
                </p>
              </article>
              <article className="p-6 bg-[#0A0F1E] rounded-lg shadow-md">
                <h4 className="text-xl font-medium">
                  Junior Frontend Developer, DEIN ERSTER TAG
                </h4>
                <p className="text-sm">
                  {formatMonthYear(new Date("2023-06-01"), language.value)} -
                  {" "}
                  {formatMonthYear(new Date("2025-06-01"), language.value)}
                </p>
              </article>
              <article className="p-6 bg-[#0A0F1E] rounded-lg shadow-md">
                <h4 className="text-xl font-medium">
                  Junior Frontend Developer, Appmelder
                </h4>
                <p className="text-sm">
                  {formatMonthYear(new Date("2021-04-01"), language.value)} -
                  {" "}
                  {formatMonthYear(new Date("2022-12-01"), language.value)}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold mb-6">
              {t.projects}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article className="p-6 bg-[#15202B] rounded-lg shadow-md">
                <a
                  href="/"
                  className="text-xl font-medium transition-colors"
                >
                  WoAuto
                </a>
                <p className="mt-2">{t.woautoDesc}</p>
                <a
                  href="https://github.com/yurtemre7/woauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-1 inline-block"
                >
                  {t.github}
                </a>
              </article>
              <article className="p-6 bg-[#15202B] rounded-lg shadow-md">
                <a
                  href="/paren"
                  className="text-xl font-medium transition-colors"
                >
                  Paren
                </a>
                <p className="mt-2">{t.parenDesc}</p>
                <a
                  href="https://github.com/yurtemre7/paren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-1 inline-block"
                >
                  {t.github}
                </a>
              </article>
              <article className="p-6 bg-[#15202B] rounded-lg shadow-md">
                <a
                  href="https://yurtemre7.github.io/steel-mouse/"
                  className="text-xl font-medium transition-colors"
                >
                  SteelMouse
                </a>
                <p className="mt-2">{t.steelMouseDesc}</p>
                <a
                  href="https://github.com/yurtemre7/steel-mouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-1 inline-block"
                >
                  {t.github}
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 bg-[#15202B]">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold mb-6">
              Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {t.programmingItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#0A0F1E] rounded-lg text-center shadow-md"
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-semibold mb-6">
              Languages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {t.languageItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#0A0F1E] rounded-lg text-center shadow-md"
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countdown Timers Section */}
        {
          /* <section id="timers" className="py-8 animate-on-scroll">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.countdownLabels.map((label, index) => (
                <div key={index} className="flex justify-center">
                  {index === 2 ? (
                    <a href="fasting" className="hover:underline">
                      <CountdownClock targetDate={fasting.getTime()} label={label} />
                    </a>
                  ) : (
                    <CountdownClock targetDate={[ newYear.getTime(), birthDay.getTime() ][index]} label={label} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section> */
        }

        {/* Word of the Day */}
        <section id="wotd" className="py-8 animate-on-scroll">
          <div className="max-w-md mx-auto px-8">
            <WordOfTheDay
              word={wotd.word}
              link={wotd.link}
              language={language.value}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-[#15202B] border-t border-gray-700 py-12">
        <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
          {/* Mixed Contact Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:yurtemre7@icloud.com"
              className="text-lg transition-colors"
            >
              {" "}yurtemre7@icloud.com
            </a>
            <a
              href="https://github.com/yurtemre7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yurtemre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://t.me/emredev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              Telegram
            </a>
          </div>
          {/* Impressum, Datenschutz, and Copyright */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="/impressum"
              className="text-xs md:text-sm transition-colors"
            >
              {t.impressum}
            </a>
            <a
              href="/datenschutz"
              className="text-xs md:text-sm transition-colors"
            >
              {t.datenschutz}
            </a>
          </div>
          <p className="text-xs md:text-sm">
            {t.name} {t.copyright} {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
