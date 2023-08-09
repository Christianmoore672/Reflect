import React, {useEffect } from "react";
import { useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";

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
    <article className="home"  >
      
      <article className="container">
      <div className="r"> R</div>
      <div className="e"> E</div>
      <div className="f"> F</div>
      <div className="l"> L</div>
      <div className="ee"> E</div>
      <div className="c"> C</div>
      <div className="t"> T</div>
      <div className="child1">
          <button onClick={() => navigate("/journals")} className="journal_Button">JOURNAL</button>
          <button onClick={() => navigate("/trends")}className="trends_Button">MY TRENDS</button>
          <button onClick={() => navigate("/research")} className="research_Button">RESEARCH</button>
      </div>
      <div className="child2">
      <div className="home_gif" ref={container}></div>  
      </div>
    </article>

    </article>
  );
}