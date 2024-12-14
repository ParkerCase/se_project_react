import React, { useState, useContext, useEffect } from "react";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ name: false, avatar: false });

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setErrors({});
      setTouched({ name: false, avatar: false });
    }
  }, [isOpen, currentUser]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    if (field === "name") {
      if (!name.trim()) {
        newErrors.name = "Name is required";
      } else if (name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else if (name.length > 30) {
        newErrors.name = "Name must be less than 30 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (field === "avatar") {
      if (avatar && !isValidUrl(avatar)) {
        newErrors.avatar = "Please enter a valid URL";
      } else {
        delete newErrors.avatar;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, avatar: true });

    const nameValid = validateField("name");
    const avatarValid = validateField("avatar");

    if (nameValid && avatarValid) {
      try {
        await onUpdateUser({ name, avatar });
        onClose();
      } catch (error) {
        console.error("Error updating profile:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to update profile. Please try again.",
        }));
      }
    }
  };

  const isFormValid = () => {
    return (
      name.trim().length >= 2 &&
      name.trim().length <= 30 &&
      (!avatar || isValidUrl(avatar))
    );
  };

  return (
    <ModalWithForm
      title="Change profile data"
      closeActiveModal={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      buttonText="Save changes"
    >
      {errors.submit && <p className="modal__error">{errors.submit}</p>}
      <label className="add-item__label">
        Name
        <input
          className={`modal__input ${
            touched.name && errors.name ? "modal__input_type_error" : ""
          }`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur("name")}
          required
          minLength="2"
          maxLength="30"
          placeholder="Name"
        />
        {touched.name && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>

      <label className="add-item__label">
        Avatar URL
        <input
          className={`modal__input ${
            touched.avatar && errors.avatar ? "modal__input_type_error" : ""
          }`}
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          onBlur={() => handleBlur("avatar")}
          placeholder="Avatar URL"
        />
        {touched.avatar && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
