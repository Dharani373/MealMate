import foodIcon from "../assets/food.png";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h1>
          Plan Smarter <br></br>Eat Better
        </h1>
        <p>
          Meal Mate helps you organize meals, discover recipes, and track
          nutrition — all in one place.
        </p>
      </div>

      <div className="hero-right">
        <img src={foodIcon} alt="food" />
      </div>
    </div>
  );
}

export default Hero;
