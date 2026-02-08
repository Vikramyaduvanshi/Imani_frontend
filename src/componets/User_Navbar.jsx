import { useNavigate, Link } from "react-router-dom";
import profile from "../assets/profile.png";
import { useContext, useEffect, useRef } from "react";
import { Authcontext } from "../context/Authcontext";
import { useDispatch, useSelector } from "react-redux";
import { clearfiltered, fetchproducts, setsearch } from "../redux/productslice";

export function User_navbar() {
  let navigate = useNavigate();
let inputref=useRef()
  let { user, logout } = useContext(Authcontext); // ✅ logout fixed

let {searchword} =useSelector((state)=>state.Allproducts)
let dispatch=useDispatch()
function handlechange(value){
if(inputref.current){
  clearTimeout(inputref.current)
}

 inputref.current= setTimeout(() => {
  dispatch(setsearch(value))
}, 1000);

}


useEffect(()=>{

if(searchword=="" || searchword=="  "){
dispatch(clearfiltered())
}else{
  dispatch(fetchproducts({searchword}))
}

},[searchword])


  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm py-2">
        <div className="container px-md-5 align-items-center">

          {/* Mobile Hamburger */}
          <div className="d-flex align-items-center">
            <button
              className="btn d-lg-none border-0 px-0 me-3"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileMenu"
            >
              <i className="bi bi-list fs-2"></i>
            </button>

            <Link to="/" className="navbar-brand fw-bold fs-3 m-0">
              Imani
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="d-none d-lg-flex flex-grow-1 mx-5 position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input type="text" onChange={(e)=>handlechange(e.target.value)} className="form-control rounded-pill ps-5 border-2 shadow-none py-2" placeholder="Search cosmetic and perfumes by name" />
          </div>

          {/* Desktop Right */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <Link to="/supplire" className="navbar-brand">
              Become Supplire
            </Link>

{user ?             <div
              className="nav-text text-center px-2 custom-nav-item"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#Profilemodal"
            >
              <i className="bi bi-person fs-4 d-block"></i>
              <span>Profile</span>
            </div> :   <>
  <Link 
    to="/login" 
    className="d-flex align-items-center gap-2 text-decoration-none"
  >
    <i className="bi bi-person fs-4"></i>
    <span>Signup / Login</span>
  </Link>
</>
}

            <button
              type="button"
              className="btn nav-text text-center px-2 custom-nav-item"
              onClick={() => navigate("/cart")}
            >
              <i className="bi bi-cart2 fs-4 d-block"></i>
              <span className="d-none d-lg-block">Cart</span>
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="d-lg-none d-flex gap-3 align-items-center">
            <i className="bi bi-heart fs-4"></i>
            <i
              className="bi bi-cart2 fs-4"
              role="button"
              onClick={() => navigate("/cart")}
            ></i>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="container d-lg-none py-2 bg-white border-bottom shadow-sm">
        <div className="position-relative">
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
            <i className="bi bi-search"></i>
          </span>
          <input onChange={(e)=>handlechange(e.target.value)}
            type="text"
            className="form-control rounded-pill ps-5 bg-light border-0"
            placeholder="Search By Product Name..."
          />
        </div>
      </div>

      {/* Offcanvas */}
      <div className="offcanvas offcanvas-start" id="mobileMenu" style={{ width: "280px" }}>
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Imani</h5>
          <button className="btn-close shadow-none" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body p-0">

          <div className="list-group list-group-flush ">
     <Link to="/" className="list-group-item list-group-item-action d-flex align-items-center">
    <i className="bi bi-house me-2"></i>
    Home
  </Link>



            {/* <a className="list-group-item py-3">
              <i className="bi bi-grid me-3"></i> Categories
            </a> */}

            {/* FIXED: div instead of li */}
{user ?             <div role="button" data-bs-toggle="modal" data-bs-target="#Profilemodal" className="d-flex align-items-center bg-light p-2 m-2 rounded-pill border">
              <img src={profile} className="rounded-circle" style={{ width: 35, height: 35 }} alt="profile"/>
              <span className="ms-2 fw-bold">{user?.name}</span>
            </div> : <>
  <Link 
    to="/login" 
    className="d-flex align-items-center gap-2 text-decoration-none"
  >
    <i className="bi bi-person fs-4"></i>
    <span>Signup / Login</span>
  </Link>
</>}






          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <div className="modal fade" id="Profilemodal" tabIndex="-1">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-body text-center p-4">
              <img
                src={profile}
                className="rounded-circle mb-3 border p-1"
                style={{ width: 80 }}
                alt="profile"
              />

              <h5 className="fw-bold mb-0">{user?.name}</h5>
              <p className="text-muted small">{user?.email}</p>

              <span className="badge bg-primary bg-opacity-10 text-primary px-3">
                {user?.role}
              </span>

              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill"
                  onClick={() =>
                    navigate(`/profile/${user?._id || user?.id}`)
                  }
                  data-bs-dismiss="modal"
                >
                  Edit Profile
                </button>

                <button
                  className="btn btn-link text-danger btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
