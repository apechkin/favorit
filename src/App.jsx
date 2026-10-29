import "./App.css";
import { Search } from "./app/Search";

function App() {
  return (
    <>
      <section id="center">
        <Search />
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
