import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const handleGarmentClick = () => {
    handleCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleGarmentClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
