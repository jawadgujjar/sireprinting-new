import React, { useState } from 'react';
import './userdetail.css';

function Userdetail() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    province: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="user-detail-container">
      <h2 className="user-detail-heading">Personal Details</h2>
      <div className="user-detail-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress" className="form-label">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={userData.streetAddress}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your street address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your city"
          />
        </div>
        <div className="form-group">
          <label htmlFor="province" className="form-label">Province/State</label>
          <input
            type="text"
            id="province"
            name="province"
            value={userData.province}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your province or state"
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode" className="form-label">Zip/Postal Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={userData.zipCode}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your zip or postal code"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={userData.country}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your country"
          />
        </div>
        <button
          className="form-button"
          onClick={() => console.log('User Data:', userData)}
        >
          Save Details
        </button>
      </div>
    </div>
  );
}

export default Userdetail;