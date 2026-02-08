import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux";
import { additem } from "../redux/Cartslice";
import { useNavigate } from "react-router-dom";


export let Authcontext= createContext();


export function Authprovider({children}){
  let navigate=useNavigate()
let [user,setuser]=useState(null)
let [loading,setloading]=useState(false)
let dispatch=useDispatch()

// let obj={
//   email: "surya@gmail.com",
//   // password: "vikram123"
//   password: "surya123"

// }

async function login(obj){
  console.log("auth login",obj)
setloading(true)
let res= await axios.post("https://imaani-perfumes.onrender.com/users/login",obj, {
    withCredentials: true   
  })

setloading(false)
let ans = await res.data
console.log("authcontext",ans)
if(ans.success){
    setuser(ans)
if(ans.cart.length>0){
 dispatch(additem(ans.cart))
}

}
return {success:ans.success, message:ans.message}
}

async function logout() {
  setuser(null);

  try {
    await axios.post("https://imaani-perfumes.onrender.com/users/logout", {}, { withCredentials: true });
    console.log("Logged out successfully");
  } catch (err) {
    console.error(err);
  }
}

// useEffect(()=>{
// login(obj)
// console.log(user)
// },[])   



return (
 <Authcontext.Provider value={{login,user,loading,logout}}>
{children}
 </Authcontext.Provider>
)

}



