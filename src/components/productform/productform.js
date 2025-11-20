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
  Spin,
} from "antd";
import axios from "axios";
import { getquote, product } from "../../utils/axios";
import { InboxOutlined } from "@ant-design/icons";
import "./productform.css";

const { Option } = Select;
const cloudName = "dxhpud7sx";
const uploadPreset = "sireprinting";

// Image validator
const validateImage = (_, value) => {
  if (!value || value.length === 0) {
    return Promise.resolve();
  }

  const file = value[0];
  if (file?.url) {
    return Promise.resolve();
  }

  const rawFile = file.originFileObj;
  if (!rawFile?.type.startsWith("image/")) {
    return Promise.reject("Only JPG/PNG files allowed!");
  }

  const isValidSize = rawFile.size / 1024 / 1024 < 10;
  if (!isValidSize) {
    return Promise.reject("File must be smaller than 10MB!");
  }

  return Promise.resolve();
};

// Normalize file
const normFile = (e) => {
  if (Array.isArray(e)) return e;
  return e?.fileList || [];
};

// CloudinaryUploader Component
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
      form.setFieldsValue({ [fieldName]: newFileList });
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

// Main Form Component
function Productform1() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [form] = Form.useForm();

  // Fetch products and colors
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);

        // Fetch products
        const productsResponse = await product.get("/");
        let productsData = [];

        if (productsResponse.data) {
          if (Array.isArray(productsResponse.data)) {
            productsData = productsResponse.data;
          } else if (productsResponse.data.success) {
            productsData =
              productsResponse.data.data || productsResponse.data.products;
          } else {
            productsData = productsResponse.data;
          }
        }

        setProducts(productsData);

        // For colors, you can implement similar logic if needed
        // const colorsResponse = await axios.get("YOUR_COLORS_API_ENDPOINT");
        // setColors(colorsResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        message.error("Failed to load form data");
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);

  const handleFinish = async (values) => {
    setLoading(true);

    // Handle file upload if needed
    if (values.uploadFile && values.uploadFile[0]?.originFileObj) {
      try {
        const fileUrl = await uploadToCloudinary(
          values.uploadFile[0].originFileObj
        );
        values.uploadFile = fileUrl;
      } catch (error) {
        message.error("File upload failed");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await getquote.post("/", values);
      message.success("Form submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.error("API Error: ", error);
      message.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  if (fetchingData) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="ultra-compact-form">
      <div className="form-header">
        <h2 className="form-title-main">BEAT MY QUOTE</h2>
      </div>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* Dimensions Section */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="length"
              rules={[{ required: true, message: "Please enter length" }]}
            >
              <Input className="ultra-compact-input" placeholder="Length" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="width"
              rules={[{ required: true, message: "Please enter width" }]}
            >
              <Input className="ultra-compact-input" placeholder="Width" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="height"
              rules={[{ required: true, message: "Please enter height" }]}
            >
              <Input className="ultra-compact-input" placeholder="Height" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="unit" className="unit-selector" initialValue="inches">
          <Select className="ultra-compact-select">
            <Option value="inches">Inches</Option>
            <Option value="cm">cm</Option>
            <Option value="mm">mm</Option>
          </Select>
        </Form.Item>
        {/* Product Selection */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="product"
              label="PRODUCT"
              rules={[{ required: true, message: "Please select a product" }]}
            >
              <Select
                className="ultra-compact-select"
                placeholder="Select product"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
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
          <Col xs={24} sm={12}>
            <Form.Item
              name="color"
              label="COLOR"
              rules={[{ required: true, message: "Please select a color" }]}
            >
              <Select
                className="ultra-compact-select"
                placeholder="Select color"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* Details Section */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <Input
                className="ultra-compact-input"
                type="number"
                min={1}
                placeholder="Quantity"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter valid phone number",
                },
              ]}
            >
              <Input
                className="ultra-compact-input"
                placeholder="Phone Number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input className="ultra-compact-input" placeholder="Your Name" />
            </Form.Item>
          </Col>
        </Row>
        {/* Contact Section */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              label="EMAIL"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter valid email" },
              ]}
            >
              <Input
                className="ultra-compact-input"
                type="email"
                placeholder="Email Address"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="uploadFile"
              label="Upload File"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ validator: validateImage }]}
            >
              <CloudinaryUploader
                cloudName={cloudName}
                uploadPreset={uploadPreset}
                maxCount={1}
                listType="picture-card"
                form={form}
                fieldName="uploadFile"
              >
                <div className="upload-content-wrapper">
                  <p className="sample-upload-text">upload</p>
                  <p className="ant-upload-hint">JPG/PNG </p>
                </div>
              </CloudinaryUploader>
            </Form.Item>
          </Col>
        </Row>
        {/* Message Section */}
        <Form.Item name="message" label="NOTES">
          <Input.TextArea
            className="ultra-compact-textarea"
            placeholder="Special instructions..."
            rows={3}
          />
        </Form.Item>
        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="ultra-compact-submit-btn"
            loading={loading}
            size="large"
            block
          >
            {loading ? "PROCESSING..." : "GET QUOTE NOW"}
          </Button>
        </Form.Item>
        In a Hurry? Give us a call at +123-456-7890
      </Form>
    </div>
  );
}

export default Productform1;
