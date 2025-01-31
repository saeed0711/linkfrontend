// Importing React and required libraries
import React from 'react';
import { useState } from 'react';
// import '../css/Signup.css'; // Create a CSS file for styling
import "../css/login.css"
import { signup } from '../services/server';
import { useNavigate } from 'react-router-dom';
const Signup= () => {


  //to naviget 
  const naviget=useNavigate()


// for same password
  const [flag,setflag]=useState(false)
  // signup data 
  const [fdata,setfdata]=useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
    confirmPassword:""
  })

  // on change event in form 
  const handleChange = (e) => {
    setfdata({...fdata,[e.target.name]: e.target.value });
  };

//using signup function
const handelform=async(e)=>{
  e.preventDefault()
  setflag(false)
  console.log(fdata);
  if(fdata.password===fdata.confirmPassword){
 
    // console.log('check');
    // console.log(fdata.email);
    // console.log(fdata.name);
    // console.log(fdata.password);
    // console.log(fdata.mobile);
      const res= await signup(fdata)
      const jsondata=await res.json()
      if(res.status===200){
        alert("user created please login")
        naviget("/Login")
       
      }else{
        alert(jsondata.message)
      }
      // console.log(fdata);
    }else{
      console.log("erore");
      setflag(true)
     
  }
 
}

const handleclick=()=>{
  naviget("/login")
}


  return (
    <div className="signup-container">
      <div className="image-section"></div>
      <div className="form-section">
        <div className='btns'style={{marginLeft:"291px"}}> <button id="signup">Signup</button>  <button id="login" onClick={handleclick}>Login</button></div>
       
        <h2 style={{marginLeft: "-231px"}}>Join us Today!</h2>
        <form className="signup-form">
          <input type="text" placeholder="Name" name="name" required onChange={handleChange} />
          <input type="email" placeholder="Email id" name="email" required onChange={handleChange} />
          <input type="tel" placeholder="Mobile no." name="mobile" required  onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" required onChange={handleChange} />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            onChange={handleChange}
          />
          {flag && <span style={{color:"red"}}> enter same password in both feild </span>}
          <button type="submit" onClick={handelform}>Register</button>
        </form>
        <p>
          Already have an account? <a onClick={handleclick}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
