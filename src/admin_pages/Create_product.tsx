import { useState } from "react";
import axios from "axios";
import "../App.css"
import { api } from "../Util/API";
import { useDispatch } from "react-redux";
import { fetchproducts, setprcreated } from "../redux/productslice";
export default function ProductForm() {
  const [product, setProduct] = useState({
    productname: "",
    producttype: "perfume",
    size: "",
    description: "",
    price: "",
    category: "men",
    pricing: [{ quantity: "", price: "" }]
  });
  let dispatch=useDispatch()

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePricingChange = (index, field, value) => {
    const updatedPricing = [...product.pricing];
    updatedPricing[index][field] = value;
    setProduct({ ...product, pricing: updatedPricing });
  };

  const addPricingRow = () => {
    setProduct({
      ...product,
      pricing: [...product.pricing, { quantity: "", price: "" }]
    });
  };

  const removePricingRow = (index) => {
    const updatedPricing = product.pricing.filter((_, i) => i !== index);
    setProduct({ ...product, pricing: updatedPricing });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(Object.entries(e.target.files))
    console.log(e.target.files)
    console.log(files)
    
    if (images.length + files.length > 10) {
      alert("You can upload a maximum of 10 images");
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
console.log(product,images)
    try {
      const formData = new FormData();

      ["productname", "producttype", "size", "description", "price", "category"].forEach(key => {
        formData.append(key, product[key]);
      });


      
      formData.append("pricing", JSON.stringify(product.pricing));

      images.forEach(img => formData.append("productImages", img));
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}

 let res=     await axios.post(
        `${api}/products/create-products`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
let createdpr= await res.data
if(createdpr.success){
dispatch(setprcreated(createdpr.product))
}
      console.log("created product ", createdpr)
      alert("Product created successfully");
      // Reset form
      setProduct({
        productname: "",
        producttype: "perfume",
        size: "",
        description: "",
        price: "",
        category: "men",
        pricing: [{ quantity: "", price: "" }]
      });
      setImages([]);
      
    } catch (err) {
      console.error(err);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };



return (
  <div className="container">
    <div className="card border-0 shadow-lg product-card">
      <div className="card-body  p-md-5">

     

        <form onSubmit={handleSubmit}>

          {/* BASIC INFO */}
          <div className="section-box mb-4">
            <h5 className="section-title">Basic Information</h5>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  className="form-control form-control-lg"
                  name="productname"
                  value={product.productname}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Product Type</label>
                <select
                  className="form-select form-select-lg"
                  name="producttype"
                  value={product.producttype}
                  onChange={handleChange}
                >
                  <option value="perfume">Perfume</option>
                  <option value="cosmetic">Cosmetic</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Size</label>
                <input
                  className="form-control"
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label">Base Price</label>
                <input
                  className="form-control"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="section-box mb-4">
            <h5 className="section-title">Pricing Variants</h5>

            {product.pricing.map((item, index) => (
              <div className="row g-2 align-items-center mb-2" key={index}>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handlePricingChange(index, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handlePricingChange(index, "price", e.target.value)
                    }
                  />
                </div>
                <div className="col-auto">
                  {product.pricing.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removePricingRow(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-primary btn-sm mt-2"
              onClick={addPricingRow}
            >
              + Add Pricing
            </button>
          </div>

          {/* IMAGES */}
          <div className="section-box mb-4">
            <h5 className="section-title">Product Images</h5>

            <input
              type="file"
              multiple
              className="form-control"
              onChange={handleImageChange}
            />

            <div className="d-flex flex-wrap mt-3">
              {images.map((img, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <div className="text-center">
            <button
              className="btn btn-primary btn-lg px-5"
              disabled={loading}
            >
              {loading ? "Saving..." : "Create Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);

}
