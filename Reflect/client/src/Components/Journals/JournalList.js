import React, { useState, useEffect } from "react";
import { getAllJournals } from "../../Managers/JournalManager";
import "./Journals.css";
import { useNavigate } from "react-router-dom";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate()

  const getJournals = () => {
    getAllJournals().then(allJournals => setJournals(allJournals)); 
  };

  useEffect(() => {
    getJournals();
  }, []); 



  return (  
    <article className="journal_list">
      <div className="journal_container">
      <button onClick={() => navigate("/journal/add")} className="add_Journal_Button">Add New Journal</button>
        <div className="all_journals">
      {journals.map((journal) => (
        <div key={journal.id} className="journal">
          <img src={journal.imageUrl} alt={journal.title} />
          <p>
            <strong>{journal.title}</strong>
          </p>
          <p>{journal.caption}</p>
          <button onClick={() => navigate("/journal/details")}className="more_Button">More...</button>
        </div>
      ))}
      </div>
      </div>
    </article>
  );
};

export default JournalList;