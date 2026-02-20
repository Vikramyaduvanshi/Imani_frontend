import { Route, Routes } from "react-router-dom";
import { Navbar } from "./componets/Navbar";
import { Updateprofile } from "./componets/Updateprofile";
import { Dashboard } from "./admin_pages/Dashboard";
import { Login } from "./common_pages/Login";
import { Signup } from "./common_pages/Signup";
import { PrivateRoute } from "./route/Private_route";
import { Product_Details } from "./user_pages/Product_details";
import { Cart } from "./common_pages/Cart";
import { Address } from "./common_pages/Address";
import { Paymentfunction } from "./common_pages/payment";
import { Becomesupplire } from "./common_pages/BecomeSupplire";
import { Forget_Password } from "./componets/Forgot_password";
import { Reset_password } from "./componets/Reset_password";
import RouteCleanup from "./Util/RouteCleanup";
import ProtectedHome from "./Util/ProtectedHome";
// import RouteCleanup from "./Util/RouteCleanup";
// import ProtectedHome from "./route/ProtectedHome";

function App() {

  return (
    <>
      <Navbar />
      <RouteCleanup />

      <Routes>

        {/* homepage */}
        <Route path="/" element={<ProtectedHome />} />

        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product_details/:id" element={<Product_Details />} />
        <Route path="/supplire" element={<Becomesupplire />} />
        <Route path="/forget_password" element={<Forget_Password />} />
        <Route path="/Reset_password" element={<Reset_password />} />

        {/* private */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<Updateprofile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Paymentfunction />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;