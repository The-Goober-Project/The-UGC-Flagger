import { route } from "preact-router";
import Button from "../components/button";
import Input from "../components/input";
import Link from "../components/link";
import TitleCard from "../components/title";
import { message } from "@tauri-apps/plugin-dialog"

import { useState } from "preact/hooks"
import { type CatalogItemWithThumbnail, FullSearch } from "../lib/api";
import RobuxIcon from "../components/robuxIcon";
import SettingsStore from "../lib/store";

function Searcher() {
  const [windowType, setWindowType] = useState<"REVIEW" | "START" | "LOADING">("START")
  const [reviewItems, setReviewItems] = useState<Array<CatalogItemWithThumbnail>>([])
  const [reviewIdx, setReviewIdx] = useState<number>(0)

  const [inImportantAction, setImportant] = useState(false)
  const [query, setQuery] = useState("")

  async function startKeywordSearch() {
    setImportant(true)
    setWindowType("LOADING")

    const result = await FullSearch(query, await SettingsStore.get("useGroups"))

    if (result == false) {
      setWindowType("START")
      message(`The result you've entered in (${query}) is filtered!`, { title: "Search Failed", kind: "error" })
      return setImportant(false)
    }
    if (!result) {
      setWindowType("START")
      message(`Something else errored while trying to commence the search`, { title: "Search Failed", kind: "error" })
      return setImportant(false)
    }

    setWindowType("REVIEW")
    setReviewItems(result)
    setReviewIdx(0)

    setImportant(false)
  }

  function nextItem() {
    setImportant(true)
    setReviewIdx(reviewIdx + 1)
    setTimeout(() => setImportant(false), 400)
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="absolute top-0 mt-4 w-full flex justify-center">
        <TitleCard className="h-1/7 w-1/2" />
      </div>

      <div className="w-full flex justify-center text-center mt-10">
        {windowType == "START" && (
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
        )}

        {windowType == "LOADING" && (
          <p>
            We're searching items for you! We'll notify you automatically when the collection process is done.
          </p>
        )}

        {windowType == "REVIEW" && (
          <div className="w-full text-center space-y-2 flex flex-col items-center mt-6">
            <img
              src={reviewItems[reviewIdx].thumbnail}
              width={150}
              height={150}
              className={"w-32 h-auto bg-gray-200 rounded-lg"}
            />
            <div className="flex flex-col gap-2 justify-center items-center text-center bg-gray-100 rounded-md py-2 px-2">
              <h1 className="font-bold text-lg">{reviewItems[reviewIdx].name}</h1>
              <p className="flex gap-2">{reviewItems[reviewIdx].price == 0 ? "FREE" : (<><RobuxIcon /> {reviewItems[reviewIdx].price}</>)}</p>
              <p>By <Link url={`https://rblx.${reviewItems[reviewIdx].creatorType == "Group" ? "social" : "name"}/${reviewItems[reviewIdx].creatorTargetId}`}>{reviewItems[reviewIdx].creatorName}</Link></p>
            </div>
            <div className="flex gap-2 w-full">
              <Button onClick={() => nextItem()} disabled={inImportantAction}>Next</Button>
              <Button variant="Danger" onClick={() => nextItem()} disabled={inImportantAction}>Flag</Button>
            </div>
            <p class="text-xs">{reviewIdx + 1}/{reviewItems.length} items | <a class="hover:underline hover:cursor-pointer">Conclude Search</a></p>
          </div>
        )}

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
