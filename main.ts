import { App, staticFiles } from "fresh";
import { type State } from "./utils.ts";

export const app = new App<State>();

app.use(staticFiles());

const SUPPORTED_LANGUAGES = ["en", "de", "ja", "tr"];

function getPreferredLanguage(acceptLanguageHeader: string): string {
  const preferences = acceptLanguageHeader
    .split(",")
    .map((part) => {
      const [tag, q] = part.split(";q=");
      const primary = tag.trim().toLowerCase().split("-")[0];
      const quality = q ? parseFloat(q) : 1.0;
      return { tag: primary, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const pref of preferences) {
    if (SUPPORTED_LANGUAGES.includes(pref.tag)) {
      return pref.tag;
    }
  }

  return "en";
}

// Pass a shared value from a middleware
app.use(async (ctx) => {
  ctx.state.shared = "hello";
  const acceptLanguage = ctx.req.headers.get("accept-language") || "";
  ctx.state.language = getPreferredLanguage(
    acceptLanguage,
  ) as State["language"];
  return await ctx.next();
});

// Include file-system based routes here
app.fsRoutes();
