import React from "react";
import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <div className="header__infoblock">
        <p className="header__email">{props.email}</p>
        <button className="header__button" onClick={props.onSignOut}>
          <Link className="header__link" to={props.link}>
            {props.text}
          </Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
