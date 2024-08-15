import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const handleGarmentClick = () => {
    handleCardClick(item);
  };

  console.log("Image URL:", item.link || item.imageUrl); // Log the URL to inspect it

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleGarmentClick}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
        onError={(e) => {
          e.target.src =
            "https://media.gq.com/photos/646baa821fa990bc7018e902/1:1/w_2001,h_2001,c_limit/GQ0723_Gosling_01.jpg";
        }}
      />
    </li>
  );
}

export default ItemCard;
