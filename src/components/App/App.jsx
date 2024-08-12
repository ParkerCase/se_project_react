import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../Contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddItemSubmit = (newItem) => {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem, ...defaultClothingItems]);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
      });
  };

  const handleDeleteCard = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((defaultClothingItems) =>
          defaultClothingItems.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleResetToDefaults = () => {
    setClothingItems([...defaultClothingItems]);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  useEffect(() => {
    const fetchAndProcessWeatherData = async () => {
      try {
        const data = await getWeather(coordinates, APIkey);
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchAndProcessWeatherData();
  }, [currentTemperatureUnit]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.items);
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
      });
  }, []);

  return (
    <div className="page">
      <Router>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleDeleteCard={handleDeleteCard}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile handleCardClick={handleCardClick} />}
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "create" && (
            <AddItemModal
              isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
              onCloseModal={handleCloseModal}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              closeActiveModal={handleCloseModal}
              card={selectedCard}
              handleDeleteCard={handleDeleteCard}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </Router>
    </div>
  );
}

export default App;
