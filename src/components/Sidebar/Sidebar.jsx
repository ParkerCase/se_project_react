import React from "react";
import avatar from "../../assets/avatar.svg";
import "./Sidebar.css";

function Sidebar({ onSignOut }) {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Profile Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Parker Case</p>
      <button onClick={onSignOut} className="sidebar__sign-out-btn">
        Sign Out
      </button>
    </div>
  );
}

export default Sidebar;
