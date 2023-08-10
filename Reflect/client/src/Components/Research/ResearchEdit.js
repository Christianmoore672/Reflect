import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editResearchTopic, getResearchTopicById } from "../../Managers/ResearchManager";


export const ResearchTopicEdit = () => 
{
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    const { researchTopicId } = useParams()

    const [researchTopic, update] = useState({
        userProfileId: reflectUserObject.id,
        folderTitle: "",
        note:"",
        link:"",
        dateCreated: Date.now()

    })
    
    useEffect(() => {
        getResearchTopicById(researchTopicId)
        .then((researchTopicArray) => {
            update(researchTopicArray)
        })
    }, [researchTopicId]);

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const researchTopicToEdit = {
            Id: parseInt(researchTopicId),
            UserProfileId: reflectUserObject.id,
            FolderTitle: researchTopic.folderTitle,
            Note: researchTopic.note,
            Link: researchTopic.link,
            DateCreated: new Date().toISOString
        }

       return editResearchTopic(researchTopicToEdit)
        .then(() => {
            navigate("/research")
        })
};


return (
    <div className="research_Form_Container">
    <form className="research_Form">
        <h2 className="research_Form__Title">Add New Research Folder</h2>
        <fieldset>
            <div className="research_Form_Group">
                <label htmlFor="Title">Folder Title:</label>
                <input
                    required autoFocus
                    type="text"
                    id="folderTitle"
                    value={researchTopic.folderTitle}
                    onChange={
                        (evt) => {
                            const copy = {...researchTopic}
                            copy.FolderTitle = evt.target.value
                        update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="research_Form_Group">
                <label htmlFor="note">Notes:</label>
                <textarea  className="research_Note"
                    required autoFocus
                    type="text"
                    id="note"
                   
                    value={researchTopic.note}
                    onChange={
                        (evt) => {
                            const copy = {...researchTopic}
                            copy.note = evt.target.value
                        update(copy)
                        }
                    } 
                    
                    />
            </div>
        </fieldset>
        <fieldset>
            <div className="research_Form_Group">
                <label htmlFor="link">Link:</label>
                <input
                    required autoFocus
                    type="text"
                    id="link"
                    
                    value={researchTopic.link}
                    onChange={
                        (evt) => {
                            const copy = {...researchTopic}
                            copy.link = evt.target.value
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