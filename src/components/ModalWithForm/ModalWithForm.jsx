import React from "react";
import "./ModalWithForm.css";
import closeform from "../../assets/closeform.svg";

function ModalWithForm({
  children,
  buttonText = "Add Garment",
  title,
  closeActiveModal,
  isOpen,
  onSubmit,
  isFormValid,
}) {
  const validForm = typeof isFormValid === "function" ? isFormValid() : true;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeform} alt="Close button" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={`modal__submit ${
              validForm ? "" : "modal__submit_disabled"
            }`}
            disabled={!validForm}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
