import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";

function Main() {
  return (
    <Main>
      <WeatherCard />;
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        {/* Add Cards here */}
      </section>
    </Main>
  );
}

export default Main;
