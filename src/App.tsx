import Button from "./components/button";
import Input from "./components/input";
import Link from "./components/link";
import TitleCard from "./components/title";

import {useState} from "preact/hooks"

function App() {
  const [query, setQuery] = useState("")

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
          onChange={(e) => {if(e.target) setQuery((e.target as HTMLInputElement).value)}}
          value={query}
        />

        <Button
          variant="Primary"
        >
          Start Search
        </Button>
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

export default App;
