
import Navbar from '../components/Navbar'
import '../styles/About.css'
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function About() {
  const context = useContext(AuthContext);
  console.log(context?.user?.username); 

  
  return (
    <div className="ABOUTME" data-name="about">
        <Navbar></Navbar>
       
      <div className="Desc">
        <article>
          <h1 className="h1">About Us</h1>
          <img src="#" width="30%" className="img"/>
          <p className="p">
            <br />
            At Book Library, we are a passionate team of four developers who
            share a common goal: to explore the realms of Artificial
            Intelligence and contribute to the ever-evolving landscape of
            technology. Hailing from diverse backgrounds, we converged at The
            British University in Dubai, where our shared enthusiasm for A.I.
            became the driving force behind this collaborative endeavor.
          </p>
        </article>
      </div>

      <div className="Desc">
        <article>
          <h1 className="h1">Our Vision</h1>
          <p className="p">
            <br />
            Our vision is clear - to create a comprehensive library that not
            only serves as a valuable resource for fellow AI enthusiasts but
            also as a platform for learning, collaboration, and innovation. We
            believe in the transformative power of knowledge and its ability to
            shape a brighter future. By building this library, we aim to empower
            individuals to understand, engage with, and harness the potential of
            Artificial Intelligence.
          </p>

          <h5>BOOK LIBRARY</h5>
          <nav>
            <p className="p">Where your Dreams Come True</p>
          </nav>
        </article>
      </div>
    </div>
  );
}

export default About;
