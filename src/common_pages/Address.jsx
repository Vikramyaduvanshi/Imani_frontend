import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleveryaddress } from "../redux/Cartslice";
import { CheckoutSteps } from "../componets/checkout";
import { useNavigate } from "react-router-dom";

export function Address() {
  const dispatch = useDispatch();
  let naviget=useNavigate()
  const addresses = useSelector((state) => state.cart.address);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });



  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleveryaddress(formData));
    setShowForm(false);
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      mobile: ""
    });
  };




  return (
    <div className="container mt-4 ">
 <CheckoutSteps steps={["cart", "address", "payment","summary"]} currentStep={2}/>

      {/* Header */}
      {addresses.length==0 && <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Select Delivery Address</h5>
        <button
          className="btn btn-link text-decoration-none"
          onClick={() => setShowForm(!showForm)}
        >
          + ADD NEW ADDRESS
        </button>
      </div>}

      {/* Address Form */}
      {showForm && (
        <form className="card p-3 mb-4" onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-6">
              <input className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
            </div>
            <div className="col-12">
              <textarea className="form-control" name="address" placeholder="Address" onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="city" placeholder="City" onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="state" placeholder="State" onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="pincode" placeholder="Pincode" onChange={handleChange} required />
            </div>
          </div>

          <button className="btn btn-primary mt-3">Save Address</button>
        </form>
      )}

      {/* Address List */}
      {  addresses.map((item, index) => (
        <div
          key={index}
          className="card mb-3 p-3  "
          style={{ background: "#eef3ff" }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <input type="radio" checked readOnly className="me-2" />
              <strong>{item.name}</strong>
            </div>
            <span className="text-primary">EDIT</span>
          </div>

          <p className="mt-2 mb-1">
            {item.address}, {item.city}, {item.state}, {item.pincode}
          </p>
          <p>{item.mobile}</p>

        <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary w-50 " onClick={()=>naviget("/payment")}>
            Continue
          </button>
        </div>
        </div>
      ))}
    </div>
  );
}
