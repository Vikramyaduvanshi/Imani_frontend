import { useState } from "react";
import axios from "axios";
import Loader from "./loader";
import { useToast } from "../context/ToastContext";
export function Forget_Password(){
  let {showToast}=useToast()
let [user,setuser]=useState("")
let [loading,setloading]=useState(false)
async function handlesubmit(e){
    e.preventDefault()
console.log(user)
setloading(true)
let res = await axios.post("https://imaani-perfumes.onrender.com/users/forgot_password", {email:user})
let ans=await res.data
setloading(false)

if(ans.success){
  showToast("Password reset link has sent to your Email 🎉", "success");
}else{
   showToast(ans.message||"something error in server", "danger");
}

}

if(loading){
return (
  <>
  <Loader   loading={loading} message="Please Wait , We are Sending link to Your Email"/>
  </>
)
}

  return (
    <>
      <section style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Forgot Password 🔐</h1>
          <p style={styles.subText}>
            Enter your registered email and we’ll send you a reset link.
          </p>

          <form className="form" style={styles.form} onSubmit={handlesubmit}>
            <input type="email" name="email" id="email" placeholder="✉️ Enter your email" style={styles.input} required onChange={(e)=>setuser(e.target.value)}/>

            <input type="submit" value="Send Reset Link" style={styles.button}/>
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
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  heading: {
    marginBottom: "10px",
    color: "#333",
  },

  subText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
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
    backgroundColor: "#667eea",
    color: "#fff",
    transition: "0.3s",
  },
};
