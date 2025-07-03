import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Videocarousel from "../components/landing/carouselvideo";
import Relatedproduct from "../components/productmain/relatedproduct";
import Productmain1 from "../components/productmain/productmain";
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
  const [currentVariant, setCurrentVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await product.get(
          `/${categorySlug}/${subCategorySlug}/${productSlug}`
        );

        if (!response.data) throw new Error("Product not found");
        setProductData(response.data);

        if (response.data.variants?.length > 0 && variantSlug) {
          // CHANGE HERE: Match by last part of slug
          const variant = response.data.variants.find((v) => {
            const variantLastPart = v.slug.split("/").pop();
            return variantLastPart === variantSlug;
          });

          if (variant) {
            setCurrentVariant(variant);
            setSelectedImageIndex(response.data.variants.indexOf(variant) + 1);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response?.status === 404)
          navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [categorySlug, subCategorySlug, productSlug, variantSlug, navigate]);

  const handleImageSelect = (index) => {
    if (!productData?.variants) return;

    setSelectedImageIndex(index);

    if (index === 0) {
      setCurrentVariant(null);
      navigate(`/${categorySlug}/${subCategorySlug}/${productSlug}`, {
        replace: true,
      });
    } else {
      const selectedVariant = productData.variants[index - 1];
      if (selectedVariant?.slug) {
        setCurrentVariant(selectedVariant);

        // NEW: Get only the last part of slug for URL
        const lastSlugPart = selectedVariant.slug.split("/").pop();

        navigate(
          `/${categorySlug}/${subCategorySlug}/${productSlug}/${lastSlugPart}`,
          { replace: true }
        );
      }
    }
  };

  if (loading) return <SireprintingLoader />;
  if (!productData) return <div>Product not found</div>;

  return (
    <div>
      <Productmain1
        data={productData}
        currentVariant={currentVariant}
        onImageSelect={handleImageSelect}
        selectedImageIndex={selectedImageIndex}
      />
      <Videocarousel />
      <Banner />
      <Relatedproduct data={productData} />
      <Testimonial />
    </div>
  );
}

export default Mainproductpage;
