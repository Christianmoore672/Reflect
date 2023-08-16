import React, { useState, useEffect } from "react";
import { getAllJournals } from "../../Managers/JournalManager";
import "./Journals.css";
import { useNavigate } from "react-router-dom";
import Beige from "./Beige.png";
import paper from "../paper.png";
import { BsPlusSquare } from 'react-icons/bs'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import ripped from "../ripped.png"

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
    {/* <img className="paper" src={paper} alt="" /> */}
    <div className="test"> 
    <button onClick={() => navigate("/journal/add")} className="add_Journal_Button"> Add New Journal </button>
    </div>
      <div className="journal_container">
        
      
        <div className="all_journals">
      {journals.map((journal) => (
        <div key={journal.id} className="journal">
            
            <div className="journal_List_Title">
              {journal.title}
              <BsPlusSquare 
              className="more_Button"
              onClick={() => navigate(`/journal/${journal.id}`)} />
            </div>

        </div>
      ))}
      </div>
      </div>
      <div className="home_Icon" onClick={() => navigate("/")}> <BsFillHouseDoorFill /> </div>
    </article>
  );
};

export default JournalList;