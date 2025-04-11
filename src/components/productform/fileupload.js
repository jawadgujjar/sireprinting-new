import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    setUploading(true);

    try {
      // 1️⃣ Backend se signature le kar ao
      const signatureResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/upload/generate-signature`
      );
      const { signature, timestamp, cloudName, apiKey } =
        await signatureResponse.json();

      // 2️⃣ Cloudinary ke liye formData tayar karo
      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      // 3️⃣ Cloudinary par signed request bhejo
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        message.success("File uploaded successfully!");
        onUploadSuccess(data.secure_url);
      } else {
        message.error("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Upload
      beforeUpload={(file) => {
        handleUpload(file); // Auto-upload on file selection
        return false; // Prevent default upload behavior
      }}
      showUploadList={false} // Hide file list
    >
      <Button icon={<UploadOutlined />} loading={uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </Button>
    </Upload>
  );
};

export default FileUpload;
