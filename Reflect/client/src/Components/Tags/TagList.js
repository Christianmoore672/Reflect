import React, { useState, useEffect } from "react";
import { getAllTags } from "../../Managers/TagManager";
import { useNavigate } from "react-router-dom";
import Beige from "../Beige.png";
import { BsFillHouseDoorFill } from 'react-icons/bs'

const TagList = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate()

  const getTags = () => {
    getAllTags().then(allTags => setTags(allTags)); 
  };

  useEffect(() => {
    getTags();
  }, []); 



  return (  
    <article className="tag_list">
    <img className="beige" src={Beige} alt="" />
    <div className="tag_Header"> MY TRENDS </div>
    <button onClick={() => navigate("/tag/add")} className="add_Tag_Button">Add New Tag</button>

    <div className="tag_container">
    
    <div className="all_tags">
      {tags.map((tag) => (
        <div key={tag.id} onClick={() => navigate(`/tag/${tag.id}`)} className="tag">
          <div className="tag_List_Title">
            {tag.name}
          </div>
        </div>
      ))}
    </div>
    </div>
    <div className="home_Icon" onClick={() => navigate("/")}> <BsFillHouseDoorFill /> </div>
    </article>
  );
};

export default TagList;