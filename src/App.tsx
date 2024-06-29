import { registerSW } from "./util/registerSW"
import { CommandMenu } from "./components/CommandMenu"

await registerSW();

function App() {
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
