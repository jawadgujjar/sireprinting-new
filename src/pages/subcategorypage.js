import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Subcategory from "../components/products/subcategory";
import Sireadvantage from "../components/landing/sireadvantage";
import Faq1 from "../components/landing/faq";
import Subcategoryhead from "../components/products/subcategoryhead";
import Categorydescription from "../components/products/catdes";
import Banner from "../components/landing/banner";
import { category } from "../utils/axios";
import SireprintingLoader from "../components/loader/loader";

function Subcategorypage() {
  const location = useLocation();
  const { slug } = useParams();
  const fallbackId = location.state?.id;
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        let response;

        if (fallbackId) {
          // Case: ID came via state
          response = await category.get(`/${fallbackId}`);
        } else {
          // Case: fallback - fetch by slug
          response = await category.get(`/slug/${slug}`);
        }

        setCategoryData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug, fallbackId]);

  if (loading) return <SireprintingLoader />;
  if (!categoryData) return <div>No data found</div>;

  return (
    <div>
      <Subcategoryhead data={categoryData} />
      <Subcategory data={categoryData} />
      <Sireadvantage />
      <Banner />
      <Categorydescription data={categoryData} />
      <Faq1 data={categoryData} />
    </div>
  );
}

export default Subcategorypage;
