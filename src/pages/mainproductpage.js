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

        // First fetch just the product data without variants
        const response = await product.get(
          `/${categorySlug}/${subCategorySlug}/${productSlug}`
        );

        if (!response.data) {
          throw new Error("Product not found");
        }

        setProductData(response.data);

        // Only handle variants if they exist and we have a variantSlug
        if (response.data.variants?.length > 0) {
          if (variantSlug) {
            // Find the variant by matching the end of the slug (SKU part)
            const variant = response.data.variants.find((v) => {
              const variantSlugEnd = v.slug.split("/").pop();
              return variantSlug.endsWith(variantSlugEnd);
            });

            if (variant) {
              setCurrentVariant(variant);
              // +1 because index 0 is for main product image
              setSelectedImageIndex(
                response.data.variants.indexOf(variant) + 1
              );
            }
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", {
          message: error.message,
          config: error.config,
          response: error.response?.data,
        });

        if (error.response?.status === 404) {
          navigate("/not-found", { replace: true });
        }
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
      // Main product selected - clear variant
      setCurrentVariant(null);
      navigate(`/${categorySlug}/${subCategorySlug}/${productSlug}`, {
        replace: true,
      });
    } else {
      // Variant selected - get the correct variant
      const selectedVariant = productData.variants[index - 1];
      if (selectedVariant?.slug) {
        setCurrentVariant(selectedVariant);
        // Use only the last part of variant slug (SKU part)
        const variantSlugPart = selectedVariant.slug.split("/").pop();
        navigate(`/${categorySlug}/${subCategorySlug}/${variantSlugPart}`, {
          replace: true,
        });
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
