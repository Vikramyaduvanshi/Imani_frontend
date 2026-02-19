import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearfiltered, fetchproducts, setarr, setprice } from "../redux/productslice";
import "../App.css"
import "../Hero.css"

import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router-dom";
import Hero from "../componets/Hero_banner";
export function UserHome() {
 const [filters, setFilters] = useState({
  gender: [],
  category: [],
  price: 5000,
  rating: 5
});




  const dispatch = useDispatch();
  const initialMount = useRef(true);
let navigate=useNavigate()
  const { products, filteredProduct, page, searchword,filterarr, maxprice } = useSelector((state) => state.Allproducts);


  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchproducts({ page, searchword }));
    }
  }, []);

  useEffect(()=>{
 
      if ((filterarr.length>0 && products.length !== 0) || (maxprice !==5000 && products.length !== 0 )) {
      dispatch(fetchproducts({ category:filters.gender[0] , producttype:filters.category[0] , maxprice}));
    }
      else{
     dispatch(clearfiltered())
    }

console.log("filter in userhome", filters)
  },[filterarr,maxprice])

  useEffect(() => {
    if (!initialMount.current && page >1) {
      dispatch(fetchproducts({ page, searchword }));
    }
    initialMount.current = false;
  }, [page]);

  const dataToRender =
    filteredProduct.length > 0 ? filteredProduct : products;

function remove(v){
dispatch(setarr(v))
  setFilters(prev => {

    let newState = {...prev};

    Object.keys(newState).forEach(key => {

      // checkbox arrays
      if(Array.isArray(newState[key])){
        newState[key] = newState[key].filter(item => item !== v);
      }

      // price remove
      if(key === "price" && v === `Under ₹${prev.price}`){
        newState.price = 5000;
      }

      // rating remove
      if(key === "rating" && v === `${prev.rating}⭐ & up`){
        newState.rating = 0;
      }

    });

    return newState;
  });

}
let priceref=useRef()
function handleaddfilter(e){
  const {name, value, type, checked} = e.target;

// console.log(value,"value in handlefilter")
  setFilters(prev => {

    // CHECKBOX
    if(type === "checkbox"){
      let updated = prev[name] || [];
dispatch(setarr(value))
      if(checked){
        if(!updated.includes(value)){
          updated = [...updated, value];
        }
      }else{
        updated = updated.filter(v => v !== value);
      }


      return { ...prev, [name]: updated };
    }

    // RANGE (convert to number)
    if(priceref.current){
      clearTimeout(priceref.current)
    }
    priceref.current=setTimeout(()=>{
      dispatch(setprice(value))
     
    },1000)
    console.log("price product ", name, value)


    
     return { ...prev, [name]: Number(value) };
  });
}
const filteredProducts = useMemo(()=>{

  if(!products || !Array.isArray(products)) return [];

  return products.filter(p => {

    const gender   = p.gender?.toLowerCase();
    const category = p.category?.toLowerCase();
    const price    = Number(p.price);
    const rating   = Number(p.rating);

    if(filters.gender.length && !filters.gender.includes(gender))
      return false;

    if(filters.category.length && !filters.category.includes(category))
      return false;

    if(price > filters.price)
      return false;

    if(rating < filters.rating)
      return false;

    return true;
  });

},[products, filters]);

 
return (
 <>
 
<Helmet>

    {/* Primary SEO */}
    <title>Imaani Perfumes | Luxury Perfumes & Cosmetics Online</title>

    <meta
      name="description"
      content="Buy premium perfumes and cosmetics online. Discover long-lasting luxury fragrances for men and women at best prices."
    />

    <meta
      name="keywords"
      content="perfumes, cosmetics, luxury perfumes, fragrance shop, long lasting perfume, buy perfume online south africa"
    />

    <meta name="author" content="Imaani Perfumes" />

    {/* Open Graph (WhatsApp / Facebook sharing) */}
    <meta property="og:title" content="Imaani Perfumes | Luxury Fragrances" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://imaaniperfumes.com" />
    <meta
      property="og:description"
      content="Premium perfumes and cosmetics store. Shop luxury fragrances online."
    />
    <meta property="og:image" content="https://imaaniperfumes.com/preview.jpg" />

    {/* Twitter preview */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Imaani Perfumes" />
    <meta
      name="twitter:description"
      content="Luxury perfumes and beauty products online."
    />
    <meta name="twitter:image" content="https://imaaniperfumes.com/preview.jpg" />

    {/* Canonical */}
    <link rel="canonical" href="https://imaaniperfumes.com/" />

    {/* Structured Data (Google Rich Results) */}
    <script type="application/ld+json">
      {`
      {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Imaani Perfumes",
        "url": "https://imaaniperfumes.com",
        "description": "Luxury perfumes and cosmetics store",
        "logo": "https://imaaniperfumes.com/logo.png"
      }
      `}
    </script>

  </Helmet>


{/* <Hero/> */}


<section className="mainsection">
<section className="btn-section">
<button type="button" style={{backgroundColor:"#2e8541d2", color:"white"}}
  className="mobile-filter-btn"
  data-bs-toggle="modal"
  data-bs-target="#filterModal"
>
  <img src="/filter (1).png" alt="filter" height="20" width="20" style={{margin:"2px"}}/>
  <span>Filter</span>
</button>



<ul className="active-filters">
{ [...filters.gender, ...filters.category].length==0 ? " No filters applied — explore freely ":
  [...filters.gender, ...filters.category].map((v,i)=>(
    <li key={i} onClick={()=>remove(v)}> {v}</li>

  )) 
}
</ul>

<div className="sort">
  <select name="Price" id="price" value="">
  <option value="">price</option>
  <option value="High to low">High to low</option>
  <option value="Low to hight">Low to hight</option>
</select>
  <select name="Price" id="price" value="">
  <option value="">rating</option>
  <option value="High to low">High to low</option>
  <option value="Low to hight">Low to hight</option>
</select>

</div>

</section>

<section className="advanced_search">

<div className="box-1">
  <h5>Gender:</h5>

  <div className="filter-item">
    <input type="checkbox" id="men" name="gender" value="men" onChange={handleaddfilter} checked={filters.gender.includes("men")} />
    <label htmlFor="men">Men</label>
  </div>

  <div className="filter-item">
    <input type="checkbox" id="women" name="gender" value="women" onChange={handleaddfilter} checked={filters.gender.includes("women")}/>
    <label htmlFor="women">Women</label>
  </div>

  <div className="filter-item">
    <input type="checkbox" id="unisex" name="gender" value="unisex" onChange={handleaddfilter} checked={filters.gender.includes("unisex")}/>
    <label htmlFor="unisex">Unisex</label>
  </div>
</div>

{/* CATEGORY */}
<div className="box-2">
  <h5>Category:</h5>

  <div className="filter-item">
    <input type="checkbox" id="perfumes" name="category" value="Perfume" onChange={handleaddfilter} checked={filters.category.includes("Perfume")}/>
    <label htmlFor="Perfume">Perfumes</label>
  </div>

  <div className="filter-item">
    <input type="checkbox" id="cosmetic" name="category" value="Cosmetic" onChange={handleaddfilter} checked={filters.category.includes("Cosmetic")}/>
    <label htmlFor="cosmetic">Cosmetic</label>
  </div>

  <div className="filter-item">
    <input type="checkbox" id="bodycare" name="category" value="Body Care" onChange={handleaddfilter} checked={filters.category.includes("Body Care")}/>
    <label htmlFor="bodycare">Body Care</label>
  </div>
</div>


{/* PRICE */}
<div className="box-3">
  <h5>Price: </h5>
  <div className="range-wrapper">
    <input type="range" name="price" id="price" min="100" max="5000"  value={filters.price}  onChange={handleaddfilter}/>
    <div className="range-labels">
      <span>₹100  -  </span>
      <span>  ₹{filters.price}</span>
    </div>
  </div>
</div>


{/* RATING */}
<div className="box-4">
  <h5>Rating:</h5>
  <div className="range-wrapper">
    <input type="range" name="rating" id="rating" min="0" max="5" value={filters.rating} step="0.5" onChange={ handleaddfilter}/>
    <div className="range-labels">
      <span>0 ⭐ - </span>
      <span> {filters.rating} ⭐</span>
    </div>
  </div>
</div>






</section>



  
 
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
 
</section>

<div
  className="modal fade"
  id="filterModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
    <div className="modal-content mobile-filter-modal">

      {/* HEADER */}
      <div className="modal-header">
        <h5 className="modal-title">Filters</h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      {/* BODY */}
      <div className="modal-body">

        <section className="advanced_search_modal">

          {/* GENDER */}
          <div className="box-1">
            <h5>Gender</h5>

            {["men","women","unisex"].map(g => (
              <div className="filter-item" key={g}>
                <input
                  type="checkbox"
                  id={g}
                  name="gender"
                  value={g}
                  onChange={handleaddfilter}
                  checked={filters.gender.includes(g)}
                />
                <label htmlFor={g}>{g}</label>
              </div>
            ))}
          </div>

          {/* CATEGORY */}
          <div className="box-2">
            <h5>Category</h5>

            {["Perfumes","Cosmetic","Body Care"].map(c => (
              <div className="filter-item" key={c}>
                <input
                  type="checkbox"
                  id={c}
                  name="category"
                  value={c}
                  onChange={handleaddfilter}
                  checked={filters.category.includes(c)}
                />
                <label htmlFor={c}>{c}</label>
              </div>
            ))}
          </div>

          {/* PRICE */}
          <div className="box-3">
            <h5>Price</h5>

            <input
              type="range"
              name="price"
              min="100"
              max="5000"
              value={filters.price}
              onChange={handleaddfilter}
            />

            <div className="range-labels">
              ₹100 — ₹{filters.price}
            </div>
          </div>

          {/* RATING */}
          <div className="box-4">
            <h5>Rating</h5>

            <input
              type="range"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              value={filters.rating}
              onChange={handleaddfilter}
            />

            <div className="range-labels">
              {filters.rating} ⭐ & above
            </div>
          </div>

        </section>

      </div>

      {/* FOOTER */}
      <div className="modal-footer mobile-filter-footer">
        <button
          className="apply-btn"
          data-bs-dismiss="modal"
        >
          Apply Filters
        </button>
      </div>

    </div>
  </div>
</div>


 </>
);

}
