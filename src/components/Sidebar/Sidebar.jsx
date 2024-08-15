import avatar from "../../assets/avatar.svg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Profile Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Parker Case</p>
    </div>
  );
}

export default Sidebar;
