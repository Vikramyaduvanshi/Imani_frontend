import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "../index.css"
import { addToCart } from "../redux/Cartslice"
import { startCartSyncTimer } from "../redux/cartSyncTimer"
import { Authcontext } from "../context/Authcontext"

export function Product_Details() {
  const { products, filteredProduct } = useSelector((state) => state.Allproducts)
  const { id } = useParams()
  let navigate=useNavigate()
  let {user}=useContext(Authcontext)
  const [productData, setProductData] = useState(null)
  const [displayPrice, setDisplayPrice] = useState(null)
  const [selectedPricingId, setSelectedPricingId] = useState(null)
  const [mainImage, setMainImage] = useState("")
let qty= useRef(1)
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if(user){
      dispatch(
      addToCart({
        productId: id,
        price:displayPrice,
        quantity: qty.current,
      })
    );
    // 🔥 1 min debounce batch sync
    console.log({
        productId: id,
        price:displayPrice,
        quantity: qty.current,
      })
  startCartSyncTimer(dispatch);
    }else{
      navigate("/login")
    }
  };

  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://imaani-perfumes.onrender.com/products/product/${id}`)
        const item = res.data.product
        setProductData(item)
        setDisplayPrice(item.price) // Default Price
        setMainImage(item.productImages[0]?.url)
      } catch (err) { console.log(err) }
    }

    if (products.length === 0 && filteredProduct.length === 0) {
      fetchData()
    } else {
      const source = filteredProduct.length !== 0 ? filteredProduct : products
      const found = source.find(p => p._id === id)
      if (found) {
        setProductData(found)
        setDisplayPrice(found.price)
        setMainImage(found.productImages[0]?.url)
      }
    }
  }, [id, products, filteredProduct])

  const handlePricingSelect = (item) => {
    if (selectedPricingId === item._id) {
      qty.current=1
      setSelectedPricingId(null)
      setDisplayPrice(productData.price)

    } else {
      setSelectedPricingId(item._id)
      setDisplayPrice(item.price)
      qty.current=item.quantity
    }
  }

  if (!productData) return <div className="loader">Loading...</div>

  return (
    <div className="product-container">
      <div className="product-layout">
        
        {/* Left Section: Image Gallery */}
        <div className="image-section">
          <div className="gallery-wrapper">
            {/* Main Image */}
            <div className="main-image-container">
              <img src={mainImage} alt="Main" className="main-img" />
            </div>

            {/* Responsive Thumbnails (Desktop: Vertical, Mobile: Horizontal) */}
            <div className="thumbnail-gallery">
              {productData.productImages.map((img, i) => (
                <div 
                  key={i} 
                  className={`thumb-item ${mainImage === img.url ? 'active-thumb' : ''}`}
                  onClick={() => setMainImage(img.url)}
                >
                  <img src={img.url} alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Buttons for Mobile / Normal for Desktop */}
          <div className="button-group">
            <button className="btn-add-cart" onClick={()=> handleAddToCart()}>Add to Cart</button>
            <button className="btn-buy-now">Buy Now</button>
          </div>
        </div>

        {/* Right Section: Product Content */}
        <div className="content-section">
          <h1 className="prod-name">{productData.productname}</h1>
          <div className="rating-badge">
            <span>{productData.rating?.rate} ★</span>
            <small>{productData.rating?.count} Ratings</small>
          </div>

          <div className="price-tag">
            <span className="current-price">₹{displayPrice}</span>
            <span className="original-price">₹{displayPrice + 150}</span>
            <span className="discount-text">Special Price</span>
          </div>

          {/* Pricing Offers (Combo Selection) */}
          <div className="combo-section">
            <p className="section-title">Available Combo/Quantity Offers</p>
            <div className="combo-grid">
              {productData.pricing.map((item) => (
                <div 
                  key={item._id}
                  className={`combo-card ${selectedPricingId === item._id ? 'selected' : ''}`}
                  onClick={() => handlePricingSelect(item)}
                >
                  <span className="qty">Qty: {item.quantity}</span>
                  <span className="amt">₹{item.price}</span>
                </div>
              ))}
            </div>
            <p className="logic-note">
              {selectedPricingId ? "*Combo price applied" : "*Default individual price applied"}
            </p>
          </div>

          <div className="highlights-box">
            <p className="section-title">Highlights</p>
            <ul>
              <li>Category: {productData.category}</li>
              <li>Size: {productData.size}ml</li>
              <li>{productData.description}</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}