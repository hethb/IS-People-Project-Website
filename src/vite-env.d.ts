/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Maps JavaScript API key (enable “Maps JavaScript API” in Google Cloud). */
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
