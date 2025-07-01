import React from "react";
import "./brands.css";

function Brands() {
  return (
    <div className="container-main">
      <div className="brand-images">
        <img
          src="/images/Johnny_Slicks.png"
          alt="Johnny_Slicks"
          style={{ width: "22%" }}
        />
        <img src="/images/Yumis.png" alt="Yumis" style={{ width: "22%" }} />
        <img
          src="/images/Blazin_Vapourz.png"
          alt="Blazin_Vapourz"
          style={{ marginLeft: "-2rem" }}
        />
        <img src="/images/Eden_Farm_Hulleys.png" alt="Eden_Farm_Hulleys" />
        <img src="/images/British_CBD_Company.png" alt="British_CBD_Company" />
      </div>
    </div>
  );
}

export default Brands;
