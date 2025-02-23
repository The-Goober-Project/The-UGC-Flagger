import { load, type Store } from "@tauri-apps/plugin-store";

let SettingsStore: Store | null = null;

(async () => {
  SettingsStore = await load("store.json");
})();

export default SettingsStore;