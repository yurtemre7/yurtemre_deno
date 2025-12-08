interface PortfolioHomeProps {
  language: string;
}

import { useSignal } from "@preact/signals";

import {
  calculateDurationInYearsAndMonths,
  formatMonthYear,
  // getNextBirthday,
  // getNextNewYears,
} from "@/utils/dates.ts";
import translations from "@/utils/locales/translations.ts";
import dayLine from "@/utils/locales/dayline.ts";
import Snowfall from "./snowfall.tsx";

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: Date;
  endDate: Date | "present";
  description: string;
}

const workExperiences: WorkExperience[] = [
  {
    id: "famedly-1",
    title: "Flutter Developer",
    company: "Famedly",
    startDate: new Date("2026-01-05"),
    endDate: "present",
    description:
      "Flutter App developer for the cross-platform healthcare communication app. Working on new features, bug fixes, and performance improvements while collaborating with a team of developers and designers to enhance user experience and ensure compliance with healthcare regulations.",
  },
  {
    id: "det-1",
    title: "Frontend Developer",
    company: "DEIN ERSTER TAG",
    startDate: new Date("2025-06-12"),
    endDate: new Date("2025-12-31"),
    description:
      "Continued development of the cross-platform Flutter app. Integrated CI/CD via Fastlane for automated builds and leveraged OpenAI, Azure, and AWS for chatbots and internal copy generation. Also heavily involved on the web development using ReactJS and WordPress.",
  },
  {
    id: "det-2",
    title: "Junior Frontend Developer",
    company: "DEIN ERSTER TAG",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2025-06-01"),
    description:
      "Continued development of the cross-platform Flutter app, implemented highvalued business features, Firebase notifications, and analytics (Appsflyer/GA). Then migrated it to Flutter Web embedded in ReactJS and WordPress.",
  },
  {
    id: "appmelder",
    title: "Junior Frontend Developer",
    company: "Appmelder",
    startDate: new Date("2021-04-01"),
    endDate: new Date("2022-12-01"),
    description:
      "Refactored the initial production codebase by applying improved techniques and aligning the app's design with Figma specifications. Implemented revenue-critical features through rapid sprints, successfully delivering customer value using Flutter, Dart, and Python.",
  },
];

export default function PortfolioHome(props: PortfolioHomeProps) {
  const language = useSignal<string>(props.language);
  const expandedExperience = useSignal<string | null>(null);
  const t = translations[language.value];
  // day string produced by utils/locales/dayline.ts

  function handleLanguageChange(newLang: string) {
    language.value = newLang;
  }

  return (
    <div className="text-[#E2E8F0] min-h-screen scroll-smooth animate-fadeIn overflow-hidden">
      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center items-center text-center"
        >
          <div className="absolute top-0 left-0 opacity-75 md:p-8 p-4">
            <p className="">{dayLine(language.value)}</p>
          </div>
          <div className="absolute top-0 right-0 opacity-75 md:p-8 p-4">
            <div
              className="flex flex-col md:inline-flex md:flex-row rounded-xl shadow-sm bg-transparent items-stretch md:items-center md:space-x-2 space-y-2 md:space-y-0"
              role="group"
              aria-label="Language selector"
            >
              <button
                aria-label="Switch to English"
                title="English"
                type="button"
                aria-pressed={language.value === "en"}
                onClick={() => handleLanguageChange("en")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLanguageChange("en");
                  }
                }}
                className={`rounded-lg flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform transform will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E53E3E] ${
                  language.value === "en"
                    ? "bg-[#E53E3E] text-[#E2E8F0] shadow-lg shadow-[#E53E3E]/30"
                    : "text-[#E2E8F0] bg-transparent hover:bg-white/5 hover:scale-105"
                }`}
              >
                <span aria-hidden>🇺🇸</span>
                <span className="hidden sm:inline">EN</span>
              </button>

              <button
                aria-label="Switch to German"
                title="Deutsch"
                type="button"
                aria-pressed={language.value === "de"}
                onClick={() => handleLanguageChange("de")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLanguageChange("de");
                  }
                }}
                className={`rounded-lg flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform transform will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E53E3E] ${
                  language.value === "de"
                    ? "bg-[#E53E3E] text-[#E2E8F0] shadow-lg shadow-[#E53E3E]/30"
                    : "text-[#E2E8F0] bg-transparent hover:bg-white/5 hover:scale-105"
                }`}
              >
                <span aria-hidden>🇩🇪</span>
                <span className="hidden sm:inline">DE</span>
              </button>

              <button
                aria-label="Switch to Japanese"
                title="日本語"
                type="button"
                aria-pressed={language.value === "ja"}
                onClick={() => handleLanguageChange("ja")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLanguageChange("ja");
                  }
                }}
                className={`rounded-lg flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform transform will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E53E3E] ${
                  language.value === "ja"
                    ? "bg-[#E53E3E] text-[#E2E8F0] shadow-lg shadow-[#E53E3E]/30"
                    : "text-[#E2E8F0] bg-transparent hover:bg-white/5 hover:scale-105"
                }`}
              >
                <span aria-hidden>🇯🇵</span>
                <span className="hidden sm:inline">日本語</span>
              </button>

              <button
                aria-label="Switch to Turkish"
                title="Türkçe"
                type="button"
                aria-pressed={language.value === "tr"}
                onClick={() => handleLanguageChange("tr")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLanguageChange("tr");
                  }
                }}
                className={`rounded-lg flex items-center gap-2 px-3 py-2 text-sm font-medium transition-transform transform will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E53E3E] ${
                  language.value === "tr"
                    ? "bg-[#E53E3E] text-[#E2E8F0] shadow-lg shadow-[#E53E3E]/30"
                    : "text-[#E2E8F0] bg-transparent hover:bg-white/5 hover:scale-105"
                }`}
              >
                <span aria-hidden>🇹🇷</span>
                <span className="hidden sm:inline">Türkçe</span>
              </button>
            </div>
          </div>

          <div id="main-content" className="mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {t.name}
            </h1>
            <p className="text-xl sm:text-2xl pt-1">
              {t.profession}
            </p>
          </div>

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
        <section
          id="experience"
          className="py-12 min-h-screen flex justify-center items-center"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-6">
              {t.experience}
            </h1>
            <div className="space-y-4">
              {workExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="group relative p-6 rounded-lg transition-all duration-200 cursor-pointer md:cursor-default"
                  onClick={() =>
                    expandedExperience.value =
                      expandedExperience.value === exp.id
                        ? null
                        : exp.id}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-xl font-medium">
                        {exp.title}, {exp.company}
                      </h2>
                      <p className="text-sm">
                        {formatMonthYear(exp.startDate, language.value)} -{"  "}
                        {exp.endDate === "present"
                          ? t.present
                          : formatMonthYear(exp.endDate, language.value)}{"  "}
                        {"(" +
                          calculateDurationInYearsAndMonths(
                            exp.startDate,
                            exp.endDate,
                            language.value,
                          ) + ")"}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="ml-4 shrink-0 md:hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                        expandedExperience.value =
                          expandedExperience.value === exp.id ? null : exp.id;
                      }}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          expandedExperience.value === exp.id
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className={`mt-3 text-sm text-gray-300 transition-all duration-200 ease-in-out overflow-hidden ${
                      expandedExperience.value === exp.id
                        ? "opacity-100"
                        : "opacity-0 h-0 md:opacity-100 md:h-auto"
                    }`}
                  >
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skprlang"
          className="py-12 min-h-screen flex justify-center items-center"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-6">
              {t.projects}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg">
                <a
                  href="/"
                  className="text-xl font-medium transition-colors"
                >
                  WoAuto
                </a>
                <p>{t.woautoDesc}</p>
                <a
                  href="https://github.com/yurtemre7/woauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-2 inline-block"
                >
                  {t.github}
                </a>
              </div>
              <div className="p-4 rounded-lg">
                <a
                  href="/paren"
                  target="_self"
                  rel="noopener noreferrer"
                  className="text-xl font-medium transition-colors"
                >
                  Paren
                </a>
                <p>{t.parenDesc}</p>
                <a
                  href="https://github.com/yurtemre7/paren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-2 inline-block"
                >
                  {t.github}
                </a>
              </div>
              <div className="p-4 rounded-lg">
                <a
                  href="/steelmouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium transition-colors"
                >
                  SteelMouse
                </a>
                <p>{t.steelMouseDesc}</p>
                <a
                  href="https://github.com/yurtemre7/steel-mouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-2 inline-block"
                >
                  {t.github}
                </a>
              </div>
            </div>
            <h1 className="text-2xl font-semibold mb-6">
              {t.programmingSkills}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {t.programmingItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg text-center"
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <h1 className="text-2xl font-semibold mb-6">
              {t.languageSkills}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {t.languageItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg text-center"
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
      </main>
      {/* Snowfall Component */}
      <Snowfall />
    </div>
  );
}
