import { MoveLeft } from "lucide-preact"
import { route } from "preact-router";
import Checkbox from "../components/checkbox";
import { useState, useEffect } from "preact/hooks";
import SettingsStore from "../lib/store";

interface Settings {
  groupSearch: boolean
}

function Settings() {
  const [settings, setSettings] = useState<Settings>({ groupSearch: true })
  const [loaded, setLoaded] = useState(true)

  const getSettings = async () => {
    setSettings({
      groupSearch: (await SettingsStore.get("useGroups")) ?? true
    })
    setLoaded(true)
  }

  useEffect(() => {
    getSettings()
  }, [])

  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <div
        className="absolute top-0 left-0 m-4 flex gap-4 font-bold transition hover:bg-gray-100 hover:cursor-pointer px-2 py-2 select-none"
        onClick={() => route("/")}
      >
        <MoveLeft /> Home
      </div>
      {loaded && (
        <div className="w-full flex flex-col items-center justify-center space-y-5">
          <Checkbox 
            default={settings.groupSearch} 
            onChecked={async (checked) => {
              await SettingsStore.set("useGroups", checked)
            }}
          >
            Search Groups
          </Checkbox>
        </div>
      )}
    </main>
  );
}

export default Settings;
