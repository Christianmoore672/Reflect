import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addJournal } from "../../Managers/JournalManager";


export const JournalForm = () => {
    const localReflectUser = localStorage.getItem("userProfile");
    const [tags, setTags] = useState([]);
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()

    const getAllTags = () => {
        getAllTags().then(c => setTags(c));
    };
    
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

return (
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
                  </div>)

}