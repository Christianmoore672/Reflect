import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTag } from "../../Managers/TagManager";
import { getTagById } from "../../Managers/TagManager";
import { MdArrowBackIos } from 'react-icons/md';
import Beige from "../Beige.png";

export const TagEdit = () =>
{
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)
    const navigate = useNavigate()
    const { id } = useParams()

    const [tag, update] = useState({
        name: "",
        userProfileId: reflectUserObject.id

    })
    
    useEffect(() => {
        getTagById(id)
        .then((tagArray) => {
            update(tagArray)
        })
    }, [id]);

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const tagToEdit = {
            Id: parseInt(id),
            Name: tag.name,
            UserProfileId: reflectUserObject.id
        }

       return editTag(tagToEdit)
        .then(() => {
            navigate("/trends")
        })
};


return (
    <article>
     <img className="beige" src={Beige} alt="" />
    <div className="tag_Form_Container">
    <form className="tag_Form">
    <h2 className="tag_Form__Title">Edit Tag</h2>
    <fieldset>
            <div className="tag_Form_Group">
                <label htmlFor="tag_Name">Tag Name:</label>
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
            <button className="submit_Tag_Changes"
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
            Submit Changes
            </button>
        </fieldset>
        </form>
   
</div>
<div className="back_Icon" onClick={() => navigate("/trends")}> <MdArrowBackIos /> </div>
</article>)

}