import React, { useState } from "react";
import "./sireadvantage.css";
import { Form, Input, Select, Button, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const advantages = [
  {
    title: "Sustainable Material",
    description:
      "Crafted from renewable sources to reduce environmental impact.",
    image:
      "https://res.cloudinary.com/sireprinting/image/upload/v1600727486/Self%20Lock%20Cake%20Boxes.jpg",
  },
  {
    title: "Eco-Friendly Packaging",
    description: "Designed with the environment in mind, minimizing waste.",
    image:
      "https://res.cloudinary.com/sireprinting/image/upload/v1600727486/Self%20Lock%20Cake%20Boxes.jpg",
  },
  {
    title: "Recyclable Boxes",
    description:
      "Made to be reused or recycled after use, supporting green living.",
    image:
      "https://res.cloudinary.com/sireprinting/image/upload/v1600727486/Self%20Lock%20Cake%20Boxes.jpg",
  },
];

function Sireadvantage() {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);

  const handleFinish = (values) => {
    console.log("Form Values:", values);
  };

  const handleNext = () => {
    setStep(2);
  };

  return (
    <div className="sireadvantage-wrapper">
      <div className="div-trustedtext">
        <h2 className="trustedtext" style={{ marginBottom: "2rem" }}>
          SIRE PRINTING ADVANTAGES
        </h2>
      </div>
      <div className="three-images-advantages-ad ">
        <div className="icon-grid-ad ">
          <div className="icon-item-ad text-center">
            <img src="/images/1.webp" alt="Icon 1" className="icon-img-ad " />
            <p className="icon-text-ad ">High Quality</p>
          </div>
          <div className="icon-item-ad text-center">
            <img src="/images/2.webp" alt="Icon 2" className="icon-img-ad " />
            <p className="icon-text-ad ">Custom Design</p>
          </div>
          <div className="icon-item-ad text-center">
            <img
              src="/images/Eco-Friendly.png"
              alt="Icon 3"
              className="icon-img-ad "
            />
            <p className="icon-text-ad ">Eco Friendly</p>
          </div>
          <div className="icon-item-ad text-center">
            <img src="/images/3.webp" alt="Icon 4" className="icon-img-ad " />
            <p className="icon-text-ad ">Free Delivery</p>
          </div>
          <div className="icon-item-ad ">
            <img src="/images/1.webp" alt="Icon 5" className="icon-img-ad " />
            <p className="icon-text-ad ">Affordable</p>
          </div>
          <div className="icon-item-ad ">
            <img src="/images/2.webp" alt="Icon 6" className="icon-img-ad " />
            <p className="icon-text-ad ">24/7 Support</p>
          </div>
        </div>
      </div>

      <Row className="form-section">
        <Col xs={24} md={12} className="form-left">
          <h3 className="form-title-advantage">Order Process</h3>
          <div className="process-div">
            {/* Images Row */}
            <img
              alt="process"
              src="../images/process.png"
              className="process-div-img"
            />
            <div className="process-images-row">
              {/* <div className="process-div-inside">
                <img alt="processimage" src="../images/process1.png" />
              </div>
              <div className="process-div-inside">
                <img alt="processimage" src="../images/process2.png" />
              </div>
              <div className="process-div-inside">
                <img alt="processimage" src="../images/process3.png" />
              </div>
              <div className="process-div-inside">
                <img alt="processimage" src="../images/process4.png" />
              </div>
              <div className="process-div-inside">
                <img alt="processimage" src="../images/process5.png" />
              </div> */}
            </div>

            {/* Headings Row */}
            <div className="process-headings-row">
              <div className="process-div-inside">
                <h3>Inquire Your Packaging</h3>
              </div>
              <div className="process-div-inside">
                <h3>Cost Estimation</h3>
              </div>
              <div className="process-div-inside">
                <h3>Packaging Design Proof</h3>
              </div>
              <div className="process-div-inside">
                <h3>Printing Process</h3>
              </div>
              <div className="process-div-inside">
                <h3>Shipping & Handling</h3>
              </div>
            </div>
            <div style={{ color: "#01257d", display: "hidden" }}>a</div>
            <div style={{ color: "#01257d", display: "hidden" }}>a</div>
            <div style={{ color: "#01257d", display: "hidden" }}>a</div>
          </div>
        </Col>

        <Col xs={24} md={12} className="form-right">
          <h3 className="form-title-advantage">Get Instant Pricing</h3>
          <Form
            layout="vertical"
            onFinish={handleFinish}
            form={form}
            className="your-form-class"
          >
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
                      initialValue="cm"
                      rules={[{ required: true }]}
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
                  <Button
                    type="primary"
                    className="submit-button"
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
                  <div className="form-buttons">
                    <Button
                      type="primary"
                      onClick={() => setStep(1)}
                      className="submit-button"
                    >
                      Back
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-button"
                    >
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Sireadvantage;
