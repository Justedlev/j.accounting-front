import { Navigate, Route, Routes } from "react-router-dom";
import "./App.sass";
import AccountComponent from "./components/account/AccountComponent";
import HomeComponent from "./components/home/HomeComponent";
import LoginComponent from "./components/login/LoginComponent";
import NavbarComponent from "./components/navigation/NavbarComponent";
import SignupComponent from "./components/signup/SignupComponent";
import { pathLabel } from "./config/menu";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path={pathLabel.home.path} element={<HomeComponent />} />
        <Route path={pathLabel.login.path} element={<LoginComponent />} />
        <Route path={pathLabel.signup.path} element={<SignupComponent />} />
        <Route path={pathLabel.account.path}>
          <Route path={":nickname"} element={<AccountComponent />} />
        </Route>
        <Route path="*" element={<Navigate replace to={pathLabel.home.path} />} />
      </Routes>
    </>
  );
}

export default App;
