import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManger";
import "../App.css"
import lottie from "lottie-web";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const container = useRef(null)


  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../assets/sun.json'),
    })
}, [])

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    
    <Form className="login_Container" onSubmit={loginSubmit}>
      
      <fieldset>
      <div className="login_gif" ref={container}></div>
        <div className="reflect"> REFLECT </div>
        <div className="login_functions">
        <FormGroup>
          <Label className="login_Email" for="email">EMAIL:</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        {/* <FormGroup className="login_password">
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup> */}
        <FormGroup className="login_button">
          <Button>Login</Button>
        </FormGroup>
        <em className="not_registered">
          Not registered? <Link to="/register">Register</Link>
        </em>
        </div>
      </fieldset>

    </Form>
  );
}