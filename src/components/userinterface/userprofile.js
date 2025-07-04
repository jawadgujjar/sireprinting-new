import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Upload, message, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUser } from "../../contextapi/userContext";
import "./userprofile.css";

const { Title } = Typography;

const UserProfile = () => {
  const { user } = useUser();
  // console.log(user,"user ka data")
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user?.user) {
      const currentUser = user.user;
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      setPreview(currentUser.avatarUrl || "https://i.pravatar.cc/300?u=" + currentUser.email);
    }
  }, [user]);

  const handleAvatarChange = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
      message.error("You can only upload image files!");
    }
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }

    return isImage && isLt2M;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to API for actual update
    message.success("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <h1 className="tab-head">User Profile</h1>
      
      <Card className="profile-card">
        <form className="profile-form" onSubmit={handleSubmit}>
          <Row gutter={[32, 32]}>
            {/* Avatar Column */}
            <Col xs={24} md={8} className="avatar-section">
              <div className="avatar-preview">
                {preview ? (
                  <img src={preview} alt="Avatar Preview" />
                ) : (
                  <span>Upload Avatar</span>
                )}
              </div>
              <Upload
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleAvatarChange}
                accept="image/*"
                multiple={false}
              >
                <Button 
                  icon={<UploadOutlined />} 
                  className="upload-btn" 
                  block
                  type="primary"
                >
                  Change Avatar
                </Button>
              </Upload>
            </Col>

            {/* User Info Column */}
            <Col xs={24} md={16} className="info-section">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <Input 
                  value={name} 
                  disabled 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <Button 
                type="primary" 
                htmlType="submit" 
                className="update-btn"
                size="large"
              >
                Update Profile
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default UserProfile;