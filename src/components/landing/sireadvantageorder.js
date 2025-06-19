import React, { useState } from "react";
import "./sireadvantage.css";
import { Form, Input, Select, Button, Row, Col, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { instantquote } from "../../utils/axios";

const { Option } = Select;

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
      form.setFieldsValue({ [fieldName]: response.data.secure_url }); // Set the URL in the form
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
      return false; // Prevent default upload behavior
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

function Sireadvantageorder() {
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
      console.log("All form values:", values);

      const payload = {
        length: Number(values.length),
        width: Number(values.width),
        depth: Number(values.depth),
        unit: values.unit,
        color: values.color,
        quantity: Number(values.quantity),
        image: values.mainImage || "",
        name: values.name,
        email: values.email,
        phonenumber: values.phone,
      };

      const response = await instantquote.post("/", payload);
      console.log("API Response:", response.data);

      if (response.data.success) {
        message.success("Quote submitted successfully!");
        form.resetFields();
        setStep(1);
      } else {
        message.error("Failed to submit quote");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="sireadvantage-wrapper">
      {/* <div className="div-trustedtext">
        <h2 className="trustedtext" style={{ marginBottom: "2rem" }}>
          SIRE PRINTING ADVANTAGES
        </h2>
      </div>
      <div className="three-images-advantages-ad">
        <div className="icon-grid-ad">
          <div className="icon-item-ad text-center">
            <img src="/images/1.webp" alt="Icon 1" className="icon-img-ad" />
            <p className="icon-text-ad">High Quality</p>
          </div>
          <div className="icon-item-ad text-center">
            <img src="/images/2.webp" alt="Icon 2" className="icon-img-ad" />
            <p className="icon-text-ad">Custom Design</p>
          </div>
          <div className="icon-item-ad text-center">
            <img
              src="/images/Eco-Friendly.png"
              alt="Icon 3"
              className="icon-img-ad"
            />
            <p className="icon-text-ad">Eco Friendly</p>
          </div>
          <div className="icon-item-ad text-center">
            <img src="/images/3.webp" alt="Icon 4" className="icon-img-ad" />
            <p className="icon-text-ad">Free Delivery</p>
          </div>
          <div className="icon-item-ad">
            <img src="/images/1.webp" alt="Icon 5" className="icon-img-ad" />
            <p className="icon-text-ad">Affordable</p>
          </div>
          <div className="icon-item-ad">
            <img src="/images/2.webp" alt="Icon 6" className="icon-img-ad" />
            <p className="icon-text-ad">24/7 Support</p>
          </div>
        </div>
      </div> */}

      <Row className="form-section">
        <Col xs={24} md={12} className="form-left">
          <h3 className="form-title-advantage">Order Process</h3>
          <div className="process-div">
            <img
              alt="process"
              src="../images/process.png"
              className="process-div-img"
            />
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
            <div style={{ color: "#01257d", display: "none" }}>a</div>
            <div style={{ color: "#01257d", display: "none" }}>a</div>
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
                      initialValue="cm"
                      rules={[
                        { required: true, message: "Please select unit" },
                      ]}
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
                      rules={[
                        { required: true, message: "Please select quantity" },
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
                          <div style={{ marginTop: 8 }}>
                            {" "}
                            <PlusOutlined />
                            Upload
                          </div>
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
                    { type: "email", message: "Please enter a valid email" },
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

export default Sireadvantageorder;
