import React from "react";
import { useEffect, useRef } from "react";
import hair7 from "../assets/hair7.json"
import computer from "../assets/computer.json"
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
      animationData: require('../assets/hair7.json'),
      // animationData: require('../assets/computer.json')
    })
}, [])

  return (
    <article className="home"  >
      
      <article className="container"ref={container}>
      <div>
      <div className="reflect"> REFLECT</div>
          <button className="journal_Button">Journal</button>
          <button className="trends_Button">Trends</button>
          <button className="research_Button">Research</button>
        </div>
    </article>

    </article>
  );
}