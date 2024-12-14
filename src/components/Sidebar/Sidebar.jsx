import React, { useContext } from "react";
import avatar from "../../assets/avatar.svg";
import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ onSignOut, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleEditClick = () => {
    console.log("Edit profile button clicked"); // Add this debug log
    if (onEditProfile) {
      onEditProfile();
    } else {
      console.log("onEditProfile is undefined"); // Debug log
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        <img
          src={currentUser?.avatar || avatar}
          alt="Profile Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">
          {currentUser ? currentUser.name : "Guest"}
        </p>
      </div>

      <button className="sidebar__edit-button" onClick={handleEditClick}>
        Change profile data
      </button>

      <button onClick={onSignOut} className="sidebar__sign-out-btn">
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
