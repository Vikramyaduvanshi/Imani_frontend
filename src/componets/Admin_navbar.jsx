import { useContext, useEffect, useRef } from "react";
import { Authcontext } from "../context/Authcontext";
import ProductForm from "../admin_pages/Create_product";
import profile from "../assets/profile.png";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { clearfiltered, fetchproducts, setsearch } from "../redux/productslice";
import { useDispatch, useSelector } from "react-redux";

export function Admin_navbar() {
  let { searchword } = useSelector((state) => state.Allproducts);
  let { user, logout } = useContext(Authcontext);
  let navigate = useNavigate();
  let userref = useRef();
  let dispatch = useDispatch();

  function takeinput(value) {
    clearTimeout(userref.current);

    userref.current = setTimeout(() => {
      dispatch(setsearch(value.trim()));
    }, 500);
  }

  useEffect(() => {
    if (!searchword || searchword.trim() === "") {
      dispatch(clearfiltered());
      return;
    }

    dispatch(fetchproducts({ searchword }));
  }, [searchword, dispatch]);

  useEffect(() => {
    return () => clearTimeout(userref.current);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-primary" to="/" style={{ letterSpacing: "1px" }}>
            ADMIN<span className="text-dark">PANEL</span>
          </Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <form
              className="mx-auto my-2 my-lg-0"
              style={{ width: "40%", minWidth: "250px" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-pill">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  className="form-control bg-light border-start-0 rounded-end-pill shadow-none"
                  type="search"
                  placeholder="Search products..."
                  onChange={(e) => takeinput(e.target.value)}
                />
              </div>
            </form>

            <ul className="navbar-nav align-items-center">
              <li className="nav-item me-4">
                <button
                  className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#createproduct"
                >
                  <i className="bi bi-plus-lg me-1"></i> Create Product
                </button>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link fw-semibold px-3" to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item ms-lg-3 mx-2">
                <div
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Profilemodal"
                  className="d-flex align-items-center bg-light p-1 pe-3 rounded-pill border"
                >
                  <img
                    src={profile}
                    className="rounded-circle border border-white shadow-sm"
                    alt="profile"
                    style={{ width: "35px", height: "35px", objectFit: "cover" }}
                  />
                  <span className="ms-2 small fw-bold d-none d-xl-inline-block">{user?.name || "Admin"}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="createproduct" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title fw-bold">Add New Product</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body ">
              <ProductForm />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Profilemodal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-body text-center p-4">
              <img src={profile} className="rounded-circle mb-3 border p-1" alt="Admin" style={{ width: "80px" }} />
              <h5 className="mb-0 fw-bold">{user?.name}</h5>
              <p className="text-muted small mb-3">{user?.email}</p>
              <span className="badge bg-soft-primary text-primary rounded-pill mb-4 px-3">{user?.role}</span>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill"
                  data-bs-dismiss="modal"
                  onClick={() => navigate(`/profile`)}
                >
                  Edit Profile
                </button>
                <button className="btn btn-link btn-sm text-danger text-decoration-none" onClick={ ()=>logout()}>
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