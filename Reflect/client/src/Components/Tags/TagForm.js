import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addTag } from "../../Managers/TagManager";


export const TagForm = () => {
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()


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
        .then(() => {
        navigate("/trends")
        })

};

return (
    <div className="tag_Form_Container">
    <form className="tag_Form">
        <h2 className="tag_Form__Title">Add New Tag</h2>
        <fieldset>
            <div className="tag_Form_Group">
                <label htmlFor="Name">Tag Name:</label>
                <input
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
</div>)

}