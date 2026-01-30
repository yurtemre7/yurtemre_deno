export type Locale = "en" | "ja" | "de" | "tr";

export type Translations = {
  [key: string]: {
    name: string;
    profession: string;
    bornInfo: string;
    experience: string;
    projects: string;
    blog: string;
    woautoDesc: string;
    parenDesc: string;
    steelMouseDesc: string;
    email: string;
    telegram: string;
    github: string;
    linkedin: string;
    fasting: string;
    copyright: string;
    impressum: string;
    datenschutz: string;
    countdownLabel: string;
    countdownLabels: string[];
    programmingSkills: string;
    languageSkills: string;
    programmingItems: string[];
    languageItems: string[];
    present: string;
  };
};
