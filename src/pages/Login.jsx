import  {useState} from "react";
import "../css/login.css"
import { login } from "../services/server";
import { useNavigate } from 'react-router-dom';
function Login(){

  const naviget=useNavigate()

  const[data,setdata]=useState({
    email:"", 
    password:""
})

// checking if user ared logedin
// useEffect(()=>{
//   const token= localStorage.getItem("token")
//   if(token){
//      handleclick
//   }
 
//  },[])

 const handleclick=()=>{
  naviget("/")
}

//function for login
async function  handlesumbit(e){
  e.preventDefault()
  // console.log(data.email);
  // console.log(data.password);
  let res= await login(data)
  if(res.status===200){
      let data=await res.json()
      console.log(data);
      localStorage.setItem('token',data.token)
      const token = localStorage.getItem('token')
    // console.log(token);
    console.log(data.user.name);
    const n=data.user.name;
    
    localStorage.setItem('name',n)
    localStorage.setItem('email',data.user.email)
      alert('logged in successfully' )
      naviget("/dashboard")
  } else {
      console.log(res)
      alert('enter right credentials please')
  }

 
}

    return(
        <div className="signup-container">
        <div className="image-section"></div>
        <div className="form-section">
          <div className='btn'> <button id="signup" onClick={handleclick}>Signup</button>  <button id="login">Login</button></div>
         
          <h2>Login</h2>
          <form className="signup-form">
           
            <input type="email" placeholder="Email id" name="email" required onChange={(e)=>setdata({...data,[e.target.name]:e.target.value})} />
           
            <input type="password" placeholder="Password" name="password" required onChange={(e)=>setdata({...data,[e.target.name]:e.target.value})}/>
         
            <button type="submit" onClick={handlesumbit} >Login</button>
          </form>
          <p>
          Don’t have an account? <a onClick={handleclick}>SignUp</a>
          </p>
        </div>
      </div>
    )
}

export default Login;