import "./ItemModal.css";
import closeicon from "../../assets/closeicon.svg";

function ItemModal({ activeModal, closeActiveModal, card, handleDeleteCard }) {
  const handleDeleteButtonClick = () => {
    handleDeleteCard(card._id);
    closeActiveModal();
  };
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content_item modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeicon} alt="Close button" />
        </button>
        <img src={card.imageUrl} alt="Modal Image" className="modal__image" />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div>
            <button
              onClick={handleDeleteButtonClick}
              className="modal__delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
