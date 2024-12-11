import { useSignal } from "@preact/signals";
import CountdownClock from "./CountdownClock.tsx";
import Snowfall from "./snowfall.tsx";
import WordOfTheDay from "../components/word_of_day.tsx";
import { WOTD } from "../components/classes/WOTD.ts";
import { Repositories } from "../components/classes/Github.ts";

type Translations = {
  [key: string]: {
    name: string;
    profession: string;
    bornInfo: string;
    experience: string;
    projects: string;
    woautoDesc: string;
    parenDesc: string;
    email: string;
    telegram: string;
    github: string;
    copyright: string;
    impressum: string;
    datenschutz: string;
    countdownLabels: string[];
    programmingSkills: string;
    languageSkills: string;
    programmingItems: string[];
    languageItems: string[];
  };
};

interface InitialData {
  wotd: WOTD;
  repositories: Repositories;
}

export default function Home({wotd, repositories}: InitialData) {
  const language = useSignal<string>("en");
  const tempLanguage = useSignal<string>("en");

  const translations: Translations = {
    en: {

      name: "Emre Yurtseven",
      profession: "App Developer",
      bornInfo: "Born on January 16, 2002 • B.Sc. Computer Science",
      experience: "Experience",
      projects: "Projects",
      woautoDesc: "Never lose sight of your car parking ever again.",
      parenDesc: "Enjoy your vacation and keep the local currency ready at your fingertips.",
      email: "Email",
      telegram: "Telegram",
      github: "GitHub",
      copyright: "© 2020 - ",
      impressum: "Impressum",
      datenschutz: "Datenschutzerklärung",
      countdownLabels: ["New Year 2025", "Birth Day from Emre", "Ramadan 2025", "Birth Day from Teo"],
      programmingItems: [
        "Flutter 4+ years",
        "Android & iOS Development",
        "Python 4+ years",
        "JavaScript / TypeScript - React, Next.js and Fresh",
        "PHP",
      ],
      languageItems: [
        "German (Deutsch) - Native",
        "Turkish (Türkçe) - Casual / Native",
        "English - Professional",
        "Japanese (日本語) - Beginner",
      ],
      programmingSkills: "Programming Skills",
      languageSkills: "Language Skills",
    },
    ja: {
      name: "エムレ・ユルトセヴェン",
      profession: "アプリ開発者",
      bornInfo: "2002年1月16日生まれ • コンピュータサイエンス学士",
      experience: "経験",
      projects: "プロジェクト",
      woautoDesc: "駐車した場所を二度と見失いません。",
      parenDesc: "休暇を楽しみ、現地通貨を手元に簡単に管理しましょう。",
      email: "メール",
      telegram: "テレグラム",
      github: "ギットハブ",
      copyright: "© 2020 - ",
      impressum: "インプリント",
      datenschutz: "データ保護方針",
      countdownLabels: ["2025年の新年", "エムレの誕生日", "ラマダン2025", "テオの誕生日"],
      programmingItems: [
        "Flutter 4年以上",
        "AndroidおよびiOS開発",
        "Python 4年以上",
        "JavaScript / TypeScript - React、Next.js、Fresh",
        "PHP",
      ],
      languageItems: [
        "ドイツ語 (Deutsch) - ネイティブ",
        "トルコ語 (Türkçe) - カジュアル / ネイティブ",
        "英語 - プロフェッショナル",
        "日本語 - 初級",
      ],
      programmingSkills: "プログラミングスキル",
      languageSkills: "言語スキル",
    }
  };

  const t = translations[language.value];

  const newYear: Date = new Date("2025-01-01T00:00:00");
  const birthDay: Date = new Date("2025-01-16T00:00:00");
  const fasting: Date = new Date("2025-02-28T00:00:00");
  const teoBirthday: Date = new Date("2025-09-11T00:00:00");

  // Helper function to format months
  const formatMonthYear = (date: Date, locale: string): string => {
    return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(date);
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-5xl w-full mx-4 sm:mx-6 lg:mx-12 my-4 sm:my-6 p-6 sm:p-8 md:p-10 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          {/* Language Switch */}
          <div className="flex justify-end mb-4">
            <button
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
          </div>

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

            <div className="grid grid-cols-4 gap-8 mb-8">
              {/* Experience Section */}
              <div className="col-span-2 hover:underline space-y-3">
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
              <p><strong>{t.email}:</strong> <a href="mailto:yurtemre7@icloud.com" className="text-blue-500 hover:underline">yurtemre7@icloud.com</a></p>
              <p><strong>{t.telegram}:</strong> <a href="https://t.me/emredev" className="text-blue-500 hover:underline">@emredev</a></p>
              <p><strong>{t.github}:</strong> <a href="https://github.com/yurtemre7" className="text-blue-500 hover:underline">github.com/yurtemre7</a></p>
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
      {/* Countdown Timers Below the Business Card */}
      <div className="flex flex-row justify-center items-center space-x-8 mt-6 mb-4">
        {t.countdownLabels.map((label: string, index: number) => (
          <CountdownClock
            key={index}
            targetDate={
              [newYear.getTime(), birthDay.getTime(), fasting.getTime(), teoBirthday.getTime()][index]
            }
            label={label}
          />
        ))}
      </div>

      {/* Word of the day */}
      <div className="flex flex-row justify-center items-center space-x-8 mt-6 mb-4">
        <WordOfTheDay word={wotd.word} link={wotd.link} language={language.value} />
      </div>
    </div>
  );
}
