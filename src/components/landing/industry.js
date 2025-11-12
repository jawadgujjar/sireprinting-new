import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./industry.css";
import { subcategory, category } from "../../utils/axios"; // Import category API
import SireprintingLoader from "../loader/loader";
import { slugify } from "../../utils/slugify";
import he from "he";

const Industry = () => {
  const [activeTab, setActiveTab] = useState("customBoxes");
  const [customBoxes, setCustomBoxes] = useState([]);
  const [boxesByStyle, setBoxesByStyle] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories and subcategories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First fetch all categories
        const categoriesResponse = await category.get("/");
        const allCategories = categoriesResponse.data;

        // Find category IDs by name
        const customBoxesCategory = allCategories.find(
          (cat) => slugify(cat.title) === slugify("Packaging Boxes-")
        );

        const boxesByStyleCategory = allCategories.find(
          (cat) => slugify(cat.title) === slugify("Packaging Styles")
        );
        // Fetch subcategories for found categories
        if (customBoxesCategory) {
          console.log(customBoxesCategory);
          const customBoxesResponse = await subcategory.get(
            `/category/${customBoxesCategory._id}`
          );
          setCustomBoxes(customBoxesResponse.data);
        }

        if (boxesByStyleCategory) {
          const boxesByStyleResponse = await subcategory.get(
            `/category/${boxesByStyleCategory._id}`
          );
          setBoxesByStyle(boxesByStyleResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    // if (loading) {
    //   return <SireprintingLoader />;
    // }

    const items = activeTab === "boxesByStyle" ? boxesByStyle : customBoxes;

    return items.map((item) => (
      <div
        key={item._id}
        className="industry-card"
        onClick={() => navigate(`/${item.slug}`)}
      >
        <img
          src={item.image || "../images/arka.png"}
          alt={item.title}
          onError={(e) => {
            e.target.src = "../images/arka.png";
          }}
        />
        <div className="industry-blue-part">
          <h3>{item.title}</h3>
          <p
            className="product-desc truncated-desc"
            dangerouslySetInnerHTML={{
              __html: he.decode(
                item.description || "High-quality packaging solution"
              ),
            }}
          ></p>
          <span className="read-more">Read More</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="trusted">
      <div className="div-trustedtext">
        <h2 className="trustedtext">
          Bring Your Custom Packaging Vision to Life
        </h2>
      </div>
      <p className="industry-main-p">
        Your products deserve packaging that feels as special as what's inside.
        At Cheap Custom Packaging, we don't just print boxes, we build
        experiences. Our custom printed packaging in USA is designed to capture
        your brand's personality, featuring rich colors, high-quality finishes,
        and details that impress at first look. If you need custom shipping
        boxes that protect with style or luxury gift boxes that improve your
        brand, we bring your ideas to life with quality and care. It is our goal
        to create boxes that tell your brand's story creatively, professionally,
        and in a way that your customers will remember it long after they unbox
        them.
      </p>

      <div className="tabs">
        <button
          className={`tab-button ${
            activeTab === "customBoxes" ? "active" : ""
          }`}
          onClick={() => setActiveTab("customBoxes")}
        >
          Custom Boxes
        </button>
        <button
          className={`tab-button ${
            activeTab === "boxesByStyle" ? "active" : ""
          }`}
          onClick={() => setActiveTab("boxesByStyle")}
        >
          Boxes By Style
        </button>
      </div>

      <div className="industry-grid">{renderContent()}</div>

      <button
        className="show-more-btn"
        onClick={() => navigate("/allproducts")}
      >
        Show More
      </button>
    </div>
  );
};

export default Industry;
