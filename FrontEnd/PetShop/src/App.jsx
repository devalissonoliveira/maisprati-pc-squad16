import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesOfPage from "./router/router";
import NavBar from "./components/navBar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <article className="w-screen min-h-screen box-border">
          <NavBar />
          <RoutesOfPage />
        </article>
      </BrowserRouter>
    </>
  );
}

export default App;
