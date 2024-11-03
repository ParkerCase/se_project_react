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
import RegisterModal from "../AddItemModal/RegisterModal";
import LoginModal from "../AddItemModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateProfile } from "../../utils/auth";
import { addCardLike, removeCardLike } from "../../utils/api";
import { signup } from "../../utils/auth";
import { signin } from "../../utils/auth";

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
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const handleSignup = (userData) => {
    signup(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        setRegisterModalOpen(false);
      })
      .catch((err) => console.log("Registration error:", err));
  };

  const handleSignin = (userData) => {
    signin(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        setLoginModalOpen(false);
      })
      .catch((err) => console.log("Login error:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const apiAction = isLiked ? removeCardLike : addCardLike;

    apiAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log("Like/dislike error:", err));
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");
    updateProfile(token, userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setEditProfileModalOpen(false);
      })
      .catch((err) => console.log("Profile update error:", err));
  };

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
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setCurrentUser(res.user);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log("Token verification error:", err));
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        if (Array.isArray(data)) {
          setClothingItems(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <Router>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleDeleteCard={handleDeleteCard}
                      onCardLike={handleCardLike}
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
                      onEditProfile={() => setEditProfileModalOpen(true)}
                      onSignOut={handleSignOut}
                    />
                  }
                />
              </Routes>
              <Footer />
            </div>

            {/* Other Modals */}
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
            {isRegisterModalOpen && (
              <RegisterModal
                onSubmit={handleSignup}
                onClose={() => setRegisterModalOpen(false)}
              />
            )}
            {isLoginModalOpen && (
              <LoginModal
                onSubmit={handleSignin}
                onClose={() => setLoginModalOpen(false)}
              />
            )}
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={() => setEditProfileModalOpen(false)}
              onUpdateUser={handleUpdateUser}
            />
          </CurrentTemperatureUnitContext.Provider>
        </Router>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
