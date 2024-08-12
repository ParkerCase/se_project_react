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
      <label>
        Name
        <input
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Image
        <input
          type="text"
          name="link"
          minLength="1"
          maxLength="30"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <p>Select the weather type: </p>
      <div>
        <div>
          <label htmlFor="hot">Hot</label>
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <label htmlFor="warm">Warm</label>
        <div>
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <label htmlFor="cold">Cold</label>
        <div>
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
