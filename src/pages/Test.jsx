// Importing React and required libraries
import React, { useEffect } from 'react';
import { useState } from 'react';
import '../css/Dashboard.css'; // Add a corresponding CSS file
import "../css/ModalComponent.css"
import {createlink,getlink,getuser,deleteUser,deleteUrl} from "../services/server"
import dashimg from "../assets/dashbordimages/da.png"
import analyticimg from "../assets/dashbordimages/anaytic.png"
import settingimg from "../assets/dashbordimages/setting.png"
import linkimg from "../assets/dashbordimages/link.png"
import deleteimg from "../assets/dashbordimages/delet.png"
import editimg from "../assets/dashbordimages/edit.png"
import cuvetimg from "../assets/dashbordimages/cuvetta.png"
import copyimg from "../assets/dashbordimages/copy.png"
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"; // Import styles


const Test = () => {

//      const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

// for naviget
const naviget=useNavigate()

//for gretings
const [greetin,setGreeting]=useState()

useEffect(() => {
  try {
    // Get token from localStorage
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      throw new Error("No token found");
    }

    // Set token if found
    // setToken(storedToken);
  } catch (error) {
    console.error("Authentication error:", error.message);
    naviget("/login"); // Redirect to login if token is missing or invalid
  }

  //updating greeting
  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("🌞 Good Morning ");
    else if (hour >= 12 && hour < 16) setGreeting("☀️ Good Afternoon ");
    else if (hour >= 16 && hour < 20) setGreeting("🌆 Good Evening ");
    else setGreeting("🌙 Good Night ");
  };

  updateGreeting(); // Initial greeting
  const interval = setInterval(updateGreeting, 900000); // Update every 15 minute

  return () => clearInterval(interval); // Cleanup interval on unmount
}, [naviget]);




//getting initial of name from localstorage
let uname=localStorage.getItem("name").split(' ');
// console.log(uname[0]);
// const initials=uname.map(word => word[0]).join('').toUpperCase();
let upper=uname[0];
// console.log(typeof(upper));
let two =upper.toUpperCase();
let initials=two.slice(0,2)
// console.log(initials);
// console.log(two);
//for link modal
const [isOpen, setIsOpen] = useState(false);
const [action,setAction]=useState("delete")
// const[val,setVal]=useState("")
const nu=action;
  // var act=true;
  // var val="";
const openModal = (url) => {
  setIsOpen(true);
  console.log(url);
    if(nu==="Edit"){
      // value=data.url,
      // act=false
      // setVal(url)

    }
    // act=true

};
const closeModal = () => setIsOpen(false); 
//                              //
    const [activePage, setActivePage] = useState('dashboard');
    const [activeAnchor, setActiveAnchor] = useState();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   


const today=new Date()
const option={weekday:"short",month:"short",year:"numeric",day:"numeric"}
const formateddate=today.toLocaleDateString("en-US",option);


//for logout drop down
const [drop,setDrop]=useState(false)
 

const togledropdown=()=>{
  setDrop(!drop)
}


// for Link data
const [link,setLink]=useState({
  url:'',
  summery:"",
  check:"" ,
  expdate:"",
  //  date:new Date().toLocaleString()
})

//for saved links 
const [links, setLinks] = useState([]);

const handleChange = (e) => {

  setLink({...link,[e.target.name]: e.target.value })
};

//handling new link form

async function handleform(e){
  e.preventDefault()
  console.log(link.check);
  const res=await createlink(link)
  const data= await res.json()
if(res.status===200){
 alert( "link created")
 fetchlink()
 closeModal()
} else {
 // console.error(data)
 alert(data.message)
}

}

// state for user
const [user,setUser]=useState({
  name: "", 
  email: "",
  mobile:""  
})



//fetching user to show in setiing tab
async function fetchuser(){
  const email=localStorage.getItem("email")
  console.log(email);
  const res=await getuser(email)
  const data= await res.json()
  console.log(data);
  if(res.status===200){
    setUser(data)

  } else {
   // console.error(data)
   alert(data.message)
   naviget("/login")
  }
  
  }

  // updating user
  // const [udata,setUdata]=useState({
  //   name:"",
  //   email:"",
  //   mobile:""
  // })

  // const handleuser = (e) => {
  //   // 

  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,  // Spread the existing object
  //     [name]: value // Update only the changed property
  //   }));
  // };
  
 //for pagination
 const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

// fetching links stored in db
async function fetchlink(){
  const res=await getlink(page)
  const data= await res.json()
  setLinks(data.data)
  if(res.status===200){
   console.log(data);
   setTotalPages(data.totalPages);
  } else {
   // console.error(data)
   alert(data.message)
   naviget('/login')
  }
  
  }

  useEffect(()=>{
    fetchlink()
   console.log("from usereffect");
    
  },[page])

//for copying 
const handleCopy = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert(`Copied`);
      //  () => toast("Wow so easy!");
      // console.log("coppied");
  

    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
};



// deleting user
async function deleteuser(){
console.log("deleting user");
   const res=await deleteUser();
   const data= await res.json()
  // setLinks(data)
  if(res.status===200){
   alert("user deleted")
   
   naviget('/')
  } else {
   // console.error(data)
   alert(data.message)
  }

}
//deleting url
async function deleteurl(id){
  console.log("deleting url");
  console.log(id);

  const res=await deleteUrl(id);
  const data= await res.json()
  console.log(data)
  if(res.status===200){
   alert("url deleted")
   
   fetchlink()
  } else {
   // console.error(data)
   alert(data.message)
  }
  
  }

 




const renderContent = () => {
    switch (activePage) {

        case 'dashboard':
          return (
            <section className="analytics">
            <h3>Total Clicks <span className="clicks">1234</span></h3>
                    <div className="analytics-charts">
                      <div className="chart">
                        <h4>Date-wise Clicks</h4>
                        <ul className="bar-chart">
                          <li><span className="bar" style={{ width: '80%' }}></span> 1234</li>
                          <li><span className="bar" style={{ width: '70%' }}></span> 1140</li>
                          <li><span className="bar" style={{ width: '10%' }}></span> 134</li>
                          <li><span className="bar" style={{ width: '2%' }}></span> 34</li>
                        </ul>
                      </div>
                      <div className="chart">
                        <h4>Click Devices</h4>
                        <ul className="bar-chart">
                          <li><span className="bar" style={{ width: '40%' }}></span> Mobile: 134</li>
                          <li><span className="bar" style={{ width: '12%' }}></span> Desktop: 40</li>
                          <li><span className="bar" style={{ width: '1%' }}></span> Tablet: 3</li>
                        </ul>
                      </div>
                    </div>
                    </section>
          );
        case 'links':
          return (
            <div className="card">
              <div className="card-content">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Original Link</th>
                      <th>Short Link</th>
                      <th>Remarks</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {links.map((data,index) => (
                    <tr           key={index} >
                      <td style={{overflow:"hidden"}}>{data.date.split("T")[0]}</td>
                      <td>{data.url}</td>
                      <td>{data.shorturl}<img className="copy-icon" src={copyimg} alt="" onClick={() => {handleCopy(data.shorturl)}}/></td>
                      <td>{data.summery}</td>
                      <td>{data.check}</td>
                      <td>
                      <button onClick={() => {setAction("Edit") ;openModal(data.url)}}>
                            <img src={editimg} alt="" />
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => {setAction("remove") ;setShowDeleteDialog(false); deleteurl(data._id) ;}}>
                            <img src={deleteimg} alt="" />
                        </button>
                        
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              {<div className="pagination" style={{textAlign:"center"}}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>}
            </div>
          );
        case 'analytics':
          return (
            <div className="card">
              <div className="card-content">
                {/* <h2>Analytics Data</h2> */}
                <table>
                  <thead>
                    <tr>
                      <th class="col-1">Timestamp</th>
                      <th class="col-2">Original Link</th>
                      <th class="col-3">Short Link</th>
                      <th class="col-4">IP Address</th>
                      <th class="col-5">User Device</th>
                    </tr>
                  </thead>
                  <tbody>
                  {links.map((data,index) => (
                    <tr>
                      <td>{data.date.split("T")[0]}</td>
                      <td>{data.url}</td>
                      <td>{data.shorturl}</td>
                      <td>{data.ip}</td>
                      <td>{data.devices}</td>
                    </tr>
                       ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        case 'settings':
          return (
            <div className="card" style={{marginLeft:"200px"}}>
              <div className="card-content">
                <form onSubmit={(event) => event.preventDefault()}>
                  <div>
                    <label>Name</label>
                    <input type="text"  value={user.name} style={{marginLeft:"60px"}} 
                    
                    />
                   
                  </div>
                  <div>
                    <label>Email ID</label>
                    <input type="email" value={user.email } style={{marginLeft:"40px"}} 
                    />
                  </div>
                  <div>
                    <label>Mobile No.</label>
                    <input type="text"  value={user.mobile} style={{marginLeft:"20px"}} 
                    />
                  </div>
                  <br></br>
                  <div className="flex-buttons" style={{textAlign:"start" }}>
                    <button className="btn-blue">Save Changes</button><br>
                    </br>
                    <br></br>
                    <button
                      className="btn-red"
                      onClick={() => {setShowDeleteDialog(true)
                        setAction("delete")
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        default:
          return null;
      }
  };
 
   

  return (
   
    // {`dashboard-container ${showDeleteDialog ? "blur-background" : ""}`}
    // {showDeleteDialog?"blur-background" :"dashboard-container" }
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo"><img src={cuvetimg} alt="" /></div>
        <h2></h2>
        <nav className="menu">
          <a className="menu-item" id={activeAnchor==="dash"?"active-link":""}  onClick={() => {setActivePage('dashboard');setActiveAnchor("dash")}} > <img src={dashimg} alt=""/>Dashboard</a>
          <a className="menu-item" id={activeAnchor==="Links"?"active-link":""}  onClick={() => {setActivePage('links');setActiveAnchor("Links"),fetchlink()}}><img src={linkimg} alt=""/>Links</a>
          <a className="menu-item" id={activeAnchor==="Analytics"?"active-link":""}  onClick={() => {setActivePage('analytics');setActiveAnchor("Analytics"),fetchlink()}}><img src={analyticimg} alt=""/>Analytics</a>
          <a className="menu-item" id={activeAnchor==="Settings"?"active-link":""} onClick={() => {setActivePage('settings');setActiveAnchor("Settings"),fetchuser()}}><img src={settingimg} alt=""/>Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h4>{greetin},{uname[0]}</h4>
            <p style={{color:"#878BA9"}}>{formateddate}</p>
          </div>
          <div className="header-actions">
            <button className="btn-create" onClick={()=>{openModal(""),setAction("New")}} >+ Create new</button>
            <input
              type="text"
              placeholder="Search by remarks"
              className="search-box"
            />
            <div className="user-icon" 
            onClick={togledropdown}
            >{initials}</div>
            {
              drop && (
                <div  style={{
                  position: "absolute",
                  top: "85px",
                  right: "20px",
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  zIndex: 1,
                }}>
                  <ul style={{ listStyle: "none", margin: 0, padding: "10px" }}>
                    <li style={{
                    cursor: "pointer",
                    }}
                    onClick={()=>{localStorage.clear(); naviget("/login")}}>Logout</li>
                  </ul>
                </div>
              )
            }
          </div>
        </header>
      <div>
      {renderContent()}
      {showDeleteDialog && (
        <div className="dialog">
          <div className="dialog-content">
            {/* <h2 style={{textAlign:"center"}}>Are you sure?</h2> */}
            <p>{`Are you sure?  you want to  ${action} it?`}</p>
            <div className="dialog-footer">
              <button id='cancel' onClick={() => {setShowDeleteDialog(false) }}>NO</button>
              <button
                className="btn-red"
                onClick={() => {
                  deleteuser();
                    setShowDeleteDialog(false);
                    // alert('Account deleted');
                  }}
                id='delete'
              >
               YES
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   MODAL    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        
        {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
           <div className="upper">
           <button onClick={closeModal} className="close-modal-btn">
              ✕
            </button>
            <h2 className="modal-title" style={{marginLeft:"1px"}}>{nu} link</h2>
           </div>
               
            {/* Form */}
            <form>
              <div className="form-group">
                <label>
                  Destination Url <span className="required">*</span>
                </label>
                <input
                  type="url"
                  className="form-control"
                  // placeholder="enter link"
                  required
                  onChange={handleChange}
                  name='url'
                 
                />
              </div>

              <div className="form-group">
                <label>
                  Remarks <span className="required">*</span>
                </label>
                <textarea
                  className="form-control"
                  placeholder="Add remarks"
                  rows="4"
                  required
                  name='summery'
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-group form-inline">
                <label>Link Expiration</label>
                <input type="checkbox" name="check" onChange={handleChange}  />
              </div>

              <div className="form-group">
                <input type="date" className="form-control" name='expdate' onChange={handleChange} />
              </div>

              <div className="form-actions">
               
                <button type="reset"  className=" btn-secondary">
                  Clear
                </button>
                <button type="submit" onClick={handleform} className=" btn-primary">
                  Create new
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};

export default Test;
