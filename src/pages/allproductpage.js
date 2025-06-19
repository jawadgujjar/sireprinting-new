import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Allproduct1 from "../components/allproducts/allproduct";
import Categorydescription from "../components/products/catdes";
import Benefits from "../components/products/benefits";
import Banner from "../components/landing/banner";
import Faq1 from "../components/landing/faq";
import { subcategory } from "../utils/axios"; // ← yeh tumhare axios instance se hona chahiye
import SireprintingLoader from "../components/loader/loader";

function Allproductpage(props) {
  const location = useLocation();
  const id = location.state?.id;
  console.log(props, "data of props", location);
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("No Subcategory ID found");
      return;
    }

    const fetchSubcategoryData = async () => {
      try {
        const response = await subcategory.get(`/${id}`);
        console.log(response.data, "subcate");
        setSubcategoryData(response.data);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [id]);

  if (loading) return <SireprintingLoader />;
  if (!subcategoryData) return <div>No data found</div>;

  return (
    <div>
      {/* Use subcategoryData wherever needed */}
      <Allproduct1 data={subcategoryData} />
      <Categorydescription data={subcategoryData} />
      <Benefits />
      <Banner />
      <Faq1 />
    </div>
  );
}

export default Allproductpage;
