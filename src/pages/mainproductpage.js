import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Productmain1 from "../components/productmain/productmain";
import ProductSpecs from "../components/productmain/productspecs";
import Videocarousel from "../components/landing/carouselvideo";
import Relatedproduct from "../components/productmain/relatedproduct";
import Relatedblogs from "../components/productmain/relatedblogs";
import Testimonial from "../components/landing/testimonial";
import Banner from "../components/landing/banner";
import Categorydescription from "../components/products/catdes";
import { product } from "../utils/axios";

function Mainproductpage() {
  const location = useLocation();
  const id = location.state?.id;

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("No Product ID found");
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await product.get(`/${id}`);
        console.log(response.data, "product");
        setProductData(response.data);
        // Set first variant as default
        if (response.data.variants && response.data.variants.length > 0) {
          setCurrentVariant(response.data.variants[0]);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Handle image selection to change variant
  const handleImageSelect = (index) => {
    if (productData.variants && index < productData.variants.length) {
      setSelectedVariantIndex(index);
      setCurrentVariant(productData.variants[index]);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!productData) return <div>No product data found</div>;

  return (
    <div>
      <Productmain1
        data={productData}
        currentVariant={currentVariant}
        onImageSelect={handleImageSelect}
        selectedVariantIndex={selectedVariantIndex}
      />
      <Videocarousel />
      <ProductSpecs data={productData} currentVariant={currentVariant} />
      <Banner />
      <Categorydescription data={productData} />
      <Relatedproduct data={productData} />
      {/* <Relatedblogs/> */}
      <Testimonial />
    </div>
  );
}

export default Mainproductpage;
