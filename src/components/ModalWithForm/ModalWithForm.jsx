// import "./ModalWithForm.css";
// import closeform from "../../assets/closeform.svg";

// function ModalWithForm({
//   children,
//   buttonText = "Add Garment",
//   title,
//   closeActiveModal,
//   name,
//   isOpen,
//   onSubmit,
// }) {
//   return (
//     <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
//       <div className="modal__content">
//         <h2 className="modal__title">{title}</h2>
//         <button
//           onClick={closeActiveModal}
//           type="button"
//           className="modal__close"
//         >
//           <img src={closeform} alt="Close button" />
//         </button>
//         <form className="modal__form">
//           {children}
//           <button
//             type="submit"
//             className={`modal__submit ${
//               isFormValid() ? "" : "modal__submit_disabled"
//             }`}
//             disabled={!isFormValid()}
//           >
//             {buttonText}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ModalWithForm;

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
  isFormValid, // Ensure this is passed as a prop
}) {
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
