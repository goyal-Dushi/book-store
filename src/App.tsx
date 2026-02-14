import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import RegisterPage from "@pages/Register";
import Home from "@pages/Home";
import Alert from "@components/alert";
import './index.css';
import AppNavbar from "@components/navbar";

function App() {
  return (
    <BrowserRouter>
        <AppNavbar />
        <div className="container container-fluid">
          <Alert />
          <Routes>
            <Route path={"/"} element={<Home/>} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<RegisterPage/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
