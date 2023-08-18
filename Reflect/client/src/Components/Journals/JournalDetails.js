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
import moment from "moment/moment";

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

    const formattedTime = moment(journal.dateCreated).format('MM/DD/YYYY');

    console.log(formattedTime);

return (
  <article className="parent">
    
  <div className="journal_Title" > <b>{journal.title}</b></div>
  <div className="date_User">
        Created on: {formattedTime}
     </div>
  <img className="beige" src={Beige} alt="" />
  
  <article className="journal_Details_Card">
  

  <div  className="all_Journal_Details" key={journal.id}>

      <div className="">
        <h3 className="journal_Description"> {journal.description} </h3>
        <div className="journal_Content"> {journal.content} </div>
      </div> 
      {/* ternary operator that finds the tagIds from journal tag then maps through tags that match that idea and prints the name */}
      

      
  </div> 

  <div>
  <div className="journal_Tag_Container">
       {journalTag?.map((singleJournalTag) => tag?.map((singleTag) => {

        {return (singleJournalTag.tagId === singleTag.id) ?  <p className="journal_Tag_print">{singleTag.name}  </p> :  ""} 
      }))} 
      </div>
      </div>

</article> 
        <button className="journal_Delete" onClick= {editButton}> Edit </button>
        <button className="journal_Edit" onClick= {deleteButton}> Delete </button> 
        < button className="add_tag_Journal" onClick={(addtag) => {navigate(`/journal/${id}/tags`)}}>Manage Tags</button>

    

    <div className="back_Icon" onClick={() => navigate("/journals")}> <MdArrowBackIos /> </div>
</article>  
);
};