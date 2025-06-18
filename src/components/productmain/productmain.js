import React, { useState } from "react";
import { Button, Form, Input, Upload, Select, Row, Col, message } from "antd";
import { StarFilled, StarOutlined, PlusOutlined } from "@ant-design/icons";
import { TruckOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import axios from "axios";
import "./productmain.css";
import Productimgs1 from "./productimgs";
import Productdetail1 from "./productdetail";
import { instantquote } from "../../utils/axios";
import ProductSpecs from "./productspecs";
import Productdescription from "./productdescription";

const { Option } = Select;

// Cloudinary configuration
const cloudName = "dxhpud7sx";
const uploadPreset = "sireprinting";

// Custom CloudinaryUploader component
const CloudinaryUploader = ({
  cloudName,
  uploadPreset,
  listType,
  maxCount,
  form,
  fieldName,
  children,
}) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const newFileList = [
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: response.data.secure_url,
        },
      ];
      setFileList(newFileList);
      form.setFieldsValue({ [fieldName]: response.data.secure_url });
      return response.data.secure_url;
    } catch (error) {
      message.error("Upload failed");
      console.error(error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: async (file) => {
      await handleUpload(file);
      return false;
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    listType,
    maxCount,
  };

  return (
    <Upload {...uploadProps}>
      {fileList.length >= maxCount ? null : children}
    </Upload>
  );
};

const Productmain1 = ({
  data,
  currentVariant,
  onImageSelect,
  selectedVariantIndex,
}) => {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const [isExpanded, setIsExpanded] = useState(false);

  // Combine main image with additional images
  const allImages = [data.image, ...(data.additionalImages || [])];
  const rating = 4.5;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? <StarFilled key={i} /> : <StarOutlined key={i} />
      );
    }
    return stars;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const validateImage = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please upload an image"));
    }
    return Promise.resolve();
  };

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        setStep(2);
      })
      .catch((err) => {
        console.log("Validation Error:", err);
      });
  };

  const handleFinish = async () => {
    try {
      const values = form.getFieldsValue(true);
      console.log("All form values:", values);

      const payload = {
        length: values.length,
        width: values.width,
        depth: values.depth,
        unit: values.unit,
        color: values.color,
        quantity: values.quantity,
        image: values.mainImage,
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const response = await instantquote.post("/", payload);

      if (response.data.success) {
        message.success("Quote submitted successfully!");
        form.resetFields(); // Reset all form fields
        setStep(1); // Return to step 1
      } else {
        message.error("Failed to submit quote");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form");
    }
  };

  const text = currentVariant?.variantDescription || data.description;
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const truncatedText = text.slice(0, 100);

  // Get price from current variant or fallback to main product price
  const displayPrice = currentVariant?.price || data.price || "4.00";
  const displaySalePrice = currentVariant?.salePrice || data.salePrice;

  return (
    <div className="products-page-container">
      <Row className="product-content-wrapper">
        {/* Image Section */}
        <Col xs={24} md={14}>
          <div className="product-image-section">
            <Productimgs1
              images={allImages}
              selectedIndex={selectedVariantIndex}
              onImageSelect={onImageSelect} // Only trigger variant change, no form updates
              title={currentVariant?.variantTitle || data.title}
            />
          </div>
        </Col>

        {/* Form Section */}
        <Col xs={24} md={10}>
          <div className="product-form-section">
            <div className="productmain-form-container">
              <div className="product-header-group">
                <p className="form-title1">
                  {currentVariant?.variantTitle || data.title}
                </p>
                <div className="product-ratings-wrapper">
                  <div className="product-ratings-left">
                    <span className="stars">{renderStars(rating)}</span>
                    <span className="review-count">
                      {/* {data.reviews?.length || 27}  */}
                      47 reviews
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <span className="sku-id">
                      SKU: {currentVariant?.sku || data.sku || "#123456"}
                    </span>
                    <span className="sku-id">ID: {data.sku || "#123456"}</span>
                  </div>
                </div>
              </div>
              <div className="product-ratings1">
                <p>
                  {isExpanded ? text : `${truncatedText}...`}
                  <span
                    onClick={toggleReadMore}
                    style={{
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </span>
                </p>
              </div>
              <hr className="divider" />
              <Form layout="vertical" onFinish={handleFinish} form={form}>
                {step === 1 && (
                  <>
                    <Row gutter={16}>
                      <Col xs={24} sm={12} md={6}>
                        <Form.Item
                          name="length"
                          label="Length"
                          rules={[
                            { required: true, message: "Please enter length" },
                          ]}
                        >
                          <Input placeholder="Length" type="number" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <Form.Item
                          name="width"
                          label="Width"
                          rules={[
                            { required: true, message: "Please enter width" },
                          ]}
                        >
                          <Input placeholder="Width" type="number" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <Form.Item
                          name="depth"
                          label="Depth"
                          rules={[
                            { required: true, message: "Please enter depth" },
                          ]}
                        >
                          <Input placeholder="Depth" type="number" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <Form.Item
                          name="unit"
                          label="Unit"
                          rules={[
                            { required: true, message: "Please select unit" },
                          ]}
                        >
                          <Select placeholder="Select Unit">
                            <Option value="inches">Inches</Option>
                            <Option value="cm">Centimeters</Option>
                            <Option value="mm">Millimeters</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      name="color"
                      label="Color"
                      rules={[
                        { required: true, message: "Please select color" },
                      ]}
                    >
                      <Select placeholder="Select Color">
                        <Option value="white">White</Option>
                        <Option value="kraft">Kraft</Option>
                        <Option value="black">Black</Option>
                        <Option value="full">Full Color</Option>
                      </Select>
                    </Form.Item>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="quantity"
                          label="Quantity"
                          rules={[
                            {
                              required: true,
                              message: "Please select quantity",
                            },
                          ]}
                        >
                          <Select placeholder="Select Quantity">
                            <Option value="10">10</Option>
                            <Option value="25">25</Option>
                            <Option value="50">50</Option>
                            <Option value="100">100</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="mainImage"
                          label="Main Image"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          rules={[{ validator: validateImage }]}
                        >
                          <CloudinaryUploader
                            cloudName={cloudName}
                            uploadPreset={uploadPreset}
                            listType="picture-card"
                            maxCount={1}
                            form={form}
                            fieldName="mainImage"
                          >
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>
                                Upload Main Image
                              </div>
                            </div>
                          </CloudinaryUploader>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Row justify="space-between" align="middle">
                        <Col>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <TruckOutlined style={{ fontSize: "18px" }} />
                              <span>
                                <strong>Delivery (Free):</strong> 2 - 3 Business
                                Days
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>Price:</span>
                              {displaySalePrice ? (
                                <>
                                  <span
                                    style={{
                                      textDecoration: "line-through",
                                      color: "#999",
                                    }}
                                  >
                                    ${displayPrice}
                                  </span>
                                  <span
                                    style={{
                                      color: "#012376",
                                      fontWeight: "bold",
                                      fontSize: "18px",
                                    }}
                                  >
                                    ${displaySalePrice}
                                  </span>
                                </>
                              ) : (
                                <span
                                  style={{
                                    color: "#012376",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  ${displayPrice}
                                </span>
                              )}
                              <Tooltip title="This is the price per box.">
                                <InfoCircleOutlined style={{ color: "#666" }} />
                              </Tooltip>
                              <span style={{ color: "#aaa", fontSize: "13px" }}>
                                each box
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <Button
                            type="primary"
                            className="submit-button small-btn"
                            onClick={handleNext}
                          >
                            Get Pricing
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </>
                )}
                {step === 2 && (
                  <>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your phone number" />
                    </Form.Item>
                    <Form.Item>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          type="default"
                          className="submit-button small-btn"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="submit-button small-btn"
                        >
                          Submit
                        </Button>
                      </div>
                    </Form.Item>
                  </>
                )}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <Productdetail1 data={data} currentVariant={currentVariant} />
        <ProductSpecs data={data} currentVariant={currentVariant} />
        <Productdescription data={data} currentVariant={currentVariant} />
      </div>
    </div>
  );
};

export default Productmain1;
