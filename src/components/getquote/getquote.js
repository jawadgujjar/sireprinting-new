import React, { useState } from "react";
import {
  Button,
  Form,
  Select,
  Input,
  Row,
  Col,
  message,
  Upload,
  Typography,
} from "antd";
import {
  InboxOutlined,
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./getquote.css";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

function Getquote() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Quote request submitted successfully!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <div className="quote-container">
      <div className="quote-form-container">
        <div className="quote-header">
          <Title level={1} className="quote-title">
            REQUEST A QUOTE
          </Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="quote-form"
        >
          <Row gutter={24}>
            <Col span={24}>
              <Title level={4} className="section-title">
                Product Specifications
              </Title>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="productType"
                label="Product Type"
                rules={[{ required: true, message: "Please select a product" }]}
              >
                <Select
                  placeholder="Select product"
                  className="quote-select"
                  suffixIcon={<span className="dropdown-icon">▼</span>}
                >
                  <Option value="mailer">Mailer Boxes</Option>
                  <Option value="shipping">Shipping Boxes</Option>
                  <Option value="poly">Poly Mailers</Option>
                  <Option value="product">Product Boxes</Option>
                  <Option value="custom">Custom Boxes</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
              >
                <Input
                  type="number"
                  placeholder="e.g. 1000"
                  className="quote-input"
                  prefix={<span className="input-prefix">Qty</span>}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="material"
                label="Material"
                rules={[{ required: true, message: "Please select material" }]}
              >
                <Select
                  placeholder="Select material"
                  className="quote-select"
                  suffixIcon={<span className="dropdown-icon">▼</span>}
                >
                  <Option value="kraft">Kraft Paper</Option>
                  <Option value="white">White Cardstock</Option>
                  <Option value="corrugated">Corrugated</Option>
                  <Option value="recycled">100% Recycled</Option>
                  <Option value="compostable">Compostable</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Title level={4} className="section-title">
                Dimensions
              </Title>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="length"
                label="Length"
                rules={[{ required: true, message: "Please enter length" }]}
              >
                <Input
                  placeholder="Length"
                  className="quote-input"
                  suffix={<span className="input-suffix">in</span>}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="width"
                label="Width"
                rules={[{ required: true, message: "Please enter width" }]}
              >
                <Input
                  placeholder="Width"
                  className="quote-input"
                  suffix={<span className="input-suffix">in</span>}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="height"
                label="Height"
                rules={[{ required: true, message: "Please enter height" }]}
              >
                <Input
                  placeholder="Height"
                  className="quote-input"
                  suffix={<span className="input-suffix">in</span>}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Title level={4} className="section-title">
                Design Details
              </Title>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item name="color" label="Color Preference">
                <Select
                  placeholder="Select color"
                  className="quote-select"
                  suffixIcon={<span className="dropdown-icon">▼</span>}
                >
                  <Option value="full">Full Color Printing</Option>
                  <Option value="spot">Spot Colors</Option>
                  <Option value="none">No Printing</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item name="finish" label="Finish Options">
                <Select
                  placeholder="Select finish"
                  className="quote-select"
                  suffixIcon={<span className="dropdown-icon">▼</span>}
                >
                  <Option value="gloss">Gloss Lamination</Option>
                  <Option value="matte">Matte Lamination</Option>
                  <Option value="uv">UV Coating</Option>
                  <Option value="none">No Finish</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Title level={4} className="section-title">
                Your Information
              </Title>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  placeholder="Your name"
                  className="quote-input"
                  prefix={<UserOutlined className="input-icon" />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item name="company" label="Company Name">
                <Input
                  placeholder="Company (optional)"
                  className="quote-input"
                  prefix={<span className="input-icon">🏢</span>}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  placeholder="your@email.com"
                  className="quote-input"
                  prefix={<MailOutlined className="input-icon" />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please enter your phone" }]}
              >
                <Input
                  placeholder="(123) 456-7890"
                  className="quote-input"
                  prefix={<PhoneOutlined className="input-icon" />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="files"
                label="Upload Design Files"
                extra="Supports JPG, PNG, PDF, AI (Max 10MB)"
              >
                <Dragger
                  {...uploadProps}
                  className="quote-upload"
                  accept=".jpg,.jpeg,.png,.pdf,.ai"
                  maxCount={1}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area
                  </p>
                  <p className="ant-upload-hint">
                    Upload your design files or artwork
                  </p>
                </Dragger>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="notes" label="Additional Notes">
                <TextArea
                  rows={4}
                  placeholder="Tell us about your project, special requirements, or anything else we should know..."
                  className="quote-textarea"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24} className="submit-col">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="quote-submit-btn"
                  size="large"
                >
                  {loading ? "Processing..." : "Get My Free Quote"}
                </Button>
              </Form.Item>
              <Text className="privacy-note">
                We respect your privacy. Your information will never be shared.
              </Text>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Getquote;
