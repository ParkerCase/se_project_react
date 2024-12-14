import "./ItemModal.css";
import closeicon from "../../assets/closeicon.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, closeActiveModal, card, handleDeleteCard }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = currentUser && card && card.owner === currentUser._id;

  console.log("Card data in modal:", card); // Add this debug log

  const handleDeleteButtonClick = () => {
    if (card?._id) {
      handleDeleteCard(card._id);
    }
    closeActiveModal();
  };

  if (!card) {
    return null;
  }

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content_item">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeicon} alt="Close button" />
        </button>

        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
          onError={(e) => {
            console.log(
              "Modal image failed to load:",
              card.imageUrl || card.link
            );
            e.target.src = "https://placeholder.com/300x300";
          }}
        />

        <div className="modal__footer">
          <div className="modal__details">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <button
              onClick={handleDeleteButtonClick}
              className="modal__delete-button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
