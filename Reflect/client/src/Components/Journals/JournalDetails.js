import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteJournal, getJournalById } from "../../Managers/JournalManager";
import "./Journals.css";
import { Link } from "react-router-dom";
import TagList from "../Tags/TagList";
import Beige from "../Beige.png";

export const JournalDetails = () => {
    const [journal, setJournal] = useState();
    const { id } = useParams();
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()

    // Tag stuff //
    const [showTags, setShowTags] = useState(false);

    const toggleTags = () => {
      setShowTags((prevState) => !prevState);
    };

    // ...........................
    
    
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
  <article>
  <img className="beige" src={Beige} alt="" />
  
  <div className="journal_Title"> <b>Title: {journal.title}</b> </div>
  <article className="journal_Details_Card">
  

  <div  className="all_Journal_Details" key={journal.id}>

      <div className="journal_Content">
        <h3> {journal.description} </h3>
        <h4> {journal.content} </h4>
      </div> 

      <h6 className="date_User">
        Created on: {journal.dateCreated}
        {/* Created by: {journal.userProfile?.name} */}
      </h6>
  </div> 



<div className="edit_Delete">
        
</div>

</article> 
        <button className="journal_Delete" onClick= {editButton}> Edit </button>
        <button className="journal_Edit" onClick= {deleteButton}> Delete </button> 
        <button className="add_tag_Journal"> <Link to={`/tag/add/${id}`}>Add Tag</Link></button> {showTags && <TagList />}
    {/* <button onClick={toggleTags}> {showTags ? "Hide Tags" : "View Tags"} </button> */}
</article>  
);
};