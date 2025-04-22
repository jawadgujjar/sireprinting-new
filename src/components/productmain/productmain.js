import React, { useState } from "react";
import { Button, Form, Input, Upload, Select, Row, Col } from "antd";
import { UploadOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
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
    <div className="product-page-container">
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
              <h3 className="form-title">Small Pillow Boxes</h3>
              <div className="product-rating">
                <span className="stars">
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarTwoTone twoToneColor="#fadb14" />
                </span>
                <span className="review-count">47 reviews</span>
              </div>
              <div className="product-rating1">
                <h4>
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
                </h4>
              </div>
              <hr className="divider" />
              <Form layout="vertical" onFinish={handleFinish} form={form}>
                {step === 1 && (
                  <>
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
                      <Button
                        type="primary"
                        className="submit-button small-btn"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
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
