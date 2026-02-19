/**
 * Fasting Page - Ramadan 2026 Berlin
 *
 * Optimized with Fresh 2.0 + Preact best practices:
 * - Server-side data loading (no blocking client-side CSV parsing)
 * - Proper TypeScript types for type safety
 * - Memoized computations to prevent unnecessary recalculations
 * - Semantic HTML and accessibility improvements
 * - Clean separation of concerns (data logic vs UI)
 * - Efficient signal usage with proper cleanup
 * - Responsive design with Tailwind CSS
 */

import { useMemo } from "preact/hooks";
import { define } from "../utils.ts";
import { FastingProgress, getBerlinNow } from "../islands/FastingProgress.tsx";
import CountdownClock from "../islands/CountdownClock.tsx";

// ============================================================================
// Types
// ============================================================================

interface FastingDay {
  /** Date key in format dd.mm.yyyy */
  key: string;
  /** Fasting begin date/time */
  begin: Date;
  /** Fasting end date/time */
  end: Date;
  /** Day index (0-based) */
  index: number;
  /** Formatted display string */
  display: string;
  /** Is this Laylatul Qadr? */
  isLaylatulQadr: boolean;
}

interface FastingData {
  /** Map of date key to fasting day info */
  byDate: Map<string, FastingDay>;
  /** Ordered array of all fasting days */
  days: FastingDay[];
}


// ============================================================================
// Constants
// ============================================================================

const CSV_PATH = "./static/fasting26.csv";
const RAMADAN_START_2026 = new Date(2026, 1, 19, 0, 0, 0);
const LAYLATUL_QADR_INDEX = 25; // 26th day (0-indexed = 25)

// ============================================================================
// Utility Functions (Pure, Memoizable)
// ============================================================================

/**
 * Parse fasting dates from CSV file content
 * CSV format: dd/mm/yyyy,HH:MM,HH:MM (key, begin time, end time)
 */
function parseFastingCSV(content: string): FastingData {
  const byDate = new Map<string, FastingDay>();
  const days: FastingDay[] = [];

  const lines = content.trim().split("\n").filter((line) => line.trim());

  for (let index = 0; index < lines.length; index++) {
    const [key, beginTime, endTime] = lines[index].split(",").map((s) =>
      s.trim()
    );
    if (!key || !beginTime || !endTime) continue;

    const [dd, mm, yyyy] = key.split("/").map(Number);
    const [beginHH, beginMM] = beginTime.split(":").map(Number);
    const [endHH, endMM] = endTime.split(":").map(Number);

    const begin = new Date(yyyy, mm - 1, dd, beginHH, beginMM);
    const end = new Date(yyyy, mm - 1, dd, endHH, endMM);
    const dateKey = key.replaceAll("/", ".");

    // Format display string
    const longFormatter = new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const shortFormatter = new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const display = `${longFormatter.format(begin)} Uhr bis ${
      shortFormatter.format(end)
    } Uhr`;
    const isLaylatulQadr = index === LAYLATUL_QADR_INDEX;

    const fastingDay: FastingDay = {
      key: dateKey,
      begin,
      end,
      index,
      display,
      isLaylatulQadr,
    };

    byDate.set(dateKey, fastingDay);
    days.push(fastingDay);
  }

  return { byDate, days };
}

/**
 * Format date to dd.mm.yyyy format
 */
function formatDateKey(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

// ============================================================================
// UI Components
// ============================================================================

/**
 * Navigation bar component
 */
function NavBar() {
  return (
    <nav className="p-4" aria-label="Hauptnavigation">
      <div className="flex justify-between items-center text-lg font-bold ">
        <a
          href="/"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
        >
          ← yurtemre.de
        </a>
        <span className="italic text-center " lang="en">
          fasting ⚡
        </span>
      </div>
    </nav>
  );
}

/**
 * Fasting day card component
 */
interface FastingDayCardProps {
  day: FastingDay;
}

function FastingDayCard({ day }: FastingDayCardProps) {
  return (
    <div
      className={`w-full border border-[#E2E8F0] border-opacity-25 rounded-xl p-4 text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
        day.isLaylatulQadr
          ? "hover:border-green-400 bg-green-900 bg-opacity-10"
          : "hover:border-blue-300"
      }`}
    >
      <p className="text-sm md:text-base py-2">{day.display}</p>
      {day.isLaylatulQadr && (
        <p className="text-sm italic font-bold text-green-400 mt-2">
          ✨ Laylatul Qadr ✨
        </p>
      )}
    </div>
  );
}

/**
 * Mosque image component with caption
 */
function MosqueImage() {
  return (
    <div className="group flex flex-col gap-3">
      <img
        className="rounded-xl shadow-lg transition-all duration-500 ease-in-out transform group-hover:scale-105 group-hover:shadow-2xl max-h-100 lg:max-h-125 object-cover"
        src="./hamidiye_mosque.jpg"
        alt="Hamidiye Moschee in Istanbul"
        loading="lazy"
        width="600"
        height="450"
      />
      <p className="text-center text-xl md:text-2xl font-bold transition-transform duration-500 ease-in-out group-hover:translate-y-1">
        Hamidiye Mosque
      </p>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default define.page(function FastingPage(_props) {
  // Load and parse CSV data on the server
  const fastingData = useMemo(() => {
    try {
      const csvContent = Deno.readTextFileSync(CSV_PATH);
      return parseFastingCSV(csvContent);
    } catch (error) {
      console.error("Failed to load fasting data:", error);
      return { byDate: new Map(), days: [] };
    }
  }, []);

  // Get current Berlin time
  const now = getBerlinNow();
  const todayKey = formatDateKey(now);

  // Find today's fasting day
  const todayFasting = fastingData.byDate.get(todayKey) || null;

  // Get remaining days after today
  const remainingDays = useMemo(() => {
    if (!todayFasting) return fastingData.days;
    return fastingData.days.slice(todayFasting.index + 1);
  }, [todayFasting, fastingData.days]);

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        {!todayFasting
          ? (
            // Before/After Ramadan - Show countdown to Ramadan
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ramadan 2026 in Berlin 🇩🇪
                </h2>
                <p className="text-lg opacity-75 mb-6">
                  Die Fastenzeiten werden hier angezeigt, sobald der Ramadan
                  beginnt.
                </p>
              </div>

              <CountdownClock
                targetDate={RAMADAN_START_2026.getTime()}
                label="Ramadan 2026 in Berlin 🇩🇪"
              />

              <MosqueImage />

              {fastingData.days.length > 0 && (
                <div className="w-full max-w-6xl mt-8">
                  <p className="text-xl text-center mb-6">
                    Die Tage ({fastingData.days.length}{" "}
                    Tage) vom Ramadan in Berlin 🇩🇪 sind wie folgt:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
                    {fastingData.days.map((day) => (
                      <FastingDayCard key={day.key} day={day} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
          : (
            // During Ramadan - Show today's fasting info and progress
            <div className="w-full">
              {/* Main content: Row on desktop, column on mobile */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                {/* Left Column: Today's Info + Progress */}
                <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl">
                  {/* Today's Info */}
                  <section
                    className="text-center w-full"
                    aria-labelledby="today-heading"
                  >
                    <h2 id="today-heading" className="sr-only">
                      Heutiger Fastentag
                    </h2>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      Heute ist der{" "}
                      {todayFasting.index + 1}. Tag vom Ramadan in Berlin 🇩🇪
                    </p>
                    {todayFasting.isLaylatulQadr && (
                      <p className="text-3xl md:text-4xl font-bold italic text-green-400 mb-6">
                        ✨ Heute ist Laylatul Qadr ✨
                      </p>
                    )}

                    <div className="text-5xl md:text-6xl lg:text-7xl font-bold flex justify-center items-center gap-4 my-8">
                      <span>
                        {new Intl.DateTimeFormat("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(todayFasting.begin)} Uhr
                      </span>
                      <span className="opacity-50">-</span>
                      <span>
                        {new Intl.DateTimeFormat("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(todayFasting.end)} Uhr
                      </span>
                    </div>
                  </section>

                  {/* Progress Section */}
                  <section className="w-full" aria-label="Fasten-Fortschritt">
                    <FastingProgress fastingDay={todayFasting} now={now} />
                  </section>
                </div>

                {/* Right Column: Image */}
                <div className="flex-1 flex items-center justify-center w-full">
                  <section className="my-6 lg:my-8">
                    <MosqueImage />
                  </section>
                </div>
              </div>

              {/* Remaining Days - Centered Full Width */}
              {remainingDays.length > 0 && (
                <section
                  className="w-full max-w-7xl mx-auto mt-12"
                  aria-labelledby="remaining-heading"
                >
                  <h2
                    id="remaining-heading"
                    className="text-2xl md:text-3xl text-center mb-8"
                  >
                    Die restlichen Tage ({remainingDays.length}{" "}
                    {remainingDays.length === 1 ? "Tag" : "Tage"}) vom Ramadan
                    in Berlin 🇩🇪:
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 justify-items-center">
                    {remainingDays.map((day) => (
                      <FastingDayCard key={day.key} day={day} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
      </main>
    </div>
  );
});
