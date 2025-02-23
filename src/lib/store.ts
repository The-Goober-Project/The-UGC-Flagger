import {load} from "@tauri-apps/plugin-store"

const SettingsStore = await load("store.json")

export default SettingsStore