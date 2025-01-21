import { useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Register  from "./pages/petRegistration";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login /> */}
      <Register/>
    </>
  );
}

export default App;
