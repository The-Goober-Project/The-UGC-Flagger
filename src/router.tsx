import { Route, Router } from "preact-router"
import Searcher from "./pages/App";
import Settings from "./pages/Settings";

function App() {

  return (
    <main className="flex justify-center items-center h-screen">
      <Router>
        <Route path="/" component={Searcher} />
        <Route path="/settings" component={Settings} />
      </Router>
    </main>
  );
}

export default App;
