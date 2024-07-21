import "./ModalWithForm.css";
import closeform from "../../assets/closeform.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  closeActiveModal,
  activeButton,
  setActiveButton,
  isFormValid,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "add-garment" ? "modal__opened" : ""
      }`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeform} alt="Close form" />
        </button>
        <form className="modal__form">
          {children}
          <button
            type="submit"
            className={`modal__submit ${
              isFormValid() ? "" : "modal__submit_disabled"
            }`}
            disabled={!isFormValid()}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
