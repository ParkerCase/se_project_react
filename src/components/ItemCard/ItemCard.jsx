import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleGarmentClick = () => {
    handleCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  console.log("Image URL:", item.link || item.imageUrl);
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleGarmentClick}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
        onError={(e) => {
          e.target.src =
            "https://media.gq.com/photos/646baa821fa990bc7018e902/1:1/w_2001,h_2001,c_limit/GQ0723_Gosling_01.jpg";
        }}
      />
      {isLoggedIn && (
        <button onClick={handleLike} className={itemLikeButtonClassName}>
          Like
        </button>
      )}
    </li>
  );
}

export default ItemCard;
