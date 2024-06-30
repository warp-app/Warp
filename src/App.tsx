import { registerSW } from "./util/registerSW"
import { CommandMenu } from "./components/CommandMenu"
import { encodeURL } from "./util/encodeURL";

(async () => {
  await registerSW();
})();

function App() {
  //@ts-ignore
  window.encodeURL = encodeURL;
  console.log(`await encodeURL("ultraviolet", "https://example.com")`)
  console.log(`await encodeURL("rammerhead", "https://example.com")`)
  return (
    <>
      <div className="main">
        <h1 className="title">Warp</h1>
        <CommandMenu />
      </div>
    </>
  )
}

export default App
