import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

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

const FormSubmit = ({ onSubmit, cloudName, uploadPreset }) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);

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
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleFinish = async () => {
    try {
      const values = form.getFieldsValue(true);
      await onSubmit(values);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} form={form}>
      {step === 1 && (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="length"
                label="Length"
                rules={[{ required: true, message: "Please enter length" }]}
              >
                <Input placeholder="Length" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="width"
                label="Width"
                rules={[{ required: true, message: "Please enter width" }]}
              >
                <Input placeholder="Width" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="depth"
                label="Depth"
                rules={[{ required: true, message: "Please enter depth" }]}
              >
                <Input placeholder="Depth" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="unit"
                label="Unit"
                initialValue="cm"
                rules={[{ required: true, message: "Please select unit" }]}
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
            rules={[{ required: true, message: "Please select color" }]}
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
                rules={[{ required: true, message: "Please select quantity" }]}
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
                label="Upload File"
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
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </CloudinaryUploader>
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
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
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
  );
};

export default FormSubmit;
