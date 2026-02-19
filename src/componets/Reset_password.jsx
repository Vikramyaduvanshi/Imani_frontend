import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastProvider, useToast } from "../context/ToastContext";
import Loader from "./loader";
import { api } from "../Util/API";
export function Reset_password() {
  let {showToast}=useToast()
    let [loading, setloading]=useState(false)
let [Searchparams]=useSearchParams()
let password= useRef()
let confirmPassword= useRef()
let token= Searchparams.get("token")
let navigate=useNavigate()
async function handlesubmite(e){
e.preventDefault()
setloading(true)
console.log(password.current.value)
console.log(confirmPassword.current.value)
let res= await axios.post(`${api}/users/reset_password`, {password:password.current.value}, {params:{token}})
let ans = await res.data
setloading(false)
if(ans.success){
    // alert(ans.message)
showToast(ans.message || "password updated successfully", "success")

}else{
showToast(ans.message || "some error occured", "danger")

}
// console.log(ans)
navigate("/login")
}
if(loading){  
   return (
    <>
     <Loader loading={loading} message="Please wait reseting password" />
    
    </>
   )
}



  return (
    <>
      <section style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Reset Password 🔑</h1>
          <p style={styles.subText}>  Create a strong new password for your account</p>

          <form style={styles.form} onSubmit={handlesubmite}>
            <input type="password" placeholder="🔒 New Password" style={styles.input} ref={password} />

            <input  type="password"  placeholder="🔒 Confirm New Password"  style={styles.input} ref={confirmPassword}/>

            <button type="submit" style={styles.button}>   Update Password </button>
          </form>
        </div>
      </section>
    </>
  );
}


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
  },

  card: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "14px",
    width: "360px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  heading: {
    marginBottom: "10px",
    color: "#222",
  },

  subText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "22px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  input: {
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    padding: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#43cea2",
    color: "#fff",
    transition: "0.3s",
  },
};
