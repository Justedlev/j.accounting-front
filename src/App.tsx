import { Navigate, Route, Routes } from "react-router-dom";
import "./App.sass";
import AccountComponent from "./components/account/AccountComponent";
import HomeComponent from "./components/home/HomeComponent";
import LoginComponent from "./components/login/LoginComponent";
import NavbarComponent from "./components/navigation/NavbarComponent";
import SignupComponent from "./components/signup/SignupComponent";
import { pathLabel } from "./config/menu";
import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";

function App() {
	const appState = useAppSelector((state: RootState) => state);
	console.log("🚀 ~ file: App.tsx:14 ~ App ~ appState", appState)

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
