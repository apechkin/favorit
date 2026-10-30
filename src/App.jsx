import "./App.css";
import { GoodsSearch } from "./app/components/goods/GoodsSearch";

function App() {
  return (
    <>
      <section id="center">
        <GoodsSearch />
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
