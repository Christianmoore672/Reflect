import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteResearchTopic, getResearchTopicById  } from "../../Managers/ResearchManager";
import "./Research.css";
import Beige from "../Beige.png";
import { MdArrowBackIos } from 'react-icons/md'
import { HiTrash, HiPencilAlt } from 'react-icons/hi';

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
  <article className="parent"
  >
  <img className="beige" src={Beige} alt="" />

  <div className="journal_Title"> <b>Title: {researchTopic.folderTitle}</b> </div>
  <article className="research_Details_Card">
  

  <div  className="all_Research_Details" key={researchTopic.id}>

      <div>
        <h5> {researchTopic.note} </h5>
        <h6> {researchTopic.link} </h6>
      </div> 

  </div> 
  <div className="edit_Delete">
  <button className="research_Delete" onClick= {editButton}> <HiPencilAlt /> </button>
<button className="research_Edit" onClick= {deleteButton}> <HiTrash /> </button>   
</div>
</article> 
<div className="back_Icon" onClick={() => navigate("/research")}> <MdArrowBackIos /> </div>
</article> 

);
};