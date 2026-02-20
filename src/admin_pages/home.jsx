import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteproduct, fetchproducts, setpage } from "../redux/productslice"
import Loader from "../componets/loader"
import "../App.css"
// import ProductForm from "./Create_product"
import { AdminPrdetails } from "./Adminprdetails"
import axios from "axios"
import default_prfume from "../assets/default_prfume.png"
import { api } from "../Util/API"
export function Home(){
  let loader=useRef()
  let [load,setload]=useState(false)
    let dispatch=useDispatch()
let {loading,products,err,filteredProduct,searchword,page,hashmore}= useSelector((state)=>state.Allproducts)
// console.log("home page", products)
let [selectproduct,setselectproduct]=useState(null)
const isInitialMount = useRef(true);

useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;

    if (products.length === 0) {
      dispatch(fetchproducts({ searchword, page }));
    }
    return;
  }

  if (page >= 2) {
    dispatch(fetchproducts({ searchword, page }));
  }
}, [page]);

useEffect(()=>{
let obserber= new IntersectionObserver(([entry])=>{
if(hashmore && entry.isIntersecting){
  dispatch(setpage(1))
}

},
{ 
  threshold:1
}


)
  const currentLoader = loader.current;
  if (currentLoader) {
    obserber.observe(currentLoader);
  }

  return () => {
    if (currentLoader) {
      obserber.unobserve(currentLoader);
    }
  };


},[hashmore])


async function Deletproduct(id){
  setload(id)
  console.log(id)
let product = await axios.delete(`${api}/products/delete-product/${id}`,{ withCredentials: true}
)

let res= await product.data
setload(null)
if(res.success){
//  dispatch(fetchproducts({ searchword, page }));
dispatch(deleteproduct(id))
alert(res.message)
}else{
  alert(res.message)
}

}





if(loading){
return (
    <>
<Loader loading={loading} message="product is loading please wait"/>
    </>
)
}

let renderproduct=[]
renderproduct = filteredProduct.length>0 ? filteredProduct : products

    return (

<>

<div className="container py-5">
{/* <ProductForm/> */}



<div className="row g-3 px-2"> {/* g-3 gap thoda kam kiya hai spacing ke liye */}
  {renderproduct.map((product) => {
    const { category, description, price, productImages = [], productname, producttype, rating, size, specialpramotion, _id } = product;

    const imageUrl = productImages.length > 0 
      ? productImages[0].url 
      : `${default_prfume}`;

    return (
        <div className="col-xl-3 col-lg-4 col-md-6" key={_id}>
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-all product-card-hover bg-white">
            
            {/* IMAGE SECTION - Reduced height from 280px to 220px for compactness */}
            <div className="position-relative overflow-hidden" style={{ height: "220px", backgroundColor: "#f9f9f9" }}>
              <img
                src={imageUrl}
                alt={productname}
                className="w-100 h-100 transition-transform duration-500 hover-zoom"
                style={{ 
                  objectFit: "contain", 
                  padding: "15px" 
                }}
              />
              
              {/* BADGES - Made smaller and sleeker */}
              <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1">
                <span className="badge glass-badge text-dark fw-bold text-uppercase border-0" style={{ fontSize: '0.65rem' }}>
                  {category}
                </span>
                {specialpramotion && (
                  <span className="badge bg-danger rounded-pill shadow-sm fw-bold" style={{ fontSize: '0.65rem' }}>
                    SALE
                  </span>
                )}
              </div>

              {rating?.rate && (
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-white text-dark rounded-pill px-2 py-1 shadow-sm d-flex align-items-center border small fw-bold" style={{ fontSize: '0.7rem' }}>
                    <span className="text-warning me-1">★</span> {rating.rate}
                  </span>
                </div>
              )}
            </div>

            {/* CONTENT BODY - Reduced padding from p-4 to p-3 */}
            <div className="card-body p-3 d-flex flex-column">
              <div className="mb-2">
                <h6 className="fw-bold text-dark mb-0 text-truncate" title={productname}>
                  {productname}
                </h6>
                <div className="text-muted py-3" style={{ fontSize: '0.75rem' }}>
                  <span className="text-uppercase fw-semibold">{producttype}</span>
                  <span className="mx-1">•</span>
                  <span>{size}</span>
                </div>
              </div>

              {/* DESCRIPTION - Reduced margin and tightened text */}
              <p className="text-secondary small mb-3 line-clamp-2" style={{ fontSize: '0.8rem', minHeight: '2.4em', lineHeight: '1.4' }}>
                {description}
              </p>

              {/* PRICE & ACTIONS - More compact layout */}
              <div className="mt-auto pt-2 border-top">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-dark" style={{ fontSize: '1.2rem' }}>
                    ₹{price}
                  </span>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary flex-grow-1 rounded-3 fw-bold py-1 shadow-sm transition-all"
                    style={{ fontSize: '0.85rem' }}
                    data-bs-toggle="modal"
                    data-bs-target="#productdetails"
                    onClick={() => setselectproduct(product)}
                  >
                    View / Update
                  </button>
                  
                  <button
                    className="btn btn-light text-danger rounded-3 px-2 border-0 shadow-sm"
                    onClick={() => Deletproduct(_id)}
                    disabled={load === _id}
                  >
                    {load === _id ? (
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                    ) : (
                      <i className="bi bi-trash"> </i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  })}
</div>


<div ref={loader} style={{ textAlign: "center", margin: "1rem" }}>
{loading ? "loading please wait":"No more data available"}
      </div>

{/* //producdetails */}


 


<div className="modal fade" id="productdetails" tabIndex="-1">
  <div className="modal-dialog modal-xl modal-dialog-scrollable">
    <div className="modal-content">

      <div className="modal-header">

         <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setselectproduct(null)}></button>
      </div>

      <div className="modal-body p-0">
        {/* <ProductForm /> */}
 {selectproduct &&  <AdminPrdetails product={selectproduct}/>}
      </div>

    </div>
  </div>
</div>


</div>





</>

    )
}



