import { useRef, useState } from "react";
import "../index.css"
import axios from "axios"
import Loader from "../componets/loader";
import { useToast } from "../context/ToastContext";
export function Becomesupplire() {
let [enquiryform,seteuquiryform ]=useState({
name:"",
email:"",
number:"",
Businesstype:"",
description:"",

})
let [loading,setloading]=useState(false)
 const { showToast } = useToast();
let inputref=useRef()
function handlechange(e){
let {name,value}=e.target
if(inputref.current){
  clearTimeout(inputref.current)
}

inputref.current = setTimeout(()=>{
seteuquiryform({...enquiryform,[name]:value})

},1000)


}

async function handlesubmit(e) {
  e.preventDefault();
  console.log(enquiryform);

  try {
    setloading(true);

    let res = await axios.post(
      "https://imaani-perfumes.onrender.com/email/sendemail",
      enquiryform
    );

    let res1 = res.data;
    setloading(false);

    console.log(res1);

    // ✅ FIX 1: correct key
    if (res1.success) {
      showToast("Enquiry submitted successfully 🎉", "success");
    } else {
      showToast(res1.message || "Something went wrong ❌", "danger");
    }
  } catch (e) {
    // ✅ FIX 2: stop loader
    setloading(false);
    showToast("Server error ❌", "danger");
  }
}

if(loading){
return (
    <>
<Loader loading={loading} message= "We are proceeding your request , please wait"/>
    </>
)
}


  return (
    <>
     
      <section className="supplier-hero">
        <div className="container text-center">
          <h1>Become a Wholesale Partner</h1>
          <p>
            Partner with IMANI PERFUMES for bulk orders, wholesale distribution,
            and long-term business collaboration.
          </p>
        </div>
      </section>

    
      <section className="supplier-form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="supplier-card">
                <h3 className="text-center mb-2">
                  Business / Wholesale Enquiry
                </h3>
                <p className="text-center text-muted mb-4">
                  Fill out the form below and our sales team will contact you shortly.
                </p>

                <form onSubmit={handlesubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className="form-control" placeholder="Your full name"  required  name="name" onChange={ handlechange} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email Address *</label>
                      <input type="email" className="form-control" placeholder="your@email.com" required name="email" onChange={ handlechange} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" placeholder="+91 XXXXX XXXXX" name="number"  onChange={ handlechange}/>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Business Type</label>
                      <select className="form-select" name="Businesstype" onChange={ handlechange}>
                        <option value="Retailer">Retailer</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Online Seller">Online Seller</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        Message / Requirement *
                      </label>
                      <textarea rows="5" onChange={handlechange} className="form-control" name="description" placeholder="Mention product types, quantity, location, or any specific requirement" required  ></textarea>
                    </div>
                  </div>

                 <button type="submit" className="btn btn-primary w-100 m-2">Submit</button>

                  <p className="form-note">
                    By submitting this form, you agree to be contacted by IMANI PERFUMES.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

