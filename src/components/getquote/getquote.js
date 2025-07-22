import React, { useState, useEffect } from "react";
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
  Collapse,
  Spin,
} from "antd";
import {
  InboxOutlined,
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./getquote.css";
import { getquote, product } from "../../utils/axios";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const faqData = [
  {
    question: "How long does it take to receive a quote?",
    answer:
      "We typically respond with a quote within 1-2 business days after receiving your request. Complex projects may take slightly longer.",
  },
  {
    question: "What information do I need to provide for an accurate quote?",
    answer:
      "Please provide product type, quantity, dimensions, material preference, and any special requirements like printing or finishing options.",
  },
  {
    question: "Do you offer design services?",
    answer:
      "Yes, we have an in-house design team that can help create or refine your packaging design for an additional fee.",
  },
  {
    question: "What is your minimum order quantity?",
    answer:
      "Our MOQ varies by product type but typically starts at 100 units for standard items. Custom products may have higher MOQs.",
  },
  {
    question: "What file formats do you accept for artwork?",
    answer:
      "We accept AI, EPS, PDF, PSD, JPG, and PNG files. Vector files are preferred for printing.",
  },
  {
    question: "How long does production take?",
    answer:
      "Production time depends on the complexity of your order but typically ranges from 10-15 business days after approval.",
  },
  {
    question: "Do you offer eco-friendly packaging options?",
    answer:
      "Yes, we offer a range of sustainable materials including recycled, compostable, and biodegradable options.",
  },
  {
    question: "Can I get samples before placing a large order?",
    answer:
      "Absolutely! We provide samples of our standard products for a small fee that's credited back when you place your order.",
  },
];

// Cloudinary configuration
const cloudName = "dxhpud7sx";
const uploadPreset = "sireprinting";

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
    className: "responsive-upload",
  };

  return (
    <Upload {...uploadProps}>
      {fileList.length >= maxCount ? null : children}
    </Upload>
  );
};

function Getquote() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetchingProducts(true);
        const response = await product.get("/");
        let productsData = [];

        if (response.data) {
          if (Array.isArray(response.data)) {
            productsData = response.data;
          } else if (response.data.success) {
            productsData = response.data.data || response.data.products;
          } else {
            productsData = response.data;
          }
        }

        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        message.error("Failed to load products");
      } finally {
        setFetchingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList || [];
  };

  const validateImage = (_, value) => {
    if (!value || value.length === 0) {
      return Promise.resolve();
    }
    const isValidType = ["image/jpeg", "image/png", "application/pdf", "application/postscript"].includes(value[0]?.type);
    const isValidSize = value[0]?.size / 1024 / 1024 < 10;
    if (!isValidType) return Promise.reject("Only JPG/PNG/PDF/AI files allowed!");
    if (!isValidSize) return Promise.reject("File must be smaller than 10MB!");
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const quoteData = {
      length: values.length,
      width: values.width,
      height: values.height,
      chooseProduct: values.productType,
      colors: values.color,
      quantity: values.quantity,
      phoneNumber: values.phone,
      fullName: values.name,
      email: values.email,
      uploadFile: values.files || "",
      material: values.material,
      finishOption: values.finish,
      message: values.notes,
      companyName: values.company || "",
    };
    try {
      const response = await getquote.post("/", quoteData);
      console.log(response, "values");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Quote request submitted successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProducts) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="quote-page-container">
      <Row gutter={[40, 0]} className="two-column-layout">
        {/* Left Column - Quote Form (larger) */}
        <Col xs={24} md={12} className="quote-form-column">
          <div className="quote-form-container">
            <div className="quote-form-column">
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
                        rules={[
                          {
                            required: true,
                            message: "Please select a product",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select product"
                          className="quote-select"
                          suffixIcon={<span className="dropdown-icon">▼</span>}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          loading={fetchingProducts}
                        >
                          {products.map((product) => (
                            <Option
                              key={product._id || product.id}
                              value={product._id || product.id}
                            >
                              {product.title || product.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                      <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                          { required: true, message: "Please enter quantity" },
                        ]}
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
                        rules={[
                          { required: true, message: "Please select material" },
                        ]}
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
                        rules={[
                          { required: true, message: "Please enter length" },
                        ]}
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
                        rules={[
                          { required: true, message: "Please enter width" },
                        ]}
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
                        rules={[
                          { required: true, message: "Please enter height" },
                        ]}
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
                        rules={[
                          { required: true, message: "Please enter your name" },
                        ]}
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
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
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
                        rules={[
                          {
                            required: true,
                            message: "Please enter your phone",
                          },
                        ]}
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
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ validator: validateImage }]}
                        extra="Supports JPG, PNG, PDF, AI (Max 10MB)"
                      >
                        <CloudinaryUploader
                          cloudName={cloudName}
                          uploadPreset={uploadPreset}
                          maxCount={1}
                          listType="picture-card"
                          form={form}
                          fieldName="files"
                        >
                          <div className="upload-content-wrapper">
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to this area
                            </p>
                            <p className="ant-upload-hint">
                              Upload your design files or artwork
                            </p>
                          </div>
                        </CloudinaryUploader>
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
                        We respect your privacy. Your information will never be
                        shared.
                      </Text>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Column - FAQ (smaller) */}
        <Col xs={24} md={12} className="faq-column">
          <div className="faq-container">
            <div className="faq-column">
              <div className="faq-container">
                <div className="faq-header">
                  <Title level={2} className="faq-title">
                    <QuestionCircleOutlined /> FREQUENTLY ASKED QUESTIONS
                  </Title>
                  <Text className="faq-subtitle">
                    Find answers to common questions about our quoting process
                    and services
                  </Text>
                </div>

                <Collapse
                  accordion
                  bordered={false}
                  className="faq-collapse"
                  expandIconPosition="right"
                >
                  {faqData.map((item, index) => (
                    <Panel
                      header={
                        <span className="faq-questions">{item.question}</span>
                      }
                      key={index}
                      className="faq-panel"
                    >
                      <div className="faq-answer">{item.answer}</div>
                    </Panel>
                  ))}
                </Collapse>

                <div className="faq-contact">
                  <Title level={4} className="contact-title">
                    Still have questions?
                  </Title>
                  <Text className="contact-text">
                    Contact us directly at{" "}
                    <a href="mailto:support@example.com">support@example.com</a>{" "}
                    or call <a href="tel:+1234567890">(123) 456-7890</a>
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Getquote;