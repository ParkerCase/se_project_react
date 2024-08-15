import React from "react";

// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
