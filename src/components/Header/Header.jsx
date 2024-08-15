import React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <Link to="/profile" className="header__username-link">
          <p className="header__username">Parker Case</p>
        </Link>
        <Link to="/profile" className="header__avatar-link">
          <img src={avatar} alt="Profile photo" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
