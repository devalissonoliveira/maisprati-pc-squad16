import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesOfPage from "./router/router";
import NavBar from "./components/navBar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AlertProvider>
          <AuthProvider>
            <article className="w-screen min-h-screen box-border">
              <NavBar />
              <RoutesOfPage />
            </article>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
