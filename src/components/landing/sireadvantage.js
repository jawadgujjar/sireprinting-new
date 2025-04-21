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
      <hr className="divider-line" />
      <h2 className="advantage-main">SIRE PRINTING ADVANTAGES</h2>

      <div className="three-images-advantages">
        {advantages.map((item, index) => (
          <div className="advantage-card" key={index}>
            <img alt={item.title} src={item.image} />
            <h3>{item.title}</h3>
            <p className="advantage-description">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="form-section">
        <div className="form-left">
          <img src="../images/instant.jpg" alt="form-banner" />
        </div>

        <div className="form-right">
          <h3 className="form-title-advantage">Get Instant Pricing</h3>
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
        </div>
      </div>
    </div>
  );
}

export default Sireadvantage;
