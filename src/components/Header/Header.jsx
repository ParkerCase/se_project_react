import React, { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="header__username-link">
              <p className="header__username">{currentUser.name}</p>
            </Link>
            <Link to="/profile" className="header__avatar-link">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          </>
        ) : (
          <Link to="/login" className="header__login-link">
            <button type="button" className="header__login-btn">
              Log In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
