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

  // Add safe defaults for currentUser
  const userName = currentUser?.name || "Guest";
  const userAvatar = currentUser?.avatar || avatar;

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      {/* Current date and city */}
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      {/* Temperature unit toggle switch */}
      <ToggleSwitch />

      {/* Add Clothes button */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent any form submission or navigation
          handleAddClick();
        }}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>

      {/* User authentication buttons */}
      <div className="header__user-container">
        {isLoggedIn ? (
          <>
            {/* Display user profile and avatar if logged in */}
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
          <>
            {/* Sign Up button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleOpenRegisterModal(); // Opens Register Modal
              }}
              className="header__register-btn"
            >
              Sign Up
            </button>

            {/* Log In button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleOpenLoginModal(); // Opens Login Modal
              }}
              className="header__login-btn"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
