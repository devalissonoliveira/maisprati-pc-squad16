import { useState } from "react";
import "./App.css";
import Pages from "./pages/login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
