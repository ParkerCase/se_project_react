import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./AddItemModal.css";
import "../ModalWithForm/ModalWithForm.css";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, resetForm, isValid } = useFormAndValidation({
    name: "",
    imageUrl: "",
    weather: "",
  });

  console.log("AddItemModal isOpen:", isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from navigating away

    if (isValid && onAddItem) {
      try {
        await onAddItem(values); // Wait for the onAddItem function to complete
        resetForm(); // Reset form fields
        onCloseModal(); // Close the modal
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (!isOpen) return null;

  console.log("Rendering AddItemModal");
  console.log("AddItemModal isOpen:", isOpen);
  console.log("Form isValid:", isValid);

  return (
    <ModalWithForm
      title="New Garment"
      closeActiveModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={() => isValid}
    >
      <label className="add-item__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__input">
        Image
        <input
          className=""
          type="text"
          name="imageUrl"
          minLength="1"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
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
            checked={values.weather === "hot"}
            onChange={handleChange}
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
            checked={values.weather === "warm"}
            onChange={handleChange}
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
            checked={values.weather === "cold"}
            onChange={handleChange}
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
