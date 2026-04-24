import { useNavigate } from "react-router-dom";
import about from "../assets/about.jpg";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>ABOUT US</h1>
        <p>Know more about Meal Mate</p>
      </div>

      <div className="about-container">
        <div className="about-image">
          <img src={about} alt="about" className="about-icon" />
        </div>

        <div className="about-content">
          <p>
            <strong>Meal Mate</strong> is a Smart Canteen Food Ordering System
            designed for college students and campus canteen management. It
            helps students order food quickly without standing in long queues.
          </p>

          <p>
            Students can register using their college email, securely log in,
            browse food items, place orders online, and track their order
            history. The system improves convenience and saves valuable time.
          </p>

          <h3>OUR MISSION</h3>

          <p>
            Our mission is to simplify campus food ordering by providing a fast,
            reliable, and user-friendly platform for students and canteen staff.
            We aim to improve efficiency and create a smooth digital canteen
            experience.
          </p>
          <button onClick={() => navigate("/")}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default About;
