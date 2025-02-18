import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesOfPage from "./router/router";
import NavBar from "./components/navBar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <RoutesOfPage />
      </BrowserRouter>
    </>
  );
}

export default App;
