import { useState } from "react"
import { editUserProfile, getUserProfileById, uploadUserProfileImage } from "../../Managers/UserProfileManger";
import { Button, CardBody, CardSubtitle, CardTitle, FormGroup, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";

export const UserProfileEdit = ({ userProfileProp, setUserProfile, setShowEdit }) => {
    const [editedUserProfile, setEditedUserProfile] = useState({
        Name: "",
        email: "",
        imageUrl: ""
    })
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const userProfileToEdit = {
            Id: userProfileProp.id,
            Name: userProfileProp.name,
            Email: userProfileProp.email,
            ImageLocation: editedUserProfile.imageUrl
        }
        editUserProfile(userProfileToEdit)
            .then(() => getUserProfileById(userProfileProp.id))
            .then((updatedProfile) => setUserProfile(updatedProfile));
            setShowEdit(false)
    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        try {
            const res = await uploadUserProfileImage(file);
            const data = await res.json();
            if (data.imageUrl) {
                const copy = { ...editedUserProfile }
                copy.imageUrl = data.imageUrl
                setEditedUserProfile(copy);
            }
            else {
                alert("Image Upload Failed")
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
            alert("An error occured during the image upload");
        }
    };

    return (
        <>
            <CardBody>
            <FormGroup className="form-group">
                <Label htmlFor="imageUrl">Image Url:</Label>
                <Input
                    className="userProfile-input"
                    type="file"
                    id="imageUrl"
                    onChange={handleImageChange} />
                {selectedImage && <p>Selected Image: {selectedImage}</p>}
            </FormGroup>
            <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Upload New Avatar</Button>
                <CardTitle tag="h4">{userProfileProp.Name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2">Email: {userProfileProp.email}</CardSubtitle>
            </CardBody>
        </>
    )
}