import React, { useState, useEffect } from "react";
import { getAllResearchTopics } from "../../Managers/ResearchManager";
import { useNavigate } from "react-router-dom";
import "./Research.css";

const ResearchList = () => {
  const [researchTopics, setResearchTopics] = useState([]);
  const navigate = useNavigate()

  const getResearchTopics = () => {
    getAllResearchTopics().then(allResearchTopics => setResearchTopics(allResearchTopics)); 
  };

  useEffect(() => {
    getResearchTopics();
  }, []); 



  return (  
    <article className="research_List">
      <div className="research_Container">
      <button onClick={() => navigate("/research/add")} className="add_Research_Button">+ New Folder</button>
      <div className="all_Research">
      {researchTopics.map((researchTopic) => (
        <div key={researchTopic.id} onClick={() => navigate("/research/edit/:researchTopic.Id")} className="researchTopic">
          <p>
            <strong>{researchTopic.folderTitle}</strong>
            {/* <button className="more_Button">More...</button> */}
          </p>
          
        </div>
      ))}
      </div>
      </div>
      
    </article>
  );
};

export default ResearchList;