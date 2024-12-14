import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { signup } from "../../utils/auth";

function RegisterModal({ onSubmit, onClose, isOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    avatar: false,
  });

  const validateField = (field) => {
    const newErrors = { ...errors };

    if (field === "name") {
      if (!name.trim()) {
        newErrors.name = "Name is required";
      } else if (name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (field === "email") {
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "password") {
      if (!password.trim()) {
        newErrors.password = "Password is required";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else {
        delete newErrors.password;
      }
    }

    if (field === "avatar" && avatar) {
      try {
        new URL(avatar);
        delete newErrors.avatar;
      } catch {
        newErrors.avatar = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      avatar: Boolean(avatar),
    });

    // Validate all fields
    ["name", "email", "password", "avatar"].forEach(validateField);

    if (isFormValid()) {
      try {
        await signup({
          name,
          email,
          password,
          avatar: avatar || "https://via.placeholder.com/150",
        });
        console.log("Signup successful");
        onClose();
      } catch (error) {
        console.error("Error during signup:", error);
        setErrors((prev) => ({
          ...prev,
          submit: error.message || "Signup failed",
        }));
      }
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
    setErrors({});
    setTouched({
      name: false,
      email: false,
      password: false,
      avatar: false,
    });
    onClose();
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      closeActiveModal={handleClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isFormValid={isFormValid}
    >
      {errors.submit && <p className="modal__error">{errors.submit}</p>}

      <label>Name*</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => handleBlur("name")}
        className={`modal__input ${
          touched.name && errors.name ? "modal__input_type_error" : ""
        }`}
        required
      />
      {touched.name && errors.name && (
        <span className="modal__error">{errors.name}</span>
      )}

      <label>Email*</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur("email")}
        className={`modal__input ${
          touched.email && errors.email ? "modal__input_type_error" : ""
        }`}
        required
      />
      {touched.email && errors.email && (
        <span className="modal__error">{errors.email}</span>
      )}

      <label>Password*</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur("password")}
        className={`modal__input ${
          touched.password && errors.password ? "modal__input_type_error" : ""
        }`}
        required
      />
      {touched.password && errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}

      <label>Avatar URL (Optional)</label>
      <input
        type="text"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        onBlur={() => handleBlur("avatar")}
        className={`modal__input ${
          touched.avatar && errors.avatar ? "modal__input_type_error" : ""
        }`}
      />
      {touched.avatar && errors.avatar && (
        <span className="modal__error">{errors.avatar}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
