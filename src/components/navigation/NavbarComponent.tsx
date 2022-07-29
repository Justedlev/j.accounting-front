import React from "react";
import classes from "./Navbar.module.sass";
import { AppBar, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/features/logout-slice";
import { RootState } from "../../store/store";
import { pathLabel } from "../../config/menu";
import { LoginState } from "../../store/features/login-slice";
import { isEmpty } from "lodash";

function NavbarComponent() {
  const dispatch = useAppDispatch();
  const loginState: LoginState = useAppSelector((state: RootState) => state.login);

  function getLoginElement(): JSX.Element {
    return (
      <Link to={pathLabel.login.path} className={classes.link_style} style={{ marginLeft: "auto" }}>
        {pathLabel.login.label}
      </Link>
    );
  }

  function getLogoutElement(): JSX.Element {
    return (
      <div style={{ marginLeft: "auto" }}>
        <Link to={pathLabel.home.path} className={classes.link_style} onClick={() => dispatch(logout())}>
          {pathLabel.logout.label}
        </Link>
      </div>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink className={classes.logo} to={pathLabel.home.path}>
          {/* <img className={classes.logo_icon} alt="logo" /> */}
          <span className={classes.logo_title}>{pathLabel.home.label}</span>
        </NavLink>
        {isEmpty(loginState.response.token.accessToken) ? getLoginElement() : getLogoutElement()}
      </Toolbar>
    </AppBar>
  );
}
export default NavbarComponent;
