import { MoveLeft } from "lucide-preact"
import { route } from "preact-router";
import Checkbox from "../components/checkbox";
import { useState, useEffect } from "preact/hooks";
import SettingsStore from "../lib/store";
import { open } from "@tauri-apps/plugin-dialog"
import Link from "../components/link";
import Input from "../components/input";

interface Settings {
  groupSearch: boolean,
  githubPAT: string
}

function Settings() {
  const [settings, setSettings] = useState<Settings>({ groupSearch: false, githubPAT: "" })
  const [loaded, setLoaded] = useState(false)

  const getSettings = async () => {
    setSettings({
      groupSearch: (await SettingsStore.get("useGroups")) ?? true,
      githubPAT: await SettingsStore.get("githubPAT") ?? ""
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
          <h1 class="text-lg">Searching</h1>

          <Checkbox
            default={settings.groupSearch}
            onChecked={async (checked) => {
              await SettingsStore.set("useGroups", checked)
            }}
          >
            Search Groups
          </Checkbox>

          <div className="bg-gray-300 w-9/12 h-px my-4" />

          <h1 class="text-lg">Uploaders</h1>
          <div class="flex flex-col space-y-1 items-center">
            <h2 class="text-left self-start">Github Gist Token</h2>
            <Input
              placeholder="Github Gist Token"
              value={settings.githubPAT}
              className="blur-xs hover:blur-none"
              onChange={async (e) => {
                if (e) {
                  await SettingsStore.set("githubPAT", (e.target as HTMLInputElement).value)
                }
              }}
            />
            <p class="text-sm text-gray-400">Go to <Link url="https://github.com/settings/personal-access-tokens" className="text-blue-300">Your PATs on Github</Link> and make a new token that can write to github gists</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Settings;
