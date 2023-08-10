import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteJournal, getJournalById } from "../../Managers/JournalManager";
import "./Journals.css";

export const JournalDetails = () => {
    const [journal, setJournal] = useState();
    const { id } = useParams();
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    
// not reading
    useEffect(() => {
      getJournalById(id).then(setJournal);
    }, [id]);
  
    if (!journal) {
      return null;
    }

    const editButton = () => {
      if (journal.userProfileId === reflectUserObject.id) {
  
        navigate(`/journal/edit/${journal.id}`)
       
    }};

    const handleDelete = () => {
      deleteJournal(journal.id).then(() => {
        navigate(`/journals`)
      });
    };

   const alertClick = () => {
    const confirmBox = window.confirm("Are you sure you want to delete this journal?")
    if (confirmBox === true){
      handleDelete() }
    };
  


    const deleteButton = () => {
      if (journal.userProfileId === reflectUserObject.id) {
          alertClick()
          
          }}

return (
  <article className="journal_Details_Card">
  

  <div  className="all_Journal_Details" key={journal.id}>

      <div className="journal_Content">
        <h2> <b>Title: {journal.title}</b> </h2>
        <h3> {journal.description} </h3>
        <h4> {journal.content} </h4>
      </div> 

      <img className="photo" src={journal.imageUrl} alt="Not found" />

      <h6 className="date_User">
        Created on: {journal.DateCreated}
        {/* Created by: {journal.userProfile?.name} */}
      </h6>
  </div> 



<div className="edit_Delete">
        <button className="journal_Delete" onClick= {editButton}> Edit </button>
        <button className="journal_Edit" onClick= {deleteButton}> Delete </button> 
</div>

</article>   
);
};