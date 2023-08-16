import React, { useState, useEffect } from "react";
import { getAllJournals } from "../../Managers/JournalManager";
import "./Journals.css";
import { useNavigate } from "react-router-dom";
import Beige from "./Beige.png";
import paper from "../paper.png";

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
    <img className="beige" src={Beige} alt="" />
    <div className="journal_Header"> MY JOURNALS </div>
    <img className="paper" src={paper} alt="" />
      <div className="journal_container">
        
      <button onClick={() => navigate("/journal/add")} className="add_Journal_Button">Add New Journal</button>
        <div className="all_journals">
      {journals.map((journal) => (
        <div key={journal.id} className="journal">
          <div className="div"></div>
          <div>
            <strong className="journal_List_Title">{journal.title}</strong>
            <button onClick={() => navigate(`/journal/${journal.id}`)} className="more_Button"> More... </button>
          </div>
          {/* <p>{journal.caption}</p> */}
          
        </div>
      ))}
      </div>
      </div>
    </article>
  );
};

export default JournalList;