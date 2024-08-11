import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");

  // Reset the form state when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setSelectedWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setSelectedWeather(e.target.value);
  };

  const isFormValid = () => {
    return name.trim() !== "" && link.trim() !== "" && selectedWeather !== "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { name, link, selectedWeather }); // Log data to see what is being submitted
    if (name && link && selectedWeather) {
      onAddItem({ name, link, weather: selectedWeather });
    }
  };

  return (
    <ModalWithForm
      title="New Garment"
      closeActiveModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid} // Pass the form validation function
    >
      <label>
        Name
        <input
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Image
        <input
          type="text"
          name="link"
          minLength="1"
          maxLength="30"
          value={link}
          onChange={handleLinkChange}
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
            checked={selectedWeather === "hot"}
            onChange={handleWeatherChange}
          />
        </div>
        <label htmlFor="warm">Warm</label>
        <div>
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            checked={selectedWeather === "warm"}
            onChange={handleWeatherChange}
          />
        </div>
        <label htmlFor="cold">Cold</label>
        <div>
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            checked={selectedWeather === "cold"}
            onChange={handleWeatherChange}
          />
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
