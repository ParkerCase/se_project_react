import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import { baseUrl } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { updateProfile, signup, signin, checkToken } from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import RegisterModal from "../AddItemModal/RegisterModal";
import LoginModal from "../AddItemModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "@contexts/CurrentTemperatureUnitContext";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function App() {
  // State Variables
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Additional State Variables
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true); // New loading state
  const [activeModal, setActiveModal] = useState(""); // Empty string instead of "login"
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // false instead of true
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const navigate = useNavigate();

  // Modal Handlers
  const openModal = (modalName) => setActiveModal(modalName);

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setActiveModal("signup");
    navigate("/signup", { replace: true });
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setActiveModal("login");
    navigate("/login", { replace: true });
  };

  const handleCloseModal = () => {
    console.log("Closing modal and resetting state"); // Debugging log
    setActiveModal(""); // Reset the active modal state
    setRegisterModalOpen(false); // Ensure all modals are closed
    setLoginModalOpen(false);
    setEditProfileModalOpen(false);
  };

  const handleToggleModal = (modalType) => {
    setActiveModal(modalType);
    if (modalType === "login") {
      setLoginModalOpen(true);
      setRegisterModalOpen(false);
    } else if (modalType === "signup") {
      setLoginModalOpen(false);
      setRegisterModalOpen(true);
    }
  };

  // Handlers
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
    setActiveModal("create");
    console.log("Active modal set to:", activeModal);
  };

  // Authentication Handlers
  const handleSignin = async (userData) => {
    try {
      console.log("Starting signin process with:", userData);
      const response = await signin(userData);
      console.log("Signin response received:", response);

      if (!response || !response.token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("jwt", response.token);
      console.log("Token stored in localStorage");

      const userInfo = await checkToken(response.token);
      console.log("User info received:", userInfo);

      const user = userInfo.data || userInfo;
      if (!user) {
        throw new Error("Invalid user data received");
      }

      setCurrentUser(user);
      setIsLoggedIn(true);

      handleCloseModal();
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed. Please check your credentials.");
    }
  };

  const handleSignup = (userData) => {
    signup(userData)
      .then((res) => {
        console.log("Signup successful:", res);
        localStorage.setItem("jwt", res.token); // Store token
        setCurrentUser(res.user); // Update current user
        setIsLoggedIn(true); // Mark user as logged in
        handleCloseModal(); // Ensure modal is closed
      })
      .catch((err) => {
        console.error("Signup error:", err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setClothingItems([...defaultClothingItems]);
    setActiveModal(""); // Reset active modal
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    navigate("/");
  };

  const handleAddItemSubmit = async (newItem) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwt"); // Retrieve token

      if (!isLoggedIn || !token) {
        // Redirect to login if not authenticated
        console.log("User not authenticated. Redirecting to login...");
        navigate("/login");
        return;
      }

      const response = await fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // Include Bearer token
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const addedItem = await response.json();
      console.log("Item successfully added:", addedItem);
      setClothingItems((prevItems) => [addedItem, ...prevItems]); // Update clothing items
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // In App.jsx
  const handleDeleteCard = (id) => {
    console.log("Current clothingItems before delete:", clothingItems);

    setClothingItems((prevItems) => {
      // Filter out the item regardless of whether it's default or user-created
      const filteredItems = prevItems.filter((item) => {
        // Check both id and _id to catch both types of items
        return item.id !== id && item._id !== id;
      });

      console.log("Filtered items:", filteredItems);
      return filteredItems;
    });

    handleCloseModal();
  };

  // In App.jsx
  const handleCardLike = async ({ id, isLiked }) => {
    if (!isLoggedIn || !currentUser) return;

    console.log("Like operation:", { id, isLiked, currentUser });

    setClothingItems((prevItems) => {
      return prevItems.map((item) => {
        // Check if this is the item we want to update
        if (item.id === id || item._id === id) {
          const currentLikes = Array.isArray(item.likes) ? item.likes : [];
          const newLikes = isLiked
            ? currentLikes.filter((likeId) => likeId !== currentUser._id)
            : [...currentLikes, currentUser._id];

          return {
            ...item,
            likes: newLikes,
          };
        }
        return item;
      });
    });

    // Only make API calls for user-created items (those with _id)
    if (typeof id === "string") {
      try {
        const updatedCard = isLiked
          ? await removeCardLike(id)
          : await addCardLike(id);

        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === id ? updatedCard : item))
        );
      } catch (error) {
        console.error("Error updating like on server:", error);
      }
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        navigate("/login");
        return;
      }

      const updatedUser = await updateProfile(token, userData);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally show an error message to the user
    }
  };

  const filterItemsByWeather = (items, weatherType) => {
    return items.filter(
      (item) => item.weather?.toLowerCase() === weatherType?.toLowerCase()
    );
  };

  const handleResetToDefaults = () => {
    setClothingItems([...defaultClothingItems]);
  };

  // Effects for URL-based Modals
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res && res.data) {
            setCurrentUser(res.data);
            setIsLoggedIn(true);
            getItems()
              .then((items) => {
                setClothingItems([...defaultClothingItems, ...items]);
              })
              .catch(console.error);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  useEffect(() => {
    const validateTokenAndLoadData = async () => {
      setIsAuthenticating(true);
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setIsLoggedIn(false);
          setCurrentUser(null);
          setClothingItems([...defaultClothingItems]);
          setIsAuthenticating(false);
          return;
        }

        const userData = await checkToken(token);
        if (!userData) {
          throw new Error("Invalid user data");
        }

        const user = userData.data || userData;
        setCurrentUser(user);
        setIsLoggedIn(true);

        try {
          const userItems = await getItems();
          setClothingItems([...defaultClothingItems, ...userItems]);
        } catch (error) {
          console.error("Error fetching items:", error);
          setClothingItems([...defaultClothingItems]);
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
        setClothingItems([...defaultClothingItems]);
      } finally {
        setIsAuthenticating(false);
      }
    };

    validateTokenAndLoadData();
  }, []);

  useEffect(() => {
    // Only handle modal opening for explicit navigation
    if (window.location.pathname === "/") {
      setActiveModal("");
      setRegisterModalOpen(false);
      setLoginModalOpen(false);
    }
  }, [window.location.pathname]);

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

  // Weather Data
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log("Fetching weather data...");
        const data = await getWeather(coordinates, APIkey);
        console.log("Weather data received:", data);
        setWeatherData(filterWeatherData(data));
      } catch (err) {
        console.log("Weather error:", err);
      }
    };
    fetchWeather();
  }, [currentTemperatureUnit]);

  useEffect(() => {
    const fetchClothingItems = async () => {
      console.log("Starting fetchClothingItems function");
      const token = localStorage.getItem("jwt");

      console.log("Token status:", token ? "Token found" : "No token");

      // Set default items first so there's always content
      setClothingItems(defaultClothingItems);
      console.log("Default items loaded");

      if (!token) {
        console.warn("No token found, keeping default items");
        return;
      }

      try {
        console.log("Verifying token...");
        const res = await checkToken(token);
        console.log("Token check response:", res);

        if (res && res.user) {
          console.log("Valid user data received:", res.user);
          setCurrentUser(res.user);
          setIsLoggedIn(true);
          console.log("User authenticated:", res.user);

          console.log("Fetching clothing items...");
          const items = await getItems();
          console.log("Clothing items received:", items);
          // Combine default items with user items
          setClothingItems([...defaultClothingItems, ...items]);
          console.log("Combined clothing items state updated");
        } else {
          console.warn("Invalid token response:", res);
          console.warn("Invalid token. Keeping default items.");
        }
      } catch (err) {
        console.error("Error in fetchClothingItems:", err);
        console.error("Error validating token or fetching items:", err);
        // Default items will remain since they were set at the start
      }
    };

    console.log("Running fetchClothingItems effect");
    fetchClothingItems();
  }, []); // Run on initial load

  useEffect(() => {
    // Always ensure defaultClothingItems are available for the current weather
    const weatherAppropriateItems = defaultClothingItems.filter(
      (item) =>
        item.weather &&
        item.weather.toLowerCase() === weatherData.type.toLowerCase()
    );

    if (!isLoggedIn) {
      // For non-logged in users, only show default items
      setClothingItems(defaultClothingItems);
    } else {
      // For logged in users, fetch their items and combine with defaults
      getItems()
        .then((userItems) => {
          setClothingItems([...defaultClothingItems, ...userItems]);
        })
        .catch((error) => {
          console.error("Error fetching user items:", error);
          // Fallback to default items if fetch fails
          setClothingItems(defaultClothingItems);
        });
    }
  }, [weatherData.type, isLoggedIn]);

  useEffect(() => {
    console.log("Modal states:", {
      activeModal,
      isLoginModalOpen,
      isRegisterModalOpen,
    });
  }, [activeModal, isLoginModalOpen, isRegisterModalOpen]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        isAuthenticating,
      }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            {/* Header Component */}
            <Header
              handleAddClick={handleAddClick}
              handleOpenLoginModal={openLoginModal}
              handleOpenRegisterModal={openRegisterModal}
              weatherData={weatherData}
              onLoginClick={openLoginModal}
              onRegisterClick={openRegisterModal}
            />

            {/* Routes for the Main Application */}
            <Routes>
              {/* Main Route */}
              <Route
                path="/*"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={filterItemsByWeather(
                      clothingItems,
                      weatherData.type
                    )}
                    handleCardClick={handleCardClick}
                    handleDeleteCard={handleDeleteCard}
                    onCardLike={addCardLike}
                  />
                }
              />

              {/* Profile Route */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                      onUpdateUser={handleUpdateUser}
                      handleDeleteCard={handleDeleteCard}
                    />
                  </PrivateRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          {/* Modals Section */}

          {/* Add Item Modal */}
          {activeModal === "create" && (
            <>
              {console.log("Rendering AddItemModal")}

              <AddItemModal
                isOpen={activeModal === "create"}
                onAddItem={handleAddItemSubmit}
                onCloseModal={handleCloseModal}
                buttonText={isLoading ? "Saving..." : "Save"}
              />
            </>
          )}

          {/* Item Preview Modal */}
          {activeModal === "preview" && selectedCard && (
            <ItemModal
              activeModal={activeModal}
              closeActiveModal={handleCloseModal}
              card={selectedCard}
              handleDeleteCard={handleDeleteCard}
              buttonText={isLoading ? "Deleting..." : "Delete"}
            />
          )}

          {/* Edit Profile Modal */}
          {isEditProfileModalOpen && (
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={handleCloseModal}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {/* Login Modal */}
          {activeModal === "login" && (
            <LoginModal
              isOpen={isLoginModalOpen}
              onSubmit={handleSignin}
              onClose={handleCloseModal}
              handleToggleModal={handleToggleModal}
            />
          )}

          {/* Register Modal */}
          {activeModal === "signup" && (
            <RegisterModal
              isOpen={isRegisterModalOpen}
              onSubmit={handleSignup}
              onClose={handleCloseModal}
              handleToggleModal={handleToggleModal}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
