import { routing } from "@/i18n/routing";
import { formats } from "@/i18n/request";
import messages from "../messages/en.json";

declare module "next-intl" {
  // noinspection JSUnusedGlobalSymbols
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Klarna: any; // Or define a proper type if needed
  }
}
