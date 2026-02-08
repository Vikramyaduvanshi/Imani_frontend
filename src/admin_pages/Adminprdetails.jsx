import { useState } from "react";
import { Updateproduct } from "./Updateproduct";

export function AdminPrdetails({ product }) {
    let [update,setupdate]=useState(false)
  if (!product) return null;

  let {
    category,
    description,
    price,
    productImages,
    productname,
    producttype,
    rating: { rate, count },
    size,
    specialpramotion,
    pricing
  } = product;

  return (
    <>

     {update==false?(

<>
<div className="border-bottom p-3 mb-3">
        <h4 className="fw-bold mb-0">Admin Product Details</h4>
        <small className="text-muted">View & manage product information</small>
      </div>

      <div className="container-fluid">
        <div className="row">

          {/* LEFT: Images */}
          <div className="col-lg-5 mb-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h6 className="fw-semibold mb-3">Product Images</h6>

                <div className="row g-2">
                  {productImages.map((v, i) => (
                    <div className="col-6" key={i}>
                      <div className="image-box rounded-3 overflow-hidden">
                        <img src={v.url} alt="product" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div className="card-body">

                <h5 className="fw-bold mb-3">{productname}</h5>

                <div className="row mb-3">
                  <div className="col-6">
                    <span className="text-muted">Base Price</span>
                    <p className="fw-semibold">₹ {price}</p>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Size</span>
                    <p className="fw-semibold">{size}</p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <span className="text-muted">Category</span>
                    <p className="fw-semibold text-capitalize">{category}</p>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Product Type</span>
                    <p className="fw-semibold text-capitalize">{producttype}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-muted">Description</span>
                  <p className="text-secondary">{description}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                  <div>
                    ⭐ <strong>{rate}</strong>
                    <small className="text-muted ms-1">({count} reviews)</small>
                  </div>

                  <span
                    className={`badge px-3 py-2 ${
                      specialpramotion ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {specialpramotion ? "Special Promotion" : "No Promotion"}
                  </span>
                </div>

              </div>
            </div>

            {/* 🔥 PRICING SECTION */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Pricing Variants</h6>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricing.map((p, i) => (
                        <tr key={p._id}>
                          <td>{i + 1}</td>
                          <td>
                            <span className="badge bg-info-subtle text-dark px-3 py-2">
                              {p.quantity} Unit
                            </span>
                          </td>
                          <td className="fw-semibold text-success">
                            ₹ {p.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
<button type="button" className="btn btn-primary m-4" onClick={()=>setupdate(true)}>Update</button>
          </div>

        </div>
      
      </div>
</>

     ) :<Updateproduct products={product} onCancel={() => setupdate(false)} /> }








    </>
  );
}
