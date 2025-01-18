// Update ClothesSection.jsx

import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);

  // Filter items to show
  const itemsToShow = clothingItems.filter(
    (item) => !item.owner || item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards-list">
        {itemsToShow.length > 0 ? (
          itemsToShow.map((item) => (
            <ItemCard
              key={item._id || `default-${item.id}`} // Ensure unique keys for both user and default items
              item={item}
              handleCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p className="clothes-section__no-items">You have no items yet.</p>
        )}
      </ul>
    </div>
  );
}
export default ClothesSection;
