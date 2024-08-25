// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $datenschutz from "./routes/datenschutz.tsx";
import * as $deeplink from "./routes/deeplink.tsx";
import * as $fasting from "./routes/fasting.tsx";
import * as $impressum from "./routes/impressum.tsx";
import * as $index from "./routes/index.tsx";
import * as $sync from "./routes/sync.tsx";
import * as $DateCountdown from "./islands/DateCountdown.tsx";
import * as $DeeplinkButton from "./islands/DeeplinkButton.tsx";
import * as $SyncButton from "./islands/SyncButton.tsx";
import * as $about from "./islands/about.tsx";
import * as $ai_chat from "./islands/ai_chat.tsx";
import * as $fasting_widget from "./islands/fasting_widget.tsx";
import * as $my_apps from "./islands/my_apps.tsx";
import * as $paren_flutter from "./islands/paren_flutter.tsx";
import * as $smoothscroll_btn from "./islands/smoothscroll_btn.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/datenschutz.tsx": $datenschutz,
    "./routes/deeplink.tsx": $deeplink,
    "./routes/fasting.tsx": $fasting,
    "./routes/impressum.tsx": $impressum,
    "./routes/index.tsx": $index,
    "./routes/sync.tsx": $sync,
  },
  islands: {
    "./islands/DateCountdown.tsx": $DateCountdown,
    "./islands/DeeplinkButton.tsx": $DeeplinkButton,
    "./islands/SyncButton.tsx": $SyncButton,
    "./islands/about.tsx": $about,
    "./islands/ai_chat.tsx": $ai_chat,
    "./islands/fasting_widget.tsx": $fasting_widget,
    "./islands/my_apps.tsx": $my_apps,
    "./islands/paren_flutter.tsx": $paren_flutter,
    "./islands/smoothscroll_btn.tsx": $smoothscroll_btn,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
