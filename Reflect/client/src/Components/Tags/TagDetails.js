import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTag, getTagById } from "../../Managers/TagManager";
import "./Tags.css";
import { MdArrowBackIos } from 'react-icons/md';
import Beige from "../Beige.png";

export const TagDetails = () => {
    const [tag, setTag] = useState();
    const { id } = useParams();
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    
// not reading
    useEffect(() => {
      getTagById(id).then(setTag);
    }, [id]);
  
    if (!tag) {
      return null;
    }

    const editButton = () => {
      if (tag.userProfileId === reflectUserObject.id) {
  
        navigate(`/tag/edit/${tag.id}`)
       
    }};

    const handleDelete = () => {
      deleteTag(tag.id).then(() => {
        navigate(`/trends`)
      });
    };

   const alertClick = () => {
    const confirmBox = window.confirm("Are you sure you want to delete this tag?")
    if (confirmBox === true){
      handleDelete() }
    };
  


    const deleteButton = () => {
      if (tag.userProfileId === reflectUserObject.id) {
          alertClick()
          
          }}

return (
  <article>
    
  <img className="beige" src={Beige} alt="" />
  
  <article className="tag_Details_Card">

  <div  className="all_Tag_Details" key={tag.id}>

      <div className="tag_Content">
        <h2> <b>Tag Name: </b> 
        {tag.name}
        </h2>
      </div> 

  </div> 



<div className="edit_Delete">
        <button className="tag_Delete" onClick= {editButton}> Edit </button>
        <button className="tag_Edit" onClick= {deleteButton}> Delete </button> 
</div>
</article>  
<div className="back_Icon" onClick={() => navigate("/trends")}> <MdArrowBackIos /> </div>

</article> 
);
};