import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileById } from "../../Managers/UserProfileManger";
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, Button, Container, Row, Col } from "reactstrap";
import { UserProfileEdit } from "./UserProfileEdit";
import Beige from "../Beige.png";
import { MdArrowBackIos } from 'react-icons/md'

export const UserProfileDetails = () => {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    const localReflectUser = localStorage.getItem("userProfile");
    const reflectUserObject = JSON.parse(localReflectUser)

    useEffect(() => {
        getUserProfileById(id).then(setUserProfile);
    }, [id]);

    return (
        
            <article className="user_Profile">
                
             <img className="beige" src={Beige} alt="" />
                <div>
                        <Card className="profile_Container">
                            <CardImg src={userProfile.imageUrl || 'https://cdn.blot.im/blog_d8d1cd7cc6d843f3ae3579956910aebf/_image_cache/1531081728793/whaleavatar.jpg'} alt="Profile pic" />
                            
                            <article>

                                <div key={userProfile.Name}> </div>
                                <CardSubtitle  className="">Email: {userProfile.email}</CardSubtitle>
                                <CardSubtitle  className="">Name: {userProfile.name}</CardSubtitle>

                            </article>
                        </Card>
                </div>
                <div className="back_Icon" onClick={() => navigate("/")}> <MdArrowBackIos /> </div>
            </article>
    );
}