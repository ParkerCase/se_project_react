import React, { useContext } from "react";
import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "@contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {Array.isArray(clothingItems) &&
            clothingItems
              .filter(
                (item) =>
                  item.weather &&
                  item.weather.toLowerCase() === weatherData.type.toLowerCase()
              )
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    handleCardClick={handleCardClick}
                    onCardLike={onCardLike}
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
