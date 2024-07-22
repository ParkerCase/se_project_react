import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [activeButton, setActiveButton] = useState(null);
  const [formFields, setFormFields] = useState({ name: "", link: "" });

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formFields.name.trim() !== "" &&
      formFields.link.trim() !== "" &&
      activeButton !== null
    );
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        isOpen={activeModal === "add-garment"}
        closeActiveModal={closeActiveModal}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        handleInputChange={handleInputChange}
        isFormValid={isFormValid}
      >
        <label htmlFor="name" className="modal__label">
          Name{""}
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{""}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            name="link"
            placeholder="Image URL"
            onChange={handleInputChange}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="hot"
            className={`modal__label modal__label_type_radio ${
              activeButton === "hot" ? "active" : ""
            }`}
          >
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              value="hot"
              checked={activeButton === "hot"}
              onChange={(e) => setActiveButton(e.target.value)}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className={`modal__label modal__label_type_radio ${
              activeButton === "warm" ? "active" : ""
            }`}
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              value="warm"
              checked={activeButton === "warm"}
              onChange={(e) => setActiveButton(e.target.value)}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className={`modal__label modal__label_type_radio ${
              activeButton === "cold" ? "active" : ""
            }`}
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              value="cold"
              checked={activeButton === "cold"}
              onChange={(e) => setActiveButton(e.target.value)}
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
