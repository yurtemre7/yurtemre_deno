// Provide a single exported helper that returns a localized "today is ..." string.
// Accepts a language code (e.g. 'en','de','ja','tr') and an optional Date object.
export default function dayLine(lang: string, date: Date = new Date()): string {
  const i = date.getDay();

  const maps = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    tr: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
    jaKanji: ["日", "月", "火", "水", "木", "金", "土"],
  } as const;

  // Normalize language to primary tag (e.g. 'en-US' -> 'en')
  const primary = (lang || "").toLowerCase().split("-")[0];

  switch (primary) {
    case "de":
      return `Heute ist ${maps.de[i]}`;
    case "ja":
      // Japanese prefers kanji weekday form
      return `今日は${maps.jaKanji[i]}曜日だ`;
    case "tr":
      return `Bugün ${maps.tr[i]}`;
    case "en":
    default:
      return `Today is ${maps.en[i]}`;
  }
}
