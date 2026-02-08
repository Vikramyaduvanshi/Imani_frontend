import { useEffect, useState } from "react";
import axios from "axios";

export function Updateproduct({ products }) {

  const [product, setProduct] = useState({
    productname: "",
    producttype: "perfume",
    size: "",
    description: "",
    price: "",
    category: "men",
    pricing: [{ quantity: "", price: "" }]
  });
console.log(products)
  const [existingImages, setExistingImages] = useState([]); // backend images
  const [newImages, setNewImages] = useState([]);           // file objects
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (products) {
      setProduct({
        productname: products.productname || "",
        producttype: products.producttype || "perfume",
        size: products.size || "",
        description: products.description || "",
        price: products.price || "",
        category: products.category || "men",
        pricing: products.pricing || [{ quantity: "", price: "" }]
      });

      setExistingImages(products.productImages || []);
    }
  }, [products]);

  /* ================= BASIC HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (index, field, value) => {
    const updated = [...product.pricing];
    updated[index][field] = value;
    setProduct(prev => ({ ...prev, pricing: updated }));
  };

  const addPricingRow = () => {
    setProduct(prev => ({
      ...prev,
      pricing: [...prev.pricing, { quantity: "", price: "" }]
    }));
  };

  const removePricingRow = (index) => {
    setProduct(prev => ({
      ...prev,
      pricing: prev.pricing.filter((_, i) => i !== index)
    }));
  };

  /* ================= IMAGE HANDLERS ================= */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (existingImages.length + newImages.length + files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    setNewImages(prev => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // text fields
      Object.entries(product).forEach(([key, value]) => {
        if (key !== "pricing") {
          formData.append(key, value);
        }
      });

      // pricing
      formData.append("pricing", JSON.stringify(product.pricing));

      // existing images metadata
      formData.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      // new images files
        newImages.forEach(file => {
        formData.append("productImages", file);
      });

      await axios.put(
        `https://imaani-perfumes.onrender.com/products/update-product/${products._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

console.log(formData)
      alert("Product updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">

          <h3 className="text-center fw-bold text-primary mb-4"> Update Product</h3>

          <form onSubmit={handleSubmit}>

            {/* BASIC INFO */}
            <div className="mb-4">
              <label className="form-label">Product Name</label>
              <input className="form-control"  name="productname"  value={product.productname}  onChange={handleChange}  />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Product Type</label>
                <select  className="form-select"  name="producttype"  value={product.producttype}  onChange={handleChange} >
                  <option value="perfume">Perfume</option>
                  <option value="cosmetic">Cosmetic</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select className="form-select"  name="category"  value={product.category}  onChange={handleChange} >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Description</label>
              <textarea  className="form-control"  rows="3"  name="description"  value={product.description}  onChange={handleChange} />
            </div>

            {/* PRICING */}
            <div className="mb-4">
              <h6 className="fw-bold">Pricing Variants</h6>

              {product.pricing.map((item, index) => (
                <div className="row g-2 mb-2" key={index}>
                  <div className="col">
                    <input className="form-control"   placeholder="Quantity"   value={item.quantity}   onChange={(e) =>   handlePricingChange(index, "quantity", e.target.value)  } />
                  </div>

                  <div className="col">
                    <input  className="form-control"   placeholder="Price"   value={item.price}   onChange={(e) =>  handlePricingChange(index, "price", e.target.value) } />
                  </div>

                  <div className="col-auto">
                    {product.pricing.length > 1 && ( <button   type="button"   className="btn btn-danger btn-sm"   onClick={() => removePricingRow(index)} >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button  type="button"  className="btn btn-outline-primary btn-sm"  onClick={addPricingRow}  >  + Add Pricing  </button></div>

            {/* IMAGES */}
            <div className="mb-4">
              <label className="form-label">Product Images</label>
              <input  type="file"   multiple   className="form-control"   onChange={handleImageChange}  />

              <div className="d-flex flex-wrap mt-3">
                {/* existing */}
                {existingImages.map((img, i) => (
                  <div key={i} className="position-relative m-2">
                    <img src={img.url} width="100" height="100" />
                    <button   type="button"  className="btn btn-danger btn-sm position-absolute top-0 end-0"  onClick={() => removeExistingImage(i)}
                    >✕</button>
                  </div>
                ))}

                {/* new */}
                {newImages.map((file, i) => (
                  <div key={i} className="position-relative m-2">
                    <img src={URL.createObjectURL(file)} width="100" height="100" />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeNewImage(i)}
                    >✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary px-5"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
