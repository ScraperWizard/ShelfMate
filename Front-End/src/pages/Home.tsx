import React from "react";
import Navbar from "../components/Navbar";
import tableImg from "../assets/table.png";
import "../styles/Home.css";

function Home() {
  return (
    <div data-name="home">
      <Navbar></Navbar>
      <section>
        <div className="main">
          <div className="main_tag">
            <h1>
              WELCOME TO
              <br />
              <span>BOOK LIBRARY</span>
            </h1>

            <p>
              📚 Welcome to our vibrant library, where curiosity meets
              discovery! 🌐 Immerse yourself in a realm of endless possibilities
              at Book Library. We are not just a collection of books; we're a
              haven for knowledge seekers, a hub of inspiration, and your
              passport to a world of learning.
            </p>
            <a href="#" className="main_btn">
              Learn More
            </a>
          </div>

          <div className="main_img">
            {/* <img src ="images/table.png"/> */}
            <img src={tableImg} alt="this is a table img" />
          </div>
        </div>
      </section>

      <div className="services">
        <nav>
          <p>
            <strong>Our Services</strong>
          </p>
        </nav>
        <div className="services_box">
          <div className="services_card">
            <i className="fa-solid fa-lightbulb"></i>
            <h3>Digital Delights</h3>
            <p>
              Dive into a diverse array of books, from classic literature to
              cutting-edge research. Our shelves are brimming with knowledge,
              waiting to be explored.
            </p>
          </div>

          <div className="services_card">
            <i className="fa-solid fa-mug-hot"></i>
            <h3>Meeting Rooms</h3>
            <p>
              Need a quiet space for collaboration? Our meeting rooms are
              available for reservation, providing you with a conducive
              environment for group discussions, study sessions, or creative
              endeavors.
            </p>
          </div>

          <div className="services_card">
            <i className="fa-solid fa-book"></i>
            <h3>Borrow a Book</h3>
            <p>
              Immerse yourself in captivating stories and enrich your mind with
              our vast collection of books. Whether it's fiction, non-fiction,
              or the latest bestseller, you can borrow and bring the magic of
              literature into your life.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
