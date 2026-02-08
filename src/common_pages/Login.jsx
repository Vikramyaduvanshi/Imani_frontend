import { useContext, useState } from "react";
import { Authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import Loader from "../componets/loader";

export function Login() {
  const { login, loading } = useContext(Authcontext);
let navigate=useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

 let res=   await login(form);
 console.log("login page return",res)
    if(res.success){
        navigate("/")
    }else{
        alert(res.message)
    }
  }

if(loading){
 return   <Loader message="Login Please Wait" loading={loading} />
}

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-5">
            <div className="card shadow-lg p-4 login-card">
              <h3 className="text-center mb-4 fw-bold">Login</h3>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email address</label>
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

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-center mt-3 text-muted">
                Don’t have an account? <span className="text-primary" onClick={()=>navigate("/signup")} >Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
