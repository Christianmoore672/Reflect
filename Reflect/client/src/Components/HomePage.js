import React, {useEffect } from "react";
import { useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import { MyNavbar } from "../Components/NavBar"
import { Navbar } from "reactstrap";
import Beige  from "../assets/Beige.png"
import brown  from "../assets/brown.png"

export default function Reflect() {

  const container = useRef(null)
  const navigate = useNavigate()


  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../assets/swing.json'),
    })
}, [])



  return (
    
    <article className="home" >
      <img className="beige" src={Beige} alt="" />
      <img className="brown" src={brown} alt="" />
      
      <article className="container">
      <div className="reflect"> REFLECT</div>
      <div className="child1">
          <button onClick={() => navigate("/journals")} className="journal_Button">JOURNAL</button>
          <button onClick={() => navigate("/trends")}className="trends_Button">MY TRENDS</button>
          <button onClick={() => navigate("/research")} className="research_Button">RESEARCH</button>
          <button onClick={() => navigate("/")} className="profile_Button">MY PROFILE</button>
      </div>
      <div className="child2">
      <div className="home_gif" ref={container}></div>  
      </div>
    </article>

    </article>
  );
}