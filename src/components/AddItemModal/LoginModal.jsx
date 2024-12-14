import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onSubmit, onClose, errorMessage, isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const isFormValid = () => email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isFormValid={isFormValid}
      renderFooter={
        <a
          href="#"
          className="modal__link"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, "", "/signup");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
        >
          or Sign Up
        </a>
      }
    >
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
