import React, { useState } from 'react';
import './sampleform.css';

function Sampleform() {
  const [formData, setFormData] = useState({
    productType: '',
    quantity: '',
    material: '',
    length: '',
    width: '',
    height: '',
    color: '',
    finish: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h1>REQUEST A QUOTE</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Product Specifications</h2>
          
          <div className="form-group">
            <label>PRODUCT TYPE</label>
            <select 
              name="productType" 
              value={formData.productType} 
              onChange={handleChange}
              required
            >
              <option value="">Select product</option>
              <option value="random sample">Random Sample</option>
              <option value="custom sample">Custom Sample</option>
              <option value="premium sample">Premium Sample</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>QUANTITY</label>
            <input 
              type="number" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange}
              placeholder="e.g. 1000"
              required
            />
          </div>
          
          <div className="form-group">
            <label>MATERIAL</label>
            <select 
              name="material" 
              value={formData.material} 
              onChange={handleChange}
              required
            >
              <option value="">Select material</option>
              <option value="plastic">Plastic</option>
              <option value="metal">Metal</option>
              <option value="wood">Wood</option>
              <option value="fabric">Fabric</option>
            </select>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Dimensions</h2>
          
          <div className="form-group">
            <label>LENGTH (in)</label>
            <input 
              type="number" 
              name="length" 
              value={formData.length} 
              onChange={handleChange}
              placeholder="Length in inches"
              required
            />
          </div>
          
          <div className="form-group">
            <label>WIDTH (in)</label>
            <input 
              type="number" 
              name="width" 
              value={formData.width} 
              onChange={handleChange}
              placeholder="Width in inches"
              required
            />
          </div>
          
          <div className="form-group">
            <label>HEIGHT (in)</label>
            <input 
              type="number" 
              name="height" 
              value={formData.height} 
              onChange={handleChange}
              placeholder="Height in inches"
              required
            />
          </div>
        </div>
        
        <div className="form-section">
          <h2>Design Details</h2>
          
          <div className="form-group">
            <label>COLOR</label>
            <select 
              name="color" 
              value={formData.color} 
              onChange={handleChange}
              required
            >
              <option value="">Select color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>FINISH</label>
            <select 
              name="finish" 
              value={formData.finish} 
              onChange={handleChange}
              required
            >
              <option value="">Select finish</option>
              <option value="matte">Matte</option>
              <option value="glossy">Glossy</option>
              <option value="textured">Textured</option>
            </select>
          </div>
        </div>
        
        <div className="form-section">
          <div className="form-group">
            <label>UPLOAD IMAGE (Optional)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
          </div>
        </div>
        
        <button type="submit" className="submit-btn">REQUEST QUOTE</button>
      </form>
    </div>
  );
}

export default Sampleform;