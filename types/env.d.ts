/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_UPDATE_TIME: string
  // More environment variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
