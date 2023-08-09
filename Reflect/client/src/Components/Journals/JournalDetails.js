import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { deleteJournal, getJournalById } from "../../Managers/JournalManager";
import TagList from "../Tags/TagList";
import "./Journals.css";

export const JournalDetails = () => {
    const [journal, setJournal] = useState();
    const [showTags, setShowTags] = useState(false);
    const { id } = useParams();
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    
    /* toggle function for controlling the visibility of the comment list:*/
    const toggleTags = () => {
      setShowTags((prevState) => !prevState);
    };
    
    
  
    useEffect(() => {
      getJournalById(id).then(setJournal);
    }, []);
  
    if (!journal) {
      return null;
    }

    const editButton = () => {
      if (journal.userProfileId === reflectUserObject.id) {
        return <>
        <Button color="warning" onClick={() => navigate(`/journal/edit/${journal.id}`)}>Edit</Button>
        </>
    }}

   const alertClick = () => {
    const confirmBox = window.confirm("Do you really want to delete this journal?")
    if (confirmBox === true){
      handleDelete() }
    }
   



    const handleDelete = () => {
      deleteJournal(journal.id).then(() => {
        navigate(`/journals`)
      });
    };


    const deleteButton = () => {
      if (journal.userProfileId === reflectUserObject.id) {
          return <button onClick={ alertClick } className="journal_delete">Delete</button>}

          else {
            return ""
          }}

return (
  <article className="journal_Details_Card">
     <div>
  <Card  className="all_Journal_Details" style={{ width: '18rem' }} key={journal.id}>
      <CardImg variant="top" src={journal?.imageUrl} alt="Not found" />
      <CardBody>
        <CardTitle><b>Title: {journal.title}</b></CardTitle>
        <CardText>
        {journal.description}
        </CardText><CardText>
        {journal.content}
        </CardText>
        <CardText>
          Posted on: {journal.DateCreated}
        </CardText>
        <CardText>
        Created by: {journal?.userProfile?.Name}
        </CardText>
      </CardBody> 
      {editButton()}
      {deleteButton()}
  </Card> 

</div>
      <Button><Link to={`/journals/${journal.id}/tags`}>Add Tag</Link></Button>
      {showTags && <TagList />}
      <Button onClick={toggleTags}>
        {showTags ? "Hide Tags" : "View Tags"}
      </Button>
</article>   
);
};