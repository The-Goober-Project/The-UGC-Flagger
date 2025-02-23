import { route } from "preact-router";
import Button from "../components/button";
import Input from "../components/input";
import Link from "../components/link";
import TitleCard from "../components/title";
import {message} from "@tauri-apps/plugin-dialog"

import { useState } from "preact/hooks"
import { FullSearch } from "../lib/api";

function Searcher() {
  // const [reviewMode, setReviewing] = useState(true)
  const [inImportantAction, setImportant] = useState(false)
  const [query, setQuery] = useState("")

  async function startKeywordSearch(){
    setImportant(true)

    const result = await FullSearch(query)
     
    if(result == false) {
      message(`The result you've entered in (${query}) is filtered!`, {title: "Search Failed", kind: "error"})
      return setImportant(false)
    }
    if(!result){
      message(`Something else errored while trying to commence the search`, {title: "Search Failed", kind: "error"})
      return setImportant(false)
    }

    console.log(result)

    setImportant(false)
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="absolute top-0 mt-4 w-full flex justify-center">
        <TitleCard className="h-1/7 w-1/2" />
      </div>

      <div className="w-6/10 text-center space-y-4">
        <p>Type in a search query to get started. Items will automatically be collected and shuffled through certain groups.</p>

        <Input
          placeholder="Search Query"
          disabled={false}
          onChange={(e) => { if (e.target) setQuery((e.target as HTMLInputElement).value) }}
          value={query}
        />

        <div className="flex flex-col w-full items-center justify-center text-center mx-auto">
          <Button
            variant="Primary"
            className="w-9/12 mb-2"
            onClick={() => startKeywordSearch()}
            disabled={inImportantAction}
          >
            Start Search
          </Button>

          <Button
            variant="Casual"
            className="w-4/12"
            onClick={() => route("/settings")}
          >
            Settings
          </Button>
        </div>
        <p className="text-gray-400 text-xs">You agree that you may be rate-limited from ROBLOX's API while using this.</p>
      </div>

      <div className="absolute bottom-0 mb-4 w-full flex justify-center">
        <div className="flex">
          <p>Join our <Link url="https://discord.com/invite/7wXz3Cu4CE">Discord</Link></p>
          <span className="mx-1">|</span>
          <p>Stay safe...</p>
        </div>
      </div>
    </main>
  );
}

export default Searcher;
