// Update LoginModal.jsx

import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  onSubmit,
  onClose,
  errorMessage,
  isOpen,
  handleToggleModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const isFormValid = () => email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isFormValid={isFormValid}
      renderFooter={
        <button
          className="modal__link"
          onClick={(e) => {
            e.preventDefault();
            handleToggleModal("signup");
          }}
        >
          or Sign Up
        </button>
      }
    >
      <label className="modal__label">Email*</label>
      <input
        className="modal__input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <label className="modal__label">Password*</label>
      <input
        className="modal__input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

      {errorMessage && <span className="modal__error">{errorMessage}</span>}
    </ModalWithForm>
  );
}

export default LoginModal;
