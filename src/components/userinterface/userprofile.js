import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  message,
  Card,
  Tabs,
  Alert,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUser } from "../../contextapi/userContext";
import { profileaddress, updateuser } from "../../utils/axios";
import "./userprofile.css";
import axios from "axios";

const { TabPane } = Tabs;

// Cloudinary configuration
const cloudName = "dxhpud7sx";
const uploadPreset = "sireprinting";

// CloudinaryUploader component
const CloudinaryUploader = ({
  cloudName,
  uploadPreset,
  listType,
  maxCount,
  onUploadSuccess,
  buttonText,
  disabled,
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
      onUploadSuccess(response.data);
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
    disabled,
  };

  return (
    <Upload {...uploadProps}>
      {fileList.length >= maxCount ? null : (
        <Button icon={<PlusOutlined />} disabled={disabled}>
          {buttonText}
        </Button>
      )}
    </Upload>
  );
};

const UserProfile = () => {
  const { user: userContext, setUser: setUserContext } = useUser();
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState(null);
  const [addressSuccess, setAddressSuccess] = useState(null);
  const [viewAddressError, setViewAddressError] = useState(null);
  const [viewAddressSuccess, setViewAddressSuccess] = useState(null);

  // Shipping address states
  const [shippingName, setShippingName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [hasAddress, setHasAddress] = useState(false);

  // View/Edit address states
  const [viewShippingName, setViewShippingName] = useState("");
  const [viewCompanyName, setViewCompanyName] = useState("");
  const [viewShippingPhone, setViewShippingPhone] = useState("");
  const [viewStreetAddress, setViewStreetAddress] = useState("");
  const [viewCity, setViewCity] = useState("");
  const [viewProvince, setViewProvince] = useState("");
  const [viewZipCode, setViewZipCode] = useState("");
  const [viewCountry, setViewCountry] = useState("");

  // User profile states
  const [avatarUrl, setAvatarUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Reset form for shipping address
  const resetAddressForm = () => {
    setShippingName("");
    setCompanyName("");
    setShippingPhone("");
    setStreetAddress("");
    setCity("");
    setProvince("");
    setZipCode("");
    setCountry("");
    setHasAddress(false);
  };

  // Reset form for view/edit address
  const resetViewAddressForm = () => {
    setViewShippingName("");
    setViewCompanyName("");
    setViewShippingPhone("");
    setViewStreetAddress("");
    setViewCity("");
    setViewProvince("");
    setViewZipCode("");
    setViewCountry("");
  };

  // Load user and address data
  useEffect(() => {
    const loadUserData = async () => {
      if (userContext?.user) {
        setName(userContext.user.name || "");
        setEmail(userContext.user.email || "");
        setPhone(userContext.user.phone || "");
        setPreview(
          userContext.user.avatarUrl ||
            `https://i.pravatar.cc/300?u=${userContext.user.email}`
        );
        setAvatarUrl(userContext.user.avatarUrl || "");

        try {
          const response = await profileaddress.get(`/${userContext.user.id}`);
          const shippingAddress = response.data;
          if (shippingAddress) {
            setShippingName(shippingAddress.name || "");
            setCompanyName(shippingAddress.companyName || "");
            setShippingPhone(shippingAddress.phoneNumber || "");
            setStreetAddress(shippingAddress.streetAddress || "");
            setCity(shippingAddress.city || "");
            setProvince(shippingAddress.province || "");
            setZipCode(shippingAddress.zipCode || "");
            setCountry(shippingAddress.country || "");
            setViewShippingName(shippingAddress.name || "");
            setViewCompanyName(shippingAddress.companyName || "");
            setViewShippingPhone(shippingAddress.phoneNumber || "");
            setViewStreetAddress(shippingAddress.streetAddress || "");
            setViewCity(shippingAddress.city || "");
            setViewProvince(shippingAddress.province || "");
            setViewZipCode(shippingAddress.zipCode || "");
            setViewCountry(shippingAddress.country || "");
            setHasAddress(true);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setHasAddress(false);
        }
      }
    };

    loadUserData();
  }, [userContext]);

  // Handle Cloudinary upload success
  const handleUploadSuccess = (data) => {
    setAvatarUrl(data.secure_url);
    setPreview(data.secure_url);
  };

  // Handle profile submit with PATCH API - UPDATED FOR AUTHENTICATION
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!userContext?.user || !userContext.user.id) {
      message.error("User not logged in or ID missing.");
      return;
    }

    if (!avatarUrl) {
      message.info("No avatar selected to save.");
      return;
    }

    setLoading(true);
    try {
      // Get fresh token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Make request with explicit authorization header
      const response = await axios.patch(
        `${updateuser.defaults.baseURL}/${userContext.user.id}`,
        { avatarUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        message.success("Avatar updated successfully!");
        // Update user context
        if (setUserContext) {
          setUserContext({
            ...userContext,
            user: {
              ...userContext.user,
              avatarUrl: avatarUrl
            }
          });
        }
      } else {
        message.error(response.data.message || "Failed to update avatar");
      }
    } catch (error) {
      console.error("Avatar update failed:", error);
      if (error.response?.status === 401) {
        message.error("Session expired. Please login again.");
        // Optionally redirect to login here
      } else {
        message.error(
          error.message || 
          error.response?.data?.message || 
          "Failed to update avatar. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Create or update shipping address
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddressError(null);
    setAddressSuccess(null);

    if (!userContext?.user || !userContext.user.id) {
      setAddressError("User not logged in or ID missing.");
      return;
    }

    setAddressLoading(true);
    try {
      const shippingAddressData = {
        userId: userContext.user.id,
        shippingAddress: {
          name: shippingName,
          companyName,
          phoneNumber: shippingPhone,
          streetAddress,
          city,
          province,
          zipCode,
          country,
        },
      };

      if (hasAddress) {
        await profileaddress.put(
          `/${userContext.user.id}`,
          shippingAddressData
        );
        setAddressSuccess("Shipping address updated successfully!");
        setViewShippingName(shippingName);
        setViewCompanyName(companyName);
        setViewShippingPhone(shippingPhone);
        setViewStreetAddress(streetAddress);
        setViewCity(city);
        setViewProvince(province);
        setViewZipCode(zipCode);
        setViewCountry(country);
      } else {
        await profileaddress.post("/", shippingAddressData);
        setAddressSuccess("Shipping address saved successfully!");
        setViewShippingName(shippingName);
        setViewCompanyName(companyName);
        setViewShippingPhone(shippingPhone);
        setViewStreetAddress(streetAddress);
        setViewCity(city);
        setViewProvince(province);
        setViewZipCode(zipCode);
        setViewCountry(country);
      }

      setHasAddress(true);
    } catch (error) {
      console.error("Error saving address:", error);
      setAddressError(
        error.response?.data?.message ||
          "Failed to save shipping address. Try again."
      );
    } finally {
      setAddressLoading(false);
    }
  };

  // Update address via PATCH
  const handleViewAddressSubmit = async (e) => {
    e.preventDefault();
    setViewAddressError(null);
    setViewAddressSuccess(null);

    if (!userContext?.user || !userContext.user.id) {
      setViewAddressError("User not logged in or ID missing.");
      return;
    }

    setAddressLoading(true);
    try {
      const shippingAddressData = {
        userId: userContext.user.id,
        shippingAddress: {
          name: viewShippingName,
          companyName: viewCompanyName,
          phoneNumber: viewShippingPhone,
          streetAddress: viewStreetAddress,
          city: viewCity,
          province: viewProvince,
          zipCode: viewZipCode,
          country: viewCountry,
        },
      };

      await profileaddress.put(`/${userContext.user.id}`, shippingAddressData);
      setViewAddressSuccess("Shipping address updated successfully!");
      setShippingName(viewShippingName);
      setCompanyName(viewCompanyName);
      setShippingPhone(viewShippingPhone);
      setStreetAddress(viewStreetAddress);
      setCity(viewCity);
      setProvince(viewProvince);
      setZipCode(viewZipCode);
      setCountry(viewCountry);
      setHasAddress(true);
    } catch (error) {
      console.error("Error updating address:", error);
      setViewAddressError(
        error.response?.data?.message ||
          "Failed to update shipping address. Try again."
      );
    } finally {
      setAddressLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="tab-head">User Profile</h1>
      <Card className="profile-card">
        <Tabs defaultActiveKey="1">
          {/* PROFILE TAB */}
          <TabPane tab="Profile Info" key="1">
            <form onSubmit={handleProfileSubmit}>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8} className="avatar-section">
                  <div className="avatar-preview">
                    {preview ? (
                      <img src={preview} alt="Avatar Preview" />
                    ) : (
                      <span>Upload Avatar</span>
                    )}
                  </div>
                  <CloudinaryUploader
                    cloudName={cloudName}
                    uploadPreset={uploadPreset}
                    onUploadSuccess={handleUploadSuccess}
                    buttonText="Change Avatar"
                    listType="text"
                    maxCount={1}
                    disabled={loading}
                  />
                  {avatarUrl && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="update-btn"
                      size="large"
                      loading={loading}
                      style={{ marginTop: 16 }}
                    >
                      Save Avatar
                    </Button>
                  )}
                </Col>

                <Col xs={24} md={16}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <Input value={name} readOnly className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <Input value={email} readOnly className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <Input value={phone} readOnly className="form-input" />
                  </div>
                </Col>
              </Row>
            </form>
          </TabPane>

          {/* SHIPPING ADDRESS TAB */}
          <TabPane tab="Shipping Address" key="2">
            {addressError && (
              <Alert
                message={addressError}
                type="error"
                showIcon
                closable
                onClose={() => setAddressError(null)}
                style={{ marginBottom: 24 }}
              />
            )}
            {addressSuccess && (
              <Alert
                message={addressSuccess}
                type="success"
                showIcon
                closable
                onClose={() => setAddressSuccess(null)}
                style={{ marginBottom: 24 }}
              />
            )}

            <form onSubmit={handleSubmit}>
              <Row gutter={[24, 16]}>
                <Col span={24} md={12}>
                  <label className="form-label">Name</label>
                  <Input
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={12}>
                  <label className="form-label">Company Name</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Col>
                <Col span={24} md={12}>
                  <label className="form-label">Phone Number</label>
                  <Input
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={12}>
                  <label className="form-label">Address</label>
                  <Input
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={8}>
                  <label className="form-label">City</label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={8}>
                  <label className="form-label">Province</label>
                  <Input
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={8}>
                  <label className="form-label">ZIP</label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24}>
                  <label className="form-label">Country</label>
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </Col>
                {!hasAddress && (
                  <Col span={24} style={{ marginTop: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={addressLoading}
                      size="large"
                    >
                      Save Address
                    </Button>
                  </Col>
                )}
              </Row>
            </form>
          </TabPane>

          {/* VIEW/EDIT ADDRESS TAB */}
          <TabPane tab="View/Edit Address" key="Address">
            {viewAddressError && (
              <Alert
                message={viewAddressError}
                type="error"
                showIcon
                closable
                onClose={() => setViewAddressError(null)}
                style={{ marginBottom: 24 }}
              />
            )}
            {viewAddressSuccess && (
              <Alert
                message={viewAddressSuccess}
                type="success"
                showIcon
                closable
                onClose={() => setViewAddressSuccess(null)}
                style={{ marginBottom: 24 }}
              />
            )}

            <form onSubmit={handleViewAddressSubmit}>
              <Row gutter={[24, 6]}>
                <Col span={24} md={12}>
                  <label className="form-label">Name</label>
                  <Input
                    value={viewShippingName}
                    onChange={(e) => setViewShippingName(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={12}>
                  <label className="form-label">Company Name</label>
                  <Input
                    value={viewCompanyName}
                    onChange={(e) => setViewCompanyName(e.target.value)}
                  />
                </Col>
                <Col span={24} md={12}>
                  <label className="form-label">Phone Number</label>
                  <Input
                    value={viewShippingPhone}
                    onChange={(e) => setViewShippingPhone(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={12}>
                  <label className="form-label">Address</label>
                  <Input
                    value={viewStreetAddress}
                    onChange={(e) => setViewStreetAddress(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={8}>
                  <label className="form-label">City</label>
                  <Input
                    value={viewCity}
                    onChange={(e) => setViewCity(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={8}>
                  <label className="form-label">Province</label>
                  <Input
                    value={viewProvince}
                    onChange={(e) => setViewProvince(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} md={8}>
                  <label className="form-label">ZIP</label>
                  <Input
                    value={viewZipCode}
                    onChange={(e) => setViewZipCode(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24}>
                  <label className="form-label">Country</label>
                  <Input
                    value={viewCountry}
                    onChange={(e) => setViewCountry(e.target.value)}
                    required
                  />
                </Col>
                <Col span={24} style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={addressLoading}
                    size="large"
                  >
                    Update Address
                  </Button>
                  {hasAddress && (
                    <Button
                      type="default"
                      style={{ marginLeft: 16 }}
                      onClick={() => {
                        if (
                          window.confirm("Clear the view/edit address form?")
                        ) {
                          resetViewAddressForm();
                        }
                      }}
                    >
                      Clear Address
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserProfile;