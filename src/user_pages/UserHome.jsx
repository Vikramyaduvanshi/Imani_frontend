import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "../redux/productslice";
import "../App.css"
import { useNavigate } from "react-router-dom";
export function UserHome() {
  const dispatch = useDispatch();
  const initialMount = useRef(true);
let navigate=useNavigate()
  const { products, filteredProduct, page, searchword, } = useSelector((state) => state.Allproducts);


  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchproducts({ page, searchword }));
    }
  }, []);


  useEffect(() => {
    if (!initialMount.current && page >1) {
      dispatch(fetchproducts({ page, searchword }));
    }
    initialMount.current = false;
  }, [page]);

  const dataToRender =
    filteredProduct.length > 0 ? filteredProduct : products;

return (
  <div className="container my-4">
    {/* CSS ko yahi daal diya taaki 380px wala logic chale */}
    <style>
      {`
        @media (max-width: 380px) {
          .mobile-single-col > .col {
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
        }
      `}
    </style>

    <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mobile-single-col">
      {dataToRender.map((v, i) => {
        const {
          _id,
          productname,
          producttype,
          rating,
          size,
          price,
          productImages,
        } = v;

        const rate = rating?.rate || 0;
        const image =
          productImages?.[0]?.url || "https://via.placeholder.com/200";

        return (
          <div className="col" key={_id || i}>
            <div className="card h-100 border-0 shadow-sm rounded-4 product-card">

              {/* IMAGE */}
              <div className="position-relative bg-light rounded-top-4 overflow-hidden">
                <span className="badge bg-white text-dark position-absolute top-0 start-0 m-2 text-uppercase shadow-sm small">
                  {producttype || "Product"}
                </span>

                <span className="badge bg-white text-dark position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center gap-1 small">
                  <span className="fw-bold">{rate}</span> ⭐
                </span>

                <img
                  src={image}
                  alt={productname}
                  className="card-img-top p-3"
                  style={{
                    height: "210px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* BODY */}
              <div className="card-body pb-2">
                <h6 className="fw-semibold text-truncate mb-1">
                  {productname}
                </h6>
                <p className="text-muted small mb-2">
                  {producttype} • {size || "Standard"}
                </p>
                <h5 className="fw-bold mb-0">₹{price}</h5>
              </div>

              {/* FOOTER */}
              <div className="card-footer bg-white border-0 pt-0 pb-3">
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-10">
                    <button className="btn btn-primary w-100 rounded-pill fw-semibold" onClick={()=>navigate(`/product_details/${_id}`)}>  View Details </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  </div>
);

}
