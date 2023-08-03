import React, { useState, useEffect } from "react";
import { getAllJournals } from "../../Managers/JournalManager";

const JournalList = () => {
  const [posts, setJournals] = useState([]);

  const getJournals = () => {
    getAllJournals().then(allJournals => setJournals(allJournals)); 
  };

  useEffect(() => {
    getJournals();
  }, []); 



  return (  
    <div>
      {posts.map((journal) => (
        <div key={journal.id}>
          <img src={journal.imageUrl} alt={journal.title} />
          <p>
            <strong>{journal.title}</strong>
          </p>
          <p>{journal.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default JournalList;