import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  deleteJournal, getJournalById} from "../../Managers/JournalManager";
import { addJournalTag, getAllJournalTags } from "../../Managers/JournalTagManager";
import "./Journals.css";
import { Link } from "react-router-dom";
import TagList from "../Tags/TagList";
import { getAllTags } from "../../Managers/TagManager";
import Beige from "../Beige.png";
import { MdArrowBackIos } from 'react-icons/md'
import { Card, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";

export const JournalDetails = () => {
    const [journal, setJournal] = useState();
    const [tag, setTag ] = useState([]);
    const [journalTag, setjournalTag] = useState([])
    const { id } = useParams();
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()


    useEffect(() => {
      getJournalById(id).then(setJournal);
      getAllJournalTags(id).then(setjournalTag);
      getAllTags().then(setTag);
         
  
  
    }, [])
  
    if (!journal) {
      return null;
    };

    // ...........................
    
    

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
  <article className="parent">
    
  <div className="journal_Title" > <b>{journal.title}</b> </div>
  <img className="beige" src={Beige} alt="" />
  
  <article className="journal_Details_Card">
  

  <div  className="all_Journal_Details" key={journal.id}>

      <div className="journal_Content">
        <h3> {journal.description} </h3>
        <h4> {journal.content} </h4>
      </div> 
      {/* ternary operator that finds the tagIds from journal tag then maps through tags that match that idea and prints the name */}
      <div className="journal_Tag_Container">
      Tags: {journalTag?.map((singleJournalTag) => tag?.map((singleTag) => {

        {return (singleJournalTag.tagId === singleTag.id) ?  <p className="journal_Tag_print">{singleTag.name} - </p> :  ""} 
      }))} 
      </div>

      <h6 className="date_User">
        Created on: {journal.dateCreated}
     </h6>
  </div> 

</article> 
        <button className="journal_Delete" onClick= {editButton}> Edit </button>
        <button className="journal_Edit" onClick= {deleteButton}> Delete </button> 
        {/* <button className="add_tag_Journal"> <Link to={`/tag/add/${id}`}>Add Tag</Link></button> {showTags && <TagList />} */}
        {/* <button className="add_tag_Journal"> <Link to={`/journal/${id}/tags`}> Manage Tags</Link></button> */}
        < button className="add_tag_Journal" onClick={(addtag) => {navigate(`/journal/${id}/tags`)}}>Manage Tags</button>

    

    <div className="back_Icon" onClick={() => navigate("/journals")}> <MdArrowBackIos /> </div>
</article>  
);
};