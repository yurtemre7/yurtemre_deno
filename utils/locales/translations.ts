import { Translations } from "../types.ts";
import enTranslation from "./en.ts";
import deTranslation from "./de.ts";
import jaTranslation from "./ja.ts";
import trTranslation from "./tr.ts";

const translations: Translations = {
  en: enTranslation,
  de: deTranslation,
  ja: jaTranslation,
  tr: trTranslation,
};

export default translations;
