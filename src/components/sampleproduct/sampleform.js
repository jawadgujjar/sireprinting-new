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
import { InboxOutlined } from "@ant-design/icons";
import "./sampleform.css";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

function Sampleform() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [productType, setProductType] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const handleSampleSubmit = async (values) => {
    setLoading(true);
    const data = {
      productType: values.productType,
      quantity: values.quantity,
      material: values.material,
      length: values.length,
      width: values.width,
      height: values.height,
      uploadFile: values.productType !== "random sample" ? fileList[0]?.name || "" : "",
    };
    try {
      console.log("Sample Form Data:", data);
      setSampleData(data);
      setShowShippingForm(true);
      message.success("Proceeding to shipping details...");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Failed to proceed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShippingSubmit = async (values) => {
    setLoading(true);
    const combinedData = {
      ...sampleData,
      name: values.name,
      companyName: values.companyName || "",
      phoneNumber: values.phoneNumber,
      streetAddress: values.streetAddress,
      city: values.city,
      province: values.province,
      zipCode: values.zipCode,
      country: values.country,
    };
    try {
      console.log("Combined Data:", combinedData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Sample request and shipping details submitted successfully!");
      form.resetFields();
      setShowShippingForm(false);
      setSampleData(null);
      setProductType(null);
    } catch (error) {
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductTypeChange = (value) => {
    setProductType(value);
    if (value === "random sample") {
      setFileList([]);
    }
  };

  const handleBack = () => {
    setShowShippingForm(false);
    form.resetFields();
  };

  return (
    <div className="quote-page-container">
      <div className="quote-form-container">
        <div className="quote-header">
          <Title level={1} className="quote-title">
            {showShippingForm ? "SHIPPING ADDRESS" : "SAMPLE REQUEST FORM"}
          </Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={showShippingForm ? handleShippingSubmit : handleSampleSubmit}
          className="quote-form"
        >
          {!showShippingForm ? (
            <>
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
                      onChange={handleProductTypeChange}
                    >
                      <Option value="random sample">Random Sample</Option>
                      <Option value="custom sample">Custom Sample</Option>
                      <Option value="premium sample">Premium Sample</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="quantity"
                    label="Quantity"
                    initialValue={1}
                    rules={[{ required: true, message: "Please enter quantity" }]}
                  >
                    <Input
                      type="number"
                      placeholder="e.g. 1000"
                      className="quote-input"
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
                      <Option value="plastic">Plastic</Option>
                      <Option value="metal">Metal</Option>
                      <Option value="wood">Wood</Option>
                      <Option value="fabric">Fabric</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={24}>
                  <Title level={4} className="section-title">
                    Size
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

              {productType !== "random sample" && (
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      name="files"
                      label="Upload Image (Optional)"
                      extra="Supports JPG, PNG (Max 10MB)"
                    >
                      <Dragger
                        onRemove={() => setFileList([])}
                        beforeUpload={(file) => {
                          setFileList([file]);
                          return false;
                        }}
                        fileList={fileList}
                        className="quote-upload"
                        accept=".jpg,.jpeg,.png"
                        maxCount={1}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area</p>
                        <p className="ant-upload-hint">Upload your design image</p>
                      </Dragger>
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <>
              <Row gutter={24}>
                <Col span={24}>
                  <Title level={4} className="section-title">
                    Shipping Details
                  </Title>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                  >
                    <Input placeholder="Your name" className="quote-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item name="companyName" label="Company Name">
                    <Input placeholder="Company (optional)" className="quote-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: "Please enter your phone number" }]}
                  >
                    <Input placeholder="(123) 456-7890" className="quote-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="streetAddress"
                    label="Street Address"
                    rules={[{ required: true, message: "Please enter your street address" }]}
                  >
                    <Input placeholder="Street address" className="quote-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: "Please enter your city" }]}
                  >
                    <Input placeholder="City" className="quote-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="province"
                    label="Province/State"
                    rules={[{ required: true, message: "Please enter your province/state" }]}
                  >
                    <Input placeholder="Province/State" className="quote-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="zipCode"
                    label="Zip/Postal Code"
                    rules={[{ required: true, message: "Please enter your zip/postal code" }]}
                  >
                    <Input placeholder="Zip/Postal Code" className="quote-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: "Please enter your country" }]}
                  >
                    <Input placeholder="Country" className="quote-input" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col span={24} className="submit-col">
              <Form.Item>
                {showShippingForm && (
                  <Button
                    type="default"
                    onClick={handleBack}
                    className="quote-back-btn"
                    size="large"
                    style={{ marginRight: "10px" }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="quote-submit-btn"
                  size="large"
                >
                  {loading ? "Processing..." : showShippingForm ? "Submit Request" : "Next"}
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

export default Sampleform;