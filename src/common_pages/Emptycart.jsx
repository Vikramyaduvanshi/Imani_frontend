import { useNavigate } from "react-router-dom";
import emptycart from "../assets/emptycart.webp"; // optional illustration
import "../Signup.css"
export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-8 col-lg-6 text-center">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4">

            {/* Image */}
            <img
              src={emptycart}
              alt="Empty Cart"
              className="img-fluid mb-4"
              style={{ maxHeight: "220px" }}
            />

            {/* Text */}
            <h3 className="fw-bold mb-2">Your Cart is Empty</h3>
            <p className="text-muted mb-4">
              Looks like you haven’t added anything to your cart yet.
              Start shopping to fill it with amazing products!
            </p>

            {/* Button */}
            <button
              className="btn btn-primary px-5 py-2 rounded-pill"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
