import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Productmain1 from "../components/productmain/productmain";
import Videocarousel from "../components/landing/carouselvideo";
import Relatedproduct from "../components/productmain/relatedproduct";
import Testimonial from "../components/landing/testimonial";
import Banner from "../components/landing/banner";
import { product } from "../utils/axios";
import SireprintingLoader from "../components/loader/loader";

function Mainproductpage() {
  const navigate = useNavigate();
  const { categorySlug, subCategorySlug, productSlug, variantSlug } =
    useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);

  // Fetch product by slug
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        // Construct full slug
        const fullSlug = `${categorySlug}/${subCategorySlug}/${productSlug}`;
        console.log("Fetching product with slug:", fullSlug);

        // Fetch product directly using the working endpoint
        const response = await product.get(`/${productSlug}`);
        const product = response.data;
        console.log("Product Response:", product);
        if (!product) {
          throw new Error("Product not found");
        }

        setProductData(product); // Corrected from set குறிப்பான தயாரிப்பு

        // Handle variants
        if (product.variants && product.variants.length > 0) {
          let variantIndex = 0;
          if (variantSlug) {
            const foundIndex = product.variants.findIndex(
              (v) => v.slug === variantSlug
            );
            if (foundIndex !== -1) {
              variantIndex = foundIndex;
            }
          }

          setSelectedVariantIndex(variantIndex);
          setCurrentVariant(product.variants[variantIndex]);

          if (!variantSlug && product.variants[0]?.slug) {
            navigate(
              `/${categorySlug}/${subCategorySlug}/${productSlug}/${product.variants[0].slug}`,
              { replace: true }
            );
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [categorySlug, subCategorySlug, productSlug, variantSlug, navigate]);

  const handleVariantChange = (index) => {
    if (productData?.variants && index < productData.variants.length) {
      const selected = productData.variants[index];
      setSelectedVariantIndex(index);
      setCurrentVariant(selected);
      navigate(
        `/${categorySlug}/${subCategorySlug}/${productSlug}/${selected.slug}`,
        { replace: true }
      );
    }
  };

  if (loading) return <SireprintingLoader />;
  if (!productData) return <div>Product not found</div>;

  return (
    <div>
      <Productmain1
        data={productData}
        currentVariant={currentVariant}
        onVariantChange={handleVariantChange}
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
