import React from "react";
import "./ModalWithForm.css";
import closeform from "../../assets/closeform.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  closeActiveModal,
  isOpen,
  onSubmit,
  isFormValid = () => true, // Default validation function
  renderFooter,
}) {
  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeActiveModal();
    }
  };

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, closeActiveModal]);

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeform} alt="Close button" />
        </button>
        <form
          className="modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          {children}
          <div className="modal__actions">
            <button
              type="submit"
              className={`modal__submit ${
                !isFormValid() ? "modal__submit_disabled" : ""
              }`}
              disabled={!isFormValid()}
            >
              {buttonText || "Submit"} {/* Use the buttonText prop here */}
            </button>
            {renderFooter && (
              <div className="modal__footer">{renderFooter}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
