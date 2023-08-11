import React, { useState, useEffect } from "react";
import { useRef } from "react";
import lottie from "lottie-web";
import { getAllResearchTopics } from "../../Managers/ResearchManager";
import { useNavigate } from "react-router-dom";
import "./Research.css";
import folder from "../../assets/img/folder.png";
import hair7 from "../../assets/hair7.json"

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
      
      <div className="research_Container">
      <button onClick={() => navigate("/research/add")} className="add_Research_Button">+ New Folder</button>
      
      <div className="all_Research">
      
      {researchTopics.map((researchTopic) => (
        
        <div key={researchTopic.id} onClick={() => navigate(`/research/${researchTopic.id}`)} className="researchTopic">
          <p>
          <img className="folder_Image" src={folder} alt="" />
            <strong className="folder_Text">{researchTopic.folderTitle}</strong>
            {/* <button className="more_Button">More...</button> */}
          </p>
          
        </div>
      ))}
      </div>
       
      </div>
      {/* <div className="research_Gif" ref={container}></div> */}
    </article>
    
  );
};

export default ResearchList;