import React, { useEffect, useRef, useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManger";
import "../App.css"
import lottie from "lottie-web";

export default function Register({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [Name, setName] = useState();
  const [email, setEmail] = useState();
  const [ImageUrl, setImageUrl] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const container = useRef(null)

  const registerClick = (e) => {
    e.preventDefault();
    // if (!userType) {
    //   alert("Please select a User Type (Admin or Author).");
    //   return;
    // }

    //password was not active in this application
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");

    } else { 
      const userProfile = { Name, email, ImageUrl};
      register(userProfile, password)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
    }
 };

 useEffect(() => {
  lottie.loadAnimation({
    container: container.current, 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: require('../assets/sun.json'),
  })
}, [])

 //This is makes it so a new user can register as an author or admin. People wouldn't normally be given this ability in a real app and would need permissions. We could always uncomment the hard code in the userprofilecontroller in c# to automatically register authors. I found that You still have to have this function though for it to have something to send that can be overwritten
//   const adminOrAuthor = (e) => {
//     e.preventDefault();
//     const userTypeValue = parseInt(e.target.value);
//     if (userTypeValue === 1){
//       setUserType({ id: 1, name: "Admin"})
//       setUserTypeId(1)
//     } else if (userTypeValue === 2) {
//       setUserType({ id: 2, name: "Author"})
//       setUserTypeId(2)
//     } else {
//       alert("Please enter '1' or '2'.")
//       setUserType("")
//     }
//   }

  return (
    <div>
      <div className="register_Title"> Register </div>
    <Form className="register_Form" onSubmit={registerClick}>
      <fieldset>
      <div className="register_gif" ref={container}></div>
        <div>
        <FormGroup>
          <Label htmlFor="Name">Name</Label>
          <Input id="Name" type="text" onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageUrl">Profile Image URL</Label>
          <Input id="imageUrl" type="text" onChange={e => setImageUrl(e.target.value)} />
        </FormGroup>
        {/* <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup> */}
        {/* <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup> */}
        <FormGroup>
          <Button>Register</Button>
          <em className="go_Back">
          <Link to="/login">Go Back</Link>
        </em>
        </FormGroup>
        </div>
      </fieldset>
    </Form>
    </div>
  );
}