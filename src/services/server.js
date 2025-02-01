// const URL='https://docapp-t2wv.onrender.com'

// const URL = 'http://localhost:4000'
const URL = 'https://linkbackend-gl1h.onrender.com'
// export const register = (data) => {
//     return fetch(`${URL}/user/register`, {

const login=(data)=>{
console.log("from server"+data.email+data.password);
   return fetch(`${URL}/user/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
   })
   
}
export {login}


export const signup=(data)=>{
    console.log(data);
    return fetch(`${URL}/user/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)   
       
    })
}

//geting single user
export const getuser=(data)=>{
    console.log(data);
    return fetch(`${URL}/user/find/${data}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        // body:JSON.stringify(data)   
       
    })
}
// deleting user 
// /delete
export const deleteUser=()=>{
    console.log("in server front ");
    return fetch(`${URL}/user/delete`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token")  
        },
       
    })
}


// creating and storing link
export const createlink=(data)=>{
    console.log(data);
    return fetch(`${URL}/url/create`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token")  
        },
        body:JSON.stringify(data)       
    })
}

// geting all links associat to user
export const getlink=(page)=>{
    return fetch(`${URL}/url/find?page=${page}&limit=5`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json", 
            "Authorization":localStorage.getItem("token") 
        },
    })
}

//deleting url using url coz name is unique
export const deleteUrl=(id)=>{
    console.log(id);
    return fetch(`${URL}/url/delete/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token")   
        },          
    })  
}
