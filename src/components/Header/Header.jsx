import React, { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleOpenLoginModal,
  handleOpenRegisterModal,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const userName = currentUser?.name || "Guest";
  const userAvatar = currentUser?.avatar || avatar;

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {/* Only show Add Clothes button when logged in */}
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}

      <div className="header__user-container">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="header__username-link">
              <p className="header__username">{userName}</p>
            </Link>
            <Link to="/profile" className="header__avatar-link">
              <img
                src={userAvatar}
                alt={`${userName}'s avatar`}
                className="header__avatar"
              />
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={handleOpenRegisterModal}
              className="header__register-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleOpenLoginModal}
              className="header__login-btn"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
