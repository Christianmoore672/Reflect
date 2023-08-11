import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addResearchTopics } from "../../Managers/ResearchManager";


export const ResearchForm = () => {
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()


    const [researchTopic, update] = useState({
        userProfileId: reflectUserObject.id,
        folderTitle: "",
        note:"",
        link:"",
        dateCreated: Date.now()

    })
    

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const researchTopicToSendToAPI = {
            UserProfileId: reflectUserObject.id,
            FolderTitle: researchTopic.folderTitle,
            Note: researchTopic.note,
            Link: researchTopic.link,
            DateCreated: new Date().toISOString
        };

        return addResearchTopics(researchTopicToSendToAPI)
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
                <label htmlFor="folderitle">Folder Title:</label>
                <input
                    required autoFocus
                    type="text"
                    id="folderTitle"
                    value={researchTopic.folderTitle}
                    onChange={
                        (evt) => {
                            const copy = {...researchTopic}
                            copy.folderTitle = evt.target.value
                        update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="research_Form_Group">
                <label htmlFor="note">Notes:</label>
                <textarea className="research_Note"
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
            Create Folder
        </button>
</div>)

}