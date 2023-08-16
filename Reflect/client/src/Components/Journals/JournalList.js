import React, { useState, useEffect } from "react";
import { getAllJournals } from "../../Managers/JournalManager";
import "./Journals.css";
import { useNavigate } from "react-router-dom";
import Beige from "../Beige.png";
import paper from "../paper.png";
import { BsPlusSquare } from 'react-icons/bs'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import ripped from "../ripped.png"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { addJournal } from "../../Managers/JournalManager";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate()
  const localReflectUser = localStorage.getItem("userProfile");
  const reflectUserObject = JSON.parse(localReflectUser)


  const [journal, update] = useState({
      title: "",
      description:"",
      content:"",
      userProfileId: reflectUserObject.id,
      dateCreated: Date.now()

  })
  

  const handleSaveButtonClick = (event) => {
      event.preventDefault()

      const journalToSendToAPI = {
          Title: journal.title,
          Description: journal.description,
          Content: journal.content,
          UserProfileId: reflectUserObject.id,
          DateCreated: new Date().toISOString
      };

      return addJournal(journalToSendToAPI)
      .then(() => {
      navigate("/journals")
      })

};

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

    <div className="pop-Up"> 
    <Popup trigger=
                {<button className="add_Journal_Button"> Add New Journal </button>}
                modal nested>
                {
                    close => (
                      <div className="journal_Form_Container">
                      <form className="journal_Form">
                          <h2 className="journal_Form__Title">Add New Journal</h2>
                          <fieldset>
                              <div className="journal_Form_Group">
                                  <label htmlFor="Title" className="title">Title:</label>
                                  <input className="title_Input"
                                      required autoFocus
                                      type="text"
                                      id="title"
                                      value={journal.title}
                                      onChange={
                                          (evt) => {
                                              const copy = {...journal}
                                              copy.title = evt.target.value
                                          update(copy)
                                          }
                                      } />
                              </div>
                          </fieldset>
                          <fieldset>
                              <div className="journal_Form_Group">
                                  <label htmlFor="description" className="description">Description:</label>
                                  <input className="description_Input"
                                      required autoFocus
                                      type="text"
                                      id="description"
                                      
                                      value={journal.description}
                                      onChange={
                                          (evt) => {
                                              const copy = {...journal}
                                              copy.description = evt.target.value
                                          update(copy)
                                          }
                                      } />
                              </div>
                          </fieldset>
                          <fieldset>
                              <div className="journal_Form_Group">
                                  <label htmlFor="content" className="content">Content:</label>
                                  <textarea className="journal_Content"
                                      required autoFocus
                                      type="text"
                                      id="content"
                                      
                                      value={journal.content}
                                      onChange={
                                          (evt) => {
                                              const copy = {...journal}
                                              copy.content = evt.target.value
                                          update(copy)
                                          }
                                      } />
                              </div>
                          </fieldset>
                      </form>
                      <button className="submit_Journal"
                              onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                              Submit Journal
                          </button>
                          <button className="submit_Journal">
                              Add A Tag
                          </button>
                  </div>
                    )
                }
            </Popup>
    {/* <button onClick={() => navigate("/journal/add")} className="add_Journal_Button"> Add New Journal </button> */}
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