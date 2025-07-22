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
import { InboxOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { sampleorder } from "../../utils/axios";
import axios from "axios";
import "./sampleform.css";
import { useUser } from "../../contextapi/userContext";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

function Sampleform() {
  const { user } = useUser();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [productType, setProductType] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const getPriceByProductType = (type) => {
    switch (type) {
      case "random sample":
        return 50;
      case "custom sample":
        return 100;
      case "premium sample":
        return 0;
      default:
        return 0;
    }
  };

const normFile = (e) => {
  if (Array.isArray(e)) return e;
  return e?.fileList || [];
};

  const validateImage = (_, value) => {
  if (!value || value.length === 0) {
    return Promise.reject("Please upload a file");
  }
  const isValidType = ["image/jpeg", "image/png"].includes(value[0]?.type);
  const isValidSize = value[0]?.size / 1024 / 1024 < 10; // 10MB
  if (!isValidType) return Promise.reject("Only JPG/PNG files allowed!");
  if (!isValidSize) return Promise.reject("File must be smaller than 10MB!");
  return Promise.resolve();
};

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

  const handleSampleSubmit = async (values) => {
    setLoading(true);
    const price = getPriceByProductType(values.productType);

    const data = {
      product: values.productType,
      quantity: 1,
      material: values.material,
      size: {
        length: parseFloat(values.length),
        width: parseFloat(values.width),
        height: parseFloat(values.height),
        unit: "in",
      },
      file:
        values.productType !== "random sample" ? fileList[0]?.name || "" : "",
      price: price,
    };

    try {
      if (!user || !user.user?.id) {
        throw new Error("Please login to submit sample request");
      }

      setSampleData(data);
      setShowShippingForm(true);
      message.success("Proceeding to shipping details...");
      form.resetFields(["material", "length", "width", "height"]);
      setFileList([]);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShippingSubmit = async (values) => {
    setLoading(true);
    try {
      if (!user || !user.user?.id) {
        throw new Error("Session expired. Please login again");
      }

      const combinedData = {
        ...sampleData,
        userId: user.user.id,
        shippingAddress: {
          name: values.name,
          companyName: values.companyName || "",
          phoneNumber: values.phoneNumber,
          streetAddress: values.streetAddress,
          city: values.city,
          province: values.province,
          zipCode: values.zipCode,
          country: values.country,
        },
        notification: false,
      };

      const response = await sampleorder.post("/", combinedData);

      setSubmissionSuccess(true);
      form.resetFields();
      setShowShippingForm(false);
      setSampleData(null);
      setProductType(null);
      message.success("Sample request submitted successfully!");
    } catch (error) {
      console.error("Error:", {
        message: error.message,
        response: error.response?.data,
      });

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Submission failed. Please try again.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleProductTypeChange = (value) => {
    setProductType(value);
    if (value === "random sample") {
      setFileList([]);
      form.setFieldsValue({ files: undefined });
    }
  };

  const handleBack = () => {
    setShowShippingForm(false);
  };

  return (
    <div className="sample-page-container">
      <div className="sample-form-container">
        <div className="sample-header">
          <Title level={1} className="sample-title">
            {submissionSuccess
              ? "REQUEST SUBMITTED"
              : showShippingForm
              ? "SHIPPING DETAILS"
              : "SAMPLE REQUEST"}
          </Title>
        </div>

        {submissionSuccess ? (
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              style={{ fontSize: 60 }}
            />
            <Title level={3} style={{ marginTop: 20 }}>
              Your sample request has been submitted successfully!
            </Title>
            <Text style={{ fontSize: 16 }}>
              Our team will contact you shortly regarding the status and
              shipping.
            </Text>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={
              showShippingForm ? handleShippingSubmit : handleSampleSubmit
            }
            className="sample-form"
            initialValues={{ quantity: 1 }}
          >
            {!showShippingForm ? (
              <>
                <Row gutter={24}>
                  <Col span={24}>
                    <Title level={4} className="sample-section-title">
                      Product Specifications
                    </Title>
                    {productType && (
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 16 }}
                      >
                        Price:{" "}
                        {productType === "premium sample"
                          ? "To be determined by admin"
                          : `£${getPriceByProductType(productType)}`}
                      </Text>
                    )}
                  </Col>

                  <Col xs={24} sm={12} md={8}>
                    <Form.Item
                      name="productType"
                      label="Product Type"
                      rules={[
                        { required: true, message: "Please select a product" },
                      ]}
                    >
                      <Select
                        placeholder="Select product"
                        className="sample-select"
                        onChange={handleProductTypeChange}
                      >
                        <Option value="random sample">
                          Random Sample (£50)
                        </Option>
                        <Option value="custom sample">
                          Custom Sample (£100)
                        </Option>
                        <Option value="premium sample">
                          Premium Sample (Admin Price)
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={8}>
                    <Form.Item name="quantity" label="Quantity">
                      <Input
                        type="number"
                        readOnly
                        className="sample-input"
                        style={{
                          backgroundColor: "#f5f5f5",
                          cursor: "not-allowed",
                        }}
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
                        className="sample-select"
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
                    <Title level={4} className="sample-section-title">
                      Dimensions (in inches)
                    </Title>
                  </Col>

                  {["length", "width", "height"].map((field) => (
                    <Col xs={24} sm={8} key={field}>
                      <Form.Item
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        rules={[
                          { required: true, message: "Required" },
                          {
                            pattern: /^\d*\.?\d*$/,
                            message: "Please enter a valid number",
                          },
                          {
                            validator: (_, value) =>
                              value >= 0
                                ? Promise.resolve()
                                : Promise.reject("Must be a positive number"),
                          },
                        ]}
                      >
                        <Input placeholder={field} className="sample-input" />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>

                {productType !== "random sample" && (
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        name="files"
                        label="Upload Design (Optional)"
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
                          fieldName="files"
                        >
                          <div className="upload-content-wrapper">
                            <p className="sample-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="sample-upload-text">
                              Click or drag file here
                            </p>
                            <p className="ant-upload-hint">JPG/PNG, Max 10MB</p>
                          </div>
                        </CloudinaryUploader>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </>
            ) : (
              <>
                <Row gutter={24}>
                  <Col span={24}>
                    <Title level={4} className="sample-section-title">
                      Shipping Information
                    </Title>
                    {sampleData && (
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 16 }}
                      >
                        Product: {sampleData.product} | Price:{" "}
                        {sampleData.price === 0
                          ? "To be determined by admin"
                          : `£${sampleData.price}`}
                      </Text>
                    )}
                  </Col>

                  {[
                    { name: "name", label: "Full Name", required: true },
                    {
                      name: "companyName",
                      label: "Company Name",
                      required: false,
                    },
                    { name: "phoneNumber", label: "Phone", required: true },
                    {
                      name: "streetAddress",
                      label: "Street Address",
                      required: true,
                    },
                    { name: "city", label: "City", required: true },
                    {
                      name: "province",
                      label: "State/Province",
                      required: true,
                    },
                    {
                      name: "zipCode",
                      label: "Zip/Postal Code",
                      required: true,
                    },
                    { name: "country", label: "Country", required: true },
                  ].map((field) => (
                    <Col xs={24} sm={12} key={field.name}>
                      <Form.Item
                        name={field.name}
                        label={field.label}
                        rules={
                          field.required
                            ? [
                                {
                                  required: true,
                                  message: `${field.label} is required`,
                                },
                                {
                                  min: 2,
                                  message: `${field.label} is too short`,
                                },
                              ]
                            : []
                        }
                      >
                        <Input
                          placeholder={field.label}
                          className="sample-input"
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </>
            )}

            <Row>
              <Col span={24} className="sample-submit-col">
                <Form.Item>
                  {showShippingForm ? (
                    <>
                      <Button
                        type="default"
                        onClick={handleBack}
                        className="sample-back-btn"
                        size="large"
                        disabled={loading}
                      >
                        Back
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="sample-submit-btn"
                        size="large"
                      >
                        {loading ? "Submitting..." : "Submit Request"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="sample-submit-btn"
                      size="large"
                      block
                    >
                      {loading ? "Processing..." : "Continue to Shipping"}
                    </Button>
                  )}
                </Form.Item>
                <Text className="sample-privacy-note">
                  Your information is secure and will not be shared
                </Text>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Sampleform;
