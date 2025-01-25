import { useState } from "react";
import "./App.css";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./pages/petRegistration";
import Home from "./pages/Home";
import Error from "./pages/Error";
import AppBar from "./components/AppBar";
import MockupPage from "./pages/MockupPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comofunciona" element={<MockupPage pageName={"comofunciona"}/>} />
          <Route path="/plano" element={<MockupPage pageName={"plano"}/>} />
          <Route path="/contato" element={<MockupPage pageName={"contato"}/>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
