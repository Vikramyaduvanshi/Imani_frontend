import { useNavigate } from "react-router-dom";
import "../Hero.css";
// import 

import profile from "../assets/profile.png";

export default function Hero() {
  let navigate=useNavigate()
  return (
<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">

  {/* indicators */}
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
  </div>

  <div className="carousel-inner">

    {/* PERFUMES */}
    <div className="carousel-item active">
      <img src="/imani_banner_1900x900.jpg" className="d-block w-100" alt="Luxury Perfumes" />
      <div className="carousel-caption">
        <button className="btn btn-success" onClick={()=>navigate("/")}>Shop Perfumes</button>
        <h2>Luxury Perfumes</h2>
        <p>Discover your signature scent with long-lasting premium fragrances.</p>
        
      </div>
    </div>

    {/* COSMETICS */}
    <div className="carousel-item">
      <img src="/imani_banner_1900x900.jpg" className="d-block w-100" alt="Premium Cosmetics" />
      <div className="carousel-caption">
         <button className="btn btn-success" onClick={()=>navigate("/")} >Shop Cosmetics</button>
        <h2>Premium Cosmetics</h2>
        <p>Enhance your natural beauty with high-quality makeup essentials.</p>
       
      </div>
    </div>

    {/* BEAUTY */}
    <div className="carousel-item">
      <img src="/imani_banner_1900x900.jpg" className="d-block w-100" alt="Beauty Essentials" />
      <div className="carousel-caption">
         <button className="btn btn-success" onClick={()=>navigate("/")}>Explore Beauty</button>
        <h2>Beauty Essentials</h2>
        <p>Skincare and beauty products for radiant and healthy skin.</p>
       
      </div>
    </div>

  </div>

  {/* controls */}
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>

  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>

</div>

  );
}
