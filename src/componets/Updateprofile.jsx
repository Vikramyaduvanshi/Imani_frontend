import { useContext, useEffect, useRef, useState } from "react"
import { useToast } from "../context/ToastContext";
import { Authcontext } from "../context/Authcontext"
import axios from "axios"
import { api } from "../Util/API"
import Loader from "./loader"
import { useNavigate } from "react-router-dom"

export function Updateprofile(){
    let [loading,setloading]=useState(false)
    let [user1,setuser]=useState({name:"", email:"", number:""})
    let {showToast}=useToast()
let {user}=useContext(Authcontext)
console.log(user)
let navigate=useNavigate()
let inputref= useRef()
useEffect(()=>{

    setuser({ ...user1 ,name:user.name, email:user.email, number:user.number})

inputref.current.focus()
},[])

async function handlesubmit(e){
    setloading(true)
e.preventDefault()
console.log(user1)
let res= await axios.post(`${api}/users/update-profile`,user1, { withCredentials: true })
let res1= await res.data
setloading(false)
console.log("res data in handlesumit",res1)
if(res1.success){
   showToast("Profile Updated  successfully 🎉", "success");
}else{
 showToast(res1.message || "Something went wrong ❌", "danger");
}
navigate("/")

}

function handlechnage(e){
  let {value,name}=e.target
  setuser({...user1, [name]:value})
}

    return (

<>
<Loader loading={loading} message="Your Profile is updating Please wait"/>
<section style={styles.section}>
  <h1 style={styles.heading}>Update Profile</h1>

  <form onSubmit={handlesubmit} style={styles.form}>
    <input type="text" name="name" value={user1.name} style={styles.input} ref={inputref} onChange={handlechnage}/>
    <input type="email" name="email" value={user1.email} style={styles.input} onChange={handlechnage}/>
    <input type="number" name="number" value={user1.number} style={styles.input} onChange={handlechnage}/>
    <input type="submit" value="Submit" style={styles.submitBtn} />

  </form>
</section>


</>

    )
}



const styles = {
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "Arial, sans-serif"
  },

  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "600"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s"
  },

  submitBtn: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  }
};