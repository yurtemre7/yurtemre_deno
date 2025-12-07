// src/utils/dates.ts
export const getNextBirthday = () => {
  const today = new Date();
  const year = today.getFullYear() + (today.getMonth() > 0 || 1 ? 1 : 0);
  return new Date(`${year}-01-16T00:00:00`);
};

export const getNextNewYears = () => {
  const today = new Date();
  const year = today.getFullYear() + 1;
  return new Date(`${year}-01-01T00:00:00`);
};

export const getNextYearValue = () => {
  return new Date().getFullYear() + 1;
};

export const formatMonthYear = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" })
    .format(date);
};

export const calculateDurationInYearsAndMonths = (
  startDate: Date,
  endDate: Date | "present",
  locale: string = "en",
): string => {
  const end = endDate === "present" ? new Date() : endDate;
  // If the start is after the end, return a localized zero-duration string.
  if (startDate.getTime() > end.getTime()) {
    const lang = (locale || "en").split(/[-_]/)[0].toLowerCase();
    const localizedZero = (l: string) => {
      switch (l) {
        case "de":
          return "0 Monate";
        case "tr":
          return "0 ay";
        case "ja":
          return "0ヶ月";
        default:
          return "0 months";
      }
    };
    return localizedZero(lang);
  }

  let years = end.getFullYear() - startDate.getFullYear();
  let months = end.getMonth() - startDate.getMonth();

  // Normalize when months is negative (borrow one year)
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  let yearPart = "";
  let monthPart = "";
  const lang = (locale || "en").split(/[-_]/)[0].toLowerCase();

  switch (lang) {
    case "de":
      yearPart = years > 0 ? `${years} Jahr${years > 1 ? "e" : ""}` : "";
      monthPart = months > 0 ? `${months} Monat${months > 1 ? "e" : ""}` : "";
      break;
    case "tr":
      yearPart = years > 0 ? `${years} yıl` : "";
      monthPart = months > 0 ? `${months} ay` : "";
      break;
    case "ja":
      // Combine years and months without an extra space: "X年Yヶ月"
      if (years > 0 || months > 0) {
        const y = years > 0 ? `${years}年` : "";
        const m = months > 0 ? `${months}ヶ月` : "";
        yearPart = `${y}${m}`;
        monthPart = "";
      }
      break;
    default: // "en" and fallback
      yearPart = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
      monthPart = months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";
      break;
  }

  const result = [yearPart, monthPart].filter(Boolean).join(" ");
  return result || ((): string => {
    // If both parts are empty (e.g. same month/year), return localized zero.
    switch (lang) {
      case "de":
        return "0 Monate";
      case "tr":
        return "0 ay";
      case "ja":
        return "0ヶ月";
      default:
        return "0 months";
    }
  })();
};
