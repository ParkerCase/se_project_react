import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems} // Pass the fetched items here
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
