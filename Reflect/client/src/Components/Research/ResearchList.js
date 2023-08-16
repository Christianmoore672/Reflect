import React, { useState, useEffect } from "react";
import { useRef } from "react";
import lottie from "lottie-web";
import { getAllResearchTopics } from "../../Managers/ResearchManager";
import { useNavigate } from "react-router-dom";
import "./Research.css";
import folder from "../../assets/img/folder.png";
import hair7 from "../../assets/hair7.json"
import Beige from "../Beige.png";
import { BsFillHouseDoorFill } from 'react-icons/bs'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ResearchList = () => { 

  const container = useRef(null)
  const [researchTopics, setResearchTopics] = useState([]);
  const navigate = useNavigate()

  const getResearchTopics = () => {
    getAllResearchTopics().then(allResearchTopics => setResearchTopics(allResearchTopics)); 
  };

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../assets/hair7.json'),
    })
}, [])

  useEffect(() => {
    getResearchTopics();
  }, []); 



  return (  
    <article className="research_List">
    <img className="beige" src={Beige} alt="" />
    <div className="research_Header"> RESEARCH </div>
    <button onClick={() => navigate("/research/add")} className="add_Research_Button">+ New Folder</button>
      
      <div className="research_Container">
      
      
      <div className="all_Research">
      {researchTopics.map((researchTopic) => (
        <div key={researchTopic.id} onClick={() => navigate(`/research/${researchTopic.id}`)} className="researchTopic">
         
          <div>
          <img className="folder_Image" src={folder} alt="" />
            <strong className="folder_Text">{researchTopic.folderTitle}</strong>
            {/* <button className="more_Button">More...</button> */}
          </div>
          
        </div>
      ))}
      </div>
       
      </div>
      <div className="home_Icon" onClick={() => navigate("/")}> <BsFillHouseDoorFill /> </div>
    </article>
    
  );
};

export default ResearchList;