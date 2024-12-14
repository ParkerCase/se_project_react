import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import "./Profile.css";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onSignOut,
  onUpdateUser,
  onCardLike,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Add state for edit profile modal
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Handler for opening edit profile modal
  const handleEditProfileClick = useCallback(() => {
    console.log("Opening edit profile modal");
    setIsEditProfileModalOpen(true);
  }, []);

  const handleCloseEditProfile = useCallback(() => {
    setIsEditProfileModalOpen(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        // Wait for currentUser to be set
        if (!currentUser) {
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Profile auth check error:", error);
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [currentUser, navigate]);

  useEffect(() => {
    console.log("Edit profile modal state updated:", isEditProfileModalOpen);
  }, [isEditProfileModalOpen]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!isLoggedIn || !currentUser) {
    return null;
  }

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          onSignOut={onSignOut}
          onEditProfile={handleEditProfileClick} // Changed from onEditProfile to handleEditProfileClick
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          onCardLike={onCardLike} // Pass it here
        />
      </section>

      {/* Render EditProfileModal if needed */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEditProfile}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
}

export default Profile;
