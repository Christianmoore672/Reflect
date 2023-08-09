// import { useContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Button, FormGroup, Input, Label } from "reactstrap"
// import { CategoryContext } from "../../Managers/CategoryManager"
// import { addPost, uploadPostImage } from "../../Managers/PostManager"

// export const ResearchForm = () => {
//     const localReflectUser = localStorage.getItem("userProfile");
//     const reflectUserObject = JSON.parse(localReflectUser);
//     const navigate = useNavigate();
//     const currentDate = new Date();

//     const [newResearchTopic, updateResearchTopic] = useState({
  
//         userProfileId: reflectUserObject.id,
//         folderTitle: "",
//         note: "",
//         link: "",
//         dateCreated: Date.now()
//     })

//     const handleSaveButtonClick = (e) => {
//         e.preventDefault()
        
//         const researchTopicToSendToAPI = {
            
//             UserProfileId: reflectUserObject.id,
//             FolderTitle: newResearchTopic.folderTitle,
//             Note: newResearchTopic.note,
//             Link: newResearchTopic.link,
//             DateCreated: dateCreated.toISOString()
//         }
//         addPost(researchTopicToSendToAPI)
//         .then((researchTopicId) => {
//             if (researchTopicId) {
//                 navigate(`/research/${researchTopicId}`);
//             }
//         });
//     };

//     return (
//         <form className="research_topic_form">
//             <h2 className="research-form-title">Create a New Research Topic</h2>
//                 <FormGroup className="form-group">
//                     <Label htmlFor="title">Title:</Label>
//                     <Input
//                         className="research-input"
//                         type="text"
//                         id="title"
//                         value={newPost.title}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...newPost }
//                                 copy.title = event.target.value
//                                 updatePost(copy)
//                             }
//                         } />
//                 </FormGroup>
//                 <FormGroup className="form-group">
//                     <Label htmlFor="content">Content:</Label>
//                     <Input
//                         className="post-input"
//                         type="textarea"
//                         id="content"
//                         value={newPost.content}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...newPost }
//                                 copy.content = event.target.value
//                                 updatePost(copy)
//                             }
//                         } />
//                 </FormGroup>
//             <Button
//                 onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Submit Research</Button>
//         </form>
//     )
// }   