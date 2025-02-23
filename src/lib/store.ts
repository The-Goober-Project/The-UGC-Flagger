import { load, type Store } from "@tauri-apps/plugin-store";

let SettingsStore: Store | null = null;

export async function getStore(){
  const store = SettingsStore ?? await load("store.json")
  SettingsStore = store
  return store
}

export default SettingsStore;