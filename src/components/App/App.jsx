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
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "@contexts/CurrentTemperatureUnitContext";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItemSubmit = (newItem) => {
    setIsLoading(true);

    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((prevItems) => [
          {
            ...addedItem,
            link: addedItem.imageUrl,
          },
          ...prevItems,
        ]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteCard = (id) => {
    setIsLoading(true);
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) => {
          if (Array.isArray(prevItems)) {
            return prevItems.filter((item) => item._id !== id);
          } else {
            console.error("prevItems is not an array or is undefined");
            return prevItems;
          }
        });
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      })
      .finally(() => {
        setIsLoading(false);
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

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

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
        if (Array.isArray(data)) {
          setClothingItems(data); // Directly set the array as the state
        } else {
          console.error("Invalid data format:", data);
        }
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
                element={
                  <Profile
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleCardClick={handleCardClick}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "create" && (
            <AddItemModal
              isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
              onCloseModal={handleCloseModal}
              buttonText={isLoading ? "Saving..." : "Save"}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              closeActiveModal={handleCloseModal}
              card={selectedCard}
              handleDeleteCard={handleDeleteCard}
              buttonText={isLoading ? "Deleting..." : "Delete"}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </Router>
    </div>
  );
}

export default App;
