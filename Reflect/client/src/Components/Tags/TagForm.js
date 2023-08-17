import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addTag } from "../../Managers/TagManager";
import { addJournalTag } from "../../Managers/JournalManager";
import { MdArrowBackIos } from 'react-icons/md';
import Beige from "../Beige.png";

export const TagForm = () => {
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    const { id } = useParams();

    const [tag, update] = useState({
        name: "",
        userProfileId: reflectUserObject.id

    })
    

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const tagToSendToAPI = {
            Name: tag.name,
            UserProfileId: reflectUserObject.id
        };


        return addTag(tagToSendToAPI)
        .then((returnTag) => {
            const newJournalTag = {
                    tagId: returnTag.id,
                    journalId: +id
            }
            addJournalTag(newJournalTag)
            .then(() => {
                navigate("/trends")
            })
        })

};

return (
<article>
<img className="beige" src={Beige} alt="" />
    <div className="tag_Form_Container">
    <form className="tag_Form">
        <h2 className="tag_Form__Title">Add New Tag</h2>
        <fieldset>
            <div className="tag_Form_Group">
                <label htmlFor="Name">Tag Name:</label>
                <input className="tag_Name_Input"
                    required autoFocus
                    type="text"
                    id="name"
                    value={tag.name}
                    onChange={
                        (evt) => {
                            const copy = {...tag}
                            copy.name = evt.target.value
                        update(copy)
                        }
                    } />
            </div>
        </fieldset>
    </form>
    <button className="submit_Tag"
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
            Submit Tag
        </button>

</div>
<div className="back_Icon" onClick={() => navigate("/trends")}> <MdArrowBackIos /> </div>
</article>)

}