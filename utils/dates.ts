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
