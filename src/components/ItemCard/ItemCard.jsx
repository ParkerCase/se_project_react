import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import like from "../../assets/like.svg";
import activeLike from "../../assets/active-like.svg";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLoggedIn && onCardLike) {
      // Use either numeric id for default items or _id for user items
      const itemId = typeof item.id === "number" ? item.id : item._id;
      const isItemLiked = item.likes?.some((id) => id === currentUser?._id);
      onCardLike({ id: itemId, isLiked: isItemLiked });
    }
  };

  return (
    <li className="card" onClick={() => handleCardClick(item)}>
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            onClick={handleLike}
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
          >
            <img
              src={isLiked ? activeLike : like}
              alt="Like button"
              className="card__like-icon"
            />
          </button>
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl || item.link || "/api/placeholder/300/300"}
        alt={item.name}
        onError={(e) => {
          e.target.src = "/api/placeholder/300/300";
        }}
      />
    </li>
  );
}

export default ItemCard;
