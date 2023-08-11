import React, { useState, useEffect } from "react";
import { getAllTags } from "../../Managers/TagManager";
import { useNavigate } from "react-router-dom";

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
    <div className="tag_container">
    <button onClick={() => navigate("/tag/add")} className="add_Tag_Button">Add New Tag</button>
    <div className="all_tags">
      {tags.map((tag) => (
        <div key={tag.id} onClick={() => navigate(`/tag/${tag.id}`)} className="tag">
          <p >
            <strong>{tag.name}</strong>
          </p>
        </div>
      ))}
    </div>
    </div>
    </article>
  );
};

export default TagList;