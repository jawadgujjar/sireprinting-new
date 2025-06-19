import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Productmain1 from "../components/productmain/productmain";
import Videocarousel from "../components/landing/carouselvideo";
import Relatedproduct from "../components/productmain/relatedproduct";
import Testimonial from "../components/landing/testimonial";
import Banner from "../components/landing/banner";
import { product } from "../utils/axios";
import SireprintingLoader from "../components/loader/loader";

function Mainproductpage() {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state?.id;
  const { variantSlug, categoryTitle, subcategoryTitle, productTitle } =
    useParams();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);

  // Fetch product from API
  useEffect(() => {
    if (!id) {
      console.error("No Product ID found");
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await product.get(`/${id}`);
        setProductData(response.data);

        if (response.data.variants && response.data.variants.length > 0) {
          const foundIndex = response.data.variants.findIndex(
            (v) => v.slug === variantSlug
          );

          if (foundIndex !== -1) {
            setSelectedVariantIndex(foundIndex);
            setCurrentVariant(response.data.variants[foundIndex]);
          } else {
            setSelectedVariantIndex(0);
            setCurrentVariant(response.data.variants[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, variantSlug]);

  // Handle variant selection and update URL
  const handleImageSelect = (index) => {
    if (productData.variants && index < productData.variants.length) {
      const selected = productData.variants[index];
      setSelectedVariantIndex(index);
      setCurrentVariant(selected);
      // Update URL with selected variant slug
      navigate(
        `/${categoryTitle}/${subcategoryTitle}/${productTitle}/${selected.variantTitle.replace(
          /\s+/g,
          "-"
        )}`,
        { replace: true }
      );
    }
  };

  if (loading) return <SireprintingLoader />;
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
      <Banner />
      <Relatedproduct data={productData} />
      <Testimonial />
    </div>
  );
}

export default Mainproductpage;
