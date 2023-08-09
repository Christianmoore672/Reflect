import React, {useEffect } from "react";
import { useRef } from "react";
import lottie from "lottie-web";

const Girl = () =>  {

  const container = useRef(null)


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
      
    <article className="girl_Container" ref={container}> </article>
  );
}