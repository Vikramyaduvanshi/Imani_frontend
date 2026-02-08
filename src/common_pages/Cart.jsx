    import { useDispatch, useSelector } from "react-redux";
    import "../App.css";
    import { CheckoutSteps } from "../componets/checkout";
import { useRef, useState } from "react";
import { delefromcartslice } from "../redux/Cartslice";
import { cartdelettimer } from "../redux/cartSyncTimer";
import { useNavigate } from "react-router-dom";
import { EmptyCart } from "./Emptycart";

    export function Cart() {
    const { items } = useSelector((state) => state.cart);
   let navigate=useNavigate()
let dispatch=useDispatch()
    const discount = 0;
    const deliveryFee = 67;

    const totalProductPrice = items.reduce(
        (sum, item) => sum + item.price * item.qty,0
        
    );

const orderTotal = totalProductPrice + deliveryFee;

let callapi= useRef();
console.log(items)

function deletproduct(productId, i){
dispatch(delefromcartslice({i,productId}))

cartdelettimer(dispatch)

}

if(items.length==0){
    return < EmptyCart/>
}



    return (
        <div className="container my-4">



        {/* ===== STEPS ===== */}
    <CheckoutSteps steps={["cart", "address", "payment","summary"]} currentStep={1}/>


        <div className="row g-4">

            {/* ===== LEFT : PRODUCTS ===== */}
            <div className="col-lg-8">
            <h5 className="fw-bold mb-3">Product Details</h5>

            {items.map((item,i) => (
                <div key={item.productId} className="card mb-3 shadow-sm border-0">
                <div className="card-body">

                    <div className="d-flex gap-3">
                    <img
                        src={item.productImages[0]?.url || "https://via.placeholder.com/80"}
                        width="80"
                        height="80"
                        className="rounded border"
                        alt=""
                    />

                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                        <h6 className="fw-semibold">{item.productname}</h6>
                        <span className="text-purple fw-semibold">EDIT</span>
                        </div>

                        <div className="text-muted small">
                        Size: Free Size | Qty: {item.qty}
                        </div>

                        <div className="fw-bold mt-1">₹{item.price}</div>

                        <button className="btn btn-link p-0 text-muted" onClick={()=>deletproduct(item.productId,i)}>
                        ✕ REMOVE
                        </button>
                    </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between small text-muted">
                    <span>Sold by: Seller</span>
                    <span>Free Delivery</span>
                    </div>

                </div>
                </div>
            ))}
            </div>

            {/* ===== RIGHT : PRICE DETAILS ===== */}
            <div className="col-lg-4">
            <div className="card shadow-sm border-0">
                <div className="card-body">

                <h6 className="fw-bold mb-3">
                    Price Details ({items.length} Items)
                </h6>

                <div className="d-flex justify-content-between mb-2">
                    <span>Total Product Price</span>
                    <span>₹{totalProductPrice}</span>
                </div>

                <div className="d-flex justify-content-between text-success mb-2">
                    <span>Total Discounts</span>
                    <span>- ₹{discount}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span>Additional Fees</span>
                    <span>₹{deliveryFee}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Order Total</span>
                    <span>₹{orderTotal}</span>
                </div>

                <div className="alert alert-success small text-center">
                    🎉 Yay! Your total discount is ₹{discount}
                </div>

                <button className="btn btn-purple w-100 py-2" onClick={()=>navigate("/address")}>
                    Continue
                </button>

                <p className="text-muted small text-center mt-2">
                    Clicking on "Continue" will not deduct any money
                </p>

                </div>
            </div>
            </div>

        </div>
        </div>
    );
    }
