import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editJournal } from "../../Managers/JournalManager";
import { getJournalById } from "../../Managers/JournalManager";
import Beige from "../Beige.png";
import { MdArrowBackIos } from 'react-icons/md';

export const JournalEdit = () => 
{
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    const { id } = useParams()

    const [journal, update] = useState({
        title: "",
        description:"",
        content:"",
        userProfileId: reflectUserObject.id,
        dateCreated: Date.now()

    })
    
    useEffect(() => {
        getJournalById(id)
        .then((journalArray) => {
            update(journalArray)
        })
    }, [id]);

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const journalToEdit = {
            Id: parseInt(id),
            Title: journal.title,
            Description: journal.description,
            Content: journal.content,
            UserProfileId: reflectUserObject.id,
            DateCreated: new Date().toISOString
        }

       return editJournal(journalToEdit)
        .then(() => {
            navigate("/journals")
        })
};


return (
    <article>
    <img className="beige" src={Beige} alt="" />

    <div className="edit_Journal_Form_Container">
    <form className="journal_Form">
        <h2 className="journal_Form__Title">Edit Journal</h2>
        <fieldset>
            <div className="journal_Form_Group">
                <label htmlFor="Title">Title:</label>
                <input
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
                <label htmlFor="description">Description:</label>
                <input
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
                <label htmlFor="content">Content:</label>
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
            Submit Changes
        </button>
</div>
<div className="back_Icon" onClick={() => navigate("/journals")}> <MdArrowBackIos /> </div>

</article>)

}