import React, { useState, useEffect } from "react";
import { getAllTags } from "../../Managers/TagManager";

const TagList = () => {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    getAllTags().then(allTags => setTags(allTags)); 
  };

  useEffect(() => {
    getTags();
  }, []); 



  return (  
    <div>
      {tags.map((tag) => (
        <div key={tag.id}>
          <p>
            <strong>{tag.name}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TagList;