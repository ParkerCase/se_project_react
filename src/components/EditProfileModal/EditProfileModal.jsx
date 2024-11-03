import React, { useState, useContext, useEffect } from "react";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Use empty strings as default values to prevent null or undefined errors
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal__content">
          <button onClick={onClose} className="modal__close-btn">
            ×
          </button>
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Avatar URL:
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </label>
            <button type="submit" className="modal__save-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default EditProfileModal;
