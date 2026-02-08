import { useState, useContext } from "react";
import axios from "axios";
import "../Signup.css";
import { useNavigate } from "react-router-dom";
import Loader from "../componets/loader";
import { useToast } from "../context/ToastContext";

export function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
let login= useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
let {showToast}=useToast()
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function signup(e) {
    e.preventDefault();
    // setError("");
    setLoading(true);

    try {
      let res = await axios.post(
        "https://imaani-perfumes.onrender.com/users/signup",
        form,
        { withCredentials: true }
      );

      let data =await res.data;
      setLoading(false);
      if (!data.success) {
        // setError(data.message);
        showToast(data.message|| "some error occured 😣😫, please trye again", "danger")
      } else {
        // alert("Signup Successful 🎉");
        showToast(data.message || "Account created successfully ❤️😃😃🎉", "success")
        navigate("/login") // optional
      }
    } catch (err) {
      showToast(data.message || "some error occured in server 💀💀💀💀💣", "danger")
      // setError("Something went wrong. Try again!");
    }

   
  }




if(loading){
  return (

<>
<Loader loading={loading} message="Please Wait Account is Creating 🫷🫷 🫸🫸  "/>

</>

  )
}





  return (
    <div className="signup-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6">
            <div className="card signup-card shadow-lg p-4">
              <h3 className="text-center fw-bold mb-4">Create Account</h3>

              {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}

              <form onSubmit={signup}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter phone number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>

              <p className="text-center mt-3 text-muted">
                Already have an account?{" "}
                <span className="text-primary" onClick={()=>login("/login")}>Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
