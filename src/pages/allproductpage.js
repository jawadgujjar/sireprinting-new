import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Allproduct1 from "../components/allproducts/allproduct";
import Categorydescription from "../components/products/catdes";
import Benefits from "../components/products/benefits";
import Banner from "../components/landing/banner";
import Faq1 from "../components/landing/faq";
import { subcategory } from "../utils/axios";
import SireprintingLoader from "../components/loader/loader";

function Allproductpage() {
  const { categorySlug, subCategorySlug } = useParams(); // ← Get from URL
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        const response = await subcategory.get(
          `/${categorySlug}/${subCategorySlug}`
        );
        setSubcategoryData(response.data);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [categorySlug, subCategorySlug]);

  if (loading) return <SireprintingLoader />;
  if (!subcategoryData) return <div>No data found</div>;

  return (
    <div>
      <Allproduct1 data={subcategoryData} />
      <Categorydescription data={subcategoryData} />
      <Benefits />
      <Banner />
      <Faq1 />
    </div>
  );
}

export default Allproductpage;
