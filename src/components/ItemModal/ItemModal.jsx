import "./ItemModal.css";
import closeicon from "../../assets/closeicon.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, closeActiveModal, card, handleDeleteCard }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const handleDelete = () => {
    const itemId = card.id || card._id; // Simplify the id selection
    console.log("Deleting item with id:", itemId); // Debug log
    handleDeleteCard(itemId);
  };

  if (!card) return null;

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
            e.target.src = "/api/placeholder/300/300";
          }}
        />

        <div className="modal__footer">
          <div className="modal__details">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isLoggedIn && (
            <button onClick={handleDelete} className="modal__delete-button">
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
