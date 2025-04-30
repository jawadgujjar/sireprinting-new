import React, { useState } from "react";
import { Button, Form, Input, Upload, Select, Row, Col } from "antd";
import { UploadOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { TruckOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import "./productmain.css";
import Productimgs1 from "./productimgs";
import Productdetail1 from "./productdetail";

const { Option } = Select;

const Productmain1 = () => {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleFinish = (values) => {
    console.log("Final Form Values: ", values);
  };

  const text = `
    sdkcjhsdcksd ssdkhcsdc sasklh kjscoshcs kcshc kcsdio
    kchsdlkchso ksdlfcjsd sksdnfskldh sdksdlfkhsd skfhsdklfh
    sdkcjhsdcksd ssdkhcsdc sasklh kjscoshcs kcshc kcsdio kchsdlkchso ksdlfcjsd sksdnfskldh sdks
  `;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = text.slice(0, 100);

  return (
    <div className="products-page-container">
      <Row className="product-content-wrapper">
        {/* Image Section */}
        <Col xs={24} md={14}>
          <div className="product-image-section">
            <Productimgs1 />
          </div>
        </Col>

        {/* Form Section */}
        <Col xs={24} md={10}>
          <div className="product-form-section">
            <div className="productmain-form-container">
              <div className="product-header-group">
                <p className="form-title1">Small Pillow Boxes</p>
                <div className="product-ratings-wrapper">
                  <div className="product-ratings-left">
                    <span className="stars">
                      <StarFilled />
                      <StarFilled />
                      <StarFilled />
                      <StarFilled />
                      <StarTwoTone twoToneColor="#fadb14" />
                    </span>
                    <span className="review-count">47 reviews</span>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <span className="sku-id">SKU: #123456</span>
                    <span className="sku-id">ID: #123456</span>
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
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Length" />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={6}>
                        <Form.Item
                          name="width"
                          label="Width"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Width" />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={6}>
                        <Form.Item
                          name="depth"
                          label="Depth"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Depth" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <Form.Item
                          name="unit"
                          label="Unit"
                          rules={[{ required: true }]}
                          initialValue="cm" // This sets initial value in the form
                        >
                          <Select placeholder="Select Unit" defaultValue="cm">
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
                      rules={[{ required: true }]}
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
                          rules={[{ required: true }]}
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
                          name="upload"
                          label="Upload File"
                          valuePropName="fileList"
                          getValueFromEvent={(e) => e.fileList}
                        >
                          <Upload beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Row justify="space-between" align="middle">
                        {/* Delivery + Price Section (Left) */}
                        <Col>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            {/* Delivery Info */}
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

                            {/* Price Info */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <span style={{ fontWeight: "bold" }}>Price:</span>
                              <span
                                style={{
                                  color: "#012376",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                }}
                              >
                                $4.00
                              </span>
                              <Tooltip title="This is the price per box.">
                                <InfoCircleOutlined style={{ color: "#666" }} />
                              </Tooltip>
                              <span style={{ color: "#aaa", fontSize: "13px" }}>
                                each box
                              </span>
                            </div>
                          </div>
                        </Col>

                        {/* Get Pricing Button (Right) */}
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
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[{ required: true }]}
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
        <Productdetail1 />
      </div>
    </div>
  );
};

export default Productmain1;
