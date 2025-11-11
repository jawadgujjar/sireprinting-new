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

function Sireadvantage() {
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
      <div className="div-trustedtext">
        <h2 className="trustedtext" style={{ marginBottom: "2rem" }}>
          Cheap Custom Packaging Advantages
        </h2>
      </div>
      <div className="three-images-advantages-ad">
        <div className="icon-grid-ad">
          <div className="icon-item-ad text-center">
            <img
              src="/images/support.png"
              alt="Icon 1"
              className="icon-img-ad"
            />
            <p className="icon-text-ad">High Quality</p>
          </div>
          <div className="icon-item-ad text-center">
            <img
              src="/images/highquality.png"
              alt="Icon 2"
              className="icon-img-ad"
            />
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
            <img
              src="/images/customdesign.png"
              alt="Icon 6"
              className="icon-img-ad"
            />
            <p className="icon-text-ad">24/7 Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sireadvantage;
