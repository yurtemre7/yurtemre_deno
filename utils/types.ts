export type Locale = "en" | "ja" | "de";

export type Translations = {
  [key: string]: {
    name: string;
    profession: string;
    bornInfo: string;
    experience: string;
    projects: string;
    woautoDesc: string;
    parenDesc: string;
    steelMouseDesc: string;
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
    present: string;
  };
};
