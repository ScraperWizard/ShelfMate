
import Navbar from '../components/Navbar'
import '../styles/About.css'
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import MHDYAMAN from "../assets/MHDYAMAN.jpg";
import YOUSEF from "../assets/YOUSEF.jpg";
import WAFIQ from "../assets/WAFIQAKRAM.jpg";
import ABDULRAHMAN from "../assets/Abdulrahman_Photo.png";


function About() {
  const context = useContext(AuthContext);
  console.log(context?.user?.username); 

  
  return (
    <div className="ABOUTME" data-name="about">
        <Navbar></Navbar>
       
      <div className="Desc">
        <article>
          <h1 className="h1">About Us</h1>
          <h2 className="OURNAMES"><span>Mohammad</span> Yaman - <span>Front End</span> Engineer</h2>
          <img src={MHDYAMAN} width="30%" className="img"/>
          <p className="p">
            <br />
            Engineer Yaman is a creative and detail-oriented professional with a passion for crafting seamless user experiences. Proficient in HTML, CSS, and JavaScript, Engineer Yaman specializes in translating design concepts into visually appealing web applications.
          </p>
        </article>
      </div>

      <div className="Desc">
        <article>
          <h2 className="OURNAMES"><span>Yousef</span> Al Sakkaf - <span>Front End</span> Engineer</h2>
          <img src={YOUSEF} width="30%" className="img"/>
          <p className="p">
            <br />
            Engineer Yousef brings a blend of technical expertise and design sensibility to the team. With a strong foundation in modern front-end frameworks such as React or Vue.js, Engineer Yousef excels in building dynamic and interactive user interfaces
          </p>
        </article>
      </div>

      <div className="Desc">
        <article>
          <h2 className="OURNAMES"><span>Abdulrahman</span> Al Ali - <span>Back End</span> Engineer</h2>
          <img src={ABDULRAHMAN} width="30%" className="img"/>
          <p className="p">
            <br />
            Engineer Abdulrahman is a skilled architect of server-side systems and APIs. Proficient in languages like Node.js, Python, or Java, Engineer Abdulrahman designs and implements robust and scalable backend solutions to support our web applications. Engineer Abdulrahman is well-versed in database management and server optimization</p>
        </article>
      </div>

      <div className="Desc">
        <article>
          <h2 className="OURNAMES"><span>Wafiq</span> Akram - <span>Database</span> Manager</h2>
          <img src={WAFIQ} width="30%" className="img"/>
          <p className="p">
            <br />
            Engineer Wafiq is a seasoned professional responsible for overseeing the organization and efficiency of our data infrastructure. With expertise in database design, optimization, and maintenance, Engineer Wafiq ensures seamless data operations and performant support for our applications.</p>
        </article>
      </div>

    
    </div>
  );
}

export default About;
