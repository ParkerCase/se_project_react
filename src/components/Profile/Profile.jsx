import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar onSignOut={onSignOut} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
