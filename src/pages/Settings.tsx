import { MoveLeft } from "lucide-preact"
import { route } from "preact-router";
import Checkbox from "../components/checkbox";
import { useState, useEffect } from "preact/hooks";
import SettingsStore, { getStore } from "../lib/store";
import Link from "../components/link";
import Input from "../components/input";
import { check, type Update } from "@tauri-apps/plugin-updater"
import Button from "../components/button";
import { app } from "@tauri-apps/api"
import {exit, relaunch} from "@tauri-apps/plugin-process"

interface Settings {
  groupSearch: boolean,
  githubPAT: string,
  version: string
}

function Settings() {
  const [settings, setSettings] = useState<Settings>({ groupSearch: false, githubPAT: "", version: "0.0.0" })
  const [loaded, setLoaded] = useState(false)
  const [updateDone, setUpdateDone] = useState(false)
  const [updating, setUpdateStatus] = useState(false)
  const [updateInfo, setUpdateInfo] = useState<Update | null>(null)

  const getSettings = async () => {
    const store = await getStore()
    setSettings({
      groupSearch: (await store?.get("useGroups")) ?? true,
      githubPAT: await store?.get("githubPAT") ?? "",
      version: await app.getVersion()
    })
    setUpdateInfo(await check())
    setLoaded(true)
  }

  useEffect(() => {
    getSettings()
  }, [])

  return (
    <main className="flex justify-center items-center h-screen w-screen">
      {!updating && (
        <div
          className="absolute top-0 left-0 m-4 flex gap-4 font-bold transition hover:bg-gray-100 hover:cursor-pointer px-2 py-2 select-none"
          onClick={() => route("/")}
        >
          <MoveLeft /> Home
        </div>
      )}
      {(loaded && !updating) && (
        <div className="w-full flex flex-col items-center justify-center space-y-5">
          <h1 class="text-lg">Searching</h1>

          <Checkbox
            default={settings.groupSearch}
            onChecked={async (checked) => {
              await SettingsStore!.set("useGroups", checked)
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
                  await SettingsStore!.set("githubPAT", (e.target as HTMLInputElement).value)
                }
              }}
            />
            <p class="text-sm text-gray-400">Go to <Link url="https://github.com/settings/personal-access-tokens" className="text-blue-300">Your PATs on Github</Link> and make a new token that can write to github gists</p>
          </div>

          <div className="bg-gray-300 w-9/12 h-px my-4" />
          <h1 class="text-lg">Extra</h1>
          <div class="w-full flex flex-col items-center space-y-1">
            <div class="text-center text-xs">
              <p>Current Version: {settings.version} | {updateInfo ? `Next Version: ${updateInfo.version}` : "You're all up to date!"}</p>
            </div>
            <Button
              disabled={!updateInfo}
              variant="Primary"
              onClick={async () => {
                setLoaded(false)
                setUpdateStatus(true)
                await updateInfo?.downloadAndInstall()
                setUpdateDone(true)
              }}
            >
              Update
            </Button>
          </div>
        </div>
      )}

      {updating && (
        <div class="w-11/12 text-center lg:text-3xl md:text-lg space-y-2">
          <p>{updateDone ? "The UGC Tracker has been updated." : "We are installing an update for The UGC Tracker"}</p>
          {updateDone && (
            <div class="gap-2 flex items-center justify-center">
              <Button
                variant="Primary"
                className="w-1/4"
                onClick={() => relaunch()}
              >
                Restart
              </Button>

              <Button
                variant="Danger"
                className="w-1/4"
                onClick={() => exit()}
              >
                Exit
              </Button>
            </div>
          )}
          <audio src="https://cdn.thegoober.xyz/files/updating.mp3" autoplay loop volume={0.05}/>
        </div>
      )}
    </main>
  );
}

export default Settings;
