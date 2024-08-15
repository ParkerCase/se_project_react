import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      onAddItem({ name, imageUrl, weather });
      setName("");
      setImageUrl("");
      setWeather("");
    }
  };

  function isFormValid() {
    return (
      name.trim() !== "" && imageUrl.trim() !== "" && weather.trim() !== ""
    );
  }

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="New Garment"
      closeActiveModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid()}
    >
      <label className="add-item__label">
        Name
        <input
          className="add-item__placeholder"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="add-item__label">
        Image
        <input
          className="add-item__placeholder"
          type="text"
          name="imageUrl"
          minLength="1"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <p className="add-item__weather">Select the weather type: </p>
      <div>
        <div className="add-item__radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label className="add-item__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="add-item__radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label className="add-item__radio-label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="add-item__radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <label className="add-item__radio-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
