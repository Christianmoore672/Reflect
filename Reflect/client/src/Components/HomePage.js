import React from "react";
import { useEffect, useRef } from "react";
import hair7 from "../assets/hair7.json"
import face from "../assets/face.json"
import computer from "../assets/computer.json"
import swing from "../assets/swing.json"
// import Lottie from "lottie-react"
import lottie from "lottie-web";

export default function Reflect() {

  const container = useRef(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../assets/swing.json'),
      // animationData: require('../assets/computer.json')
    })
}, [])

  return (
    <article className="home" ref={container} >
      
      <article className="container">
      <div className="r"> R</div>
      <div className="e"> E</div>
      <div className="f"> F</div>
      <div className="l"> L</div>
      <div className="ee"> E</div>
      <div className="c"> C</div>
      <div className="t"> T</div>
      <div>
          <button className="journal_Button">JOURNAL</button>
          <button className="trends_Button">MY TRENDS</button>
          <button className="research_Button">RESEARCH</button>
      </div>
    </article>

    </article>
  );
}