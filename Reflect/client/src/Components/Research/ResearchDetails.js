import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteResearchTopic, getResearchTopicById  } from "../../Managers/ResearchManager";
import "./Research.css";

export const ResearchDetails = () => {
    const [researchTopic, setResearchTopic] = useState();
    const { id } = useParams();
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    

    useEffect(() => {
        getResearchTopicById(id).then(setResearchTopic);
    }, [id]);
  
    if (!researchTopic) {
      return null;
    }

    const editButton = () => {
      if (researchTopic.userProfileId === reflectUserObject.id) {
        
        navigate(`/research/edit/${researchTopic.id}`)
       
    }};

    const handleDelete = () => {
      deleteResearchTopic(researchTopic.id).then(() => {
        navigate(`/research`)
      });
    };

   const alertClick = () => {
    const confirmBox = window.confirm("Are you sure you want to delete this folder?")
    if (confirmBox === true){
      handleDelete() }
    };
  


    const deleteButton = () => {
      if (researchTopic.userProfileId === reflectUserObject.id) {
          alertClick()
          
          }}

return (
  <article className="research_Details_Card">
  

  <div  className="all_Research_Details" key={researchTopic.id}>

      <div className="research_Content">
        <h2> <b>Title: {researchTopic.folderTitle}</b> </h2>
        <h3> {researchTopic.note} </h3>
        <h4> {researchTopic.link} </h4>
      </div> 

  </div> 



<div className="edit_Delete">
        <button className="research_Delete" onClick= {editButton}> Edit </button>
        <button className="research_Edit" onClick= {deleteButton}> Delete </button> 
</div>

</article>   
);
};