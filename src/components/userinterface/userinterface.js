import React from "react";
import {
  Tabs,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Avatar,
  message
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  HistoryOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./userinterface.css";
import ApprovedDesigns from "./approveddesign";
import OrderHistory from "./orderhistory";
import Invoices from "./invoices";
import Samplequote from "./samplequote";
import UserProfile from "./userprofile";
import { useUser } from "../../contextapi/userContext";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Userinterface = () => {
  const [activeTab, setActiveTab] = React.useState("1");
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = React.useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      logoutUser(); // Call the logout function from your context
      message.success("Logged out successfully");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      message.error("Failed to logout");
      console.error("Logout error:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "1":
        return <UserProfile />;
      case "2":
        return <ApprovedDesigns />;
      case "3":
        return <OrderHistory />;
      case "4":
        return <Invoices />;
      case "5":
        return <Samplequote />;
      default:
        return <UserProfile />;
    }
  };

  const currentUser = user?.user;

  return (
    <div className="userinterface-container">
      <Row gutter={24}>
        {/* Left Column (Sidebar) */}
        <Col xs={24} sm={24} md={9} lg={8} xl={7}>
          <Card className="profile-card">
            {/* User Avatar & Info */}
            <div className="user-profile-section">
              <Avatar size={80} className="user-avatar">
                {currentUser?.name?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Title level={4} className="user-name">
                {currentUser?.name}
              </Title>
              <Text className="user-email">{currentUser?.email}</Text>
            </div>

            {/* Tabs with Icons */}
            <Tabs
              activeKey={activeTab}
              tabPosition="left"
              className="vertical-tabs"
              onChange={handleTabChange}
            >
              <TabPane
                tab={
                  <div className="tab-item">
                    <UserOutlined className="tab-icon" />
                    <span className="tab-text">Profile</span>
                  </div>
                }
                key="1"
              />
              <TabPane
                tab={
                  <div className="tab-item">
                    <CheckCircleOutlined className="tab-icon" />
                    <span className="tab-text">Approved Designs</span>
                  </div>
                }
                key="2"
              />
              <TabPane
                tab={
                  <div className="tab-item">
                    <HistoryOutlined className="tab-icon" />
                    <span className="tab-text">Order History</span>
                  </div>
                }
                key="3"
              />
              <TabPane
                tab={
                  <div className="tab-item">
                    <FileTextOutlined className="tab-icon" />
                    <span className="tab-text">Invoices</span>
                  </div>
                }
                key="4"
              />
              <TabPane
                tab={
                  <div className="tab-item">
                    <FileSearchOutlined className="tab-icon" />
                    <span className="tab-text">Sample Quote</span>
                  </div>
                }
                key="5"
              />
            </Tabs>

            {/* Logout Button */}
            <div className="logout-tab-style">
              <Button
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="logout-tab-button"
                block
                size="large"
                loading={logoutLoading}
              >
                {logoutLoading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </Card>
        </Col>

        {/* Right Column - Tab Content */}
        <Col xs={24} sm={24} md={15} lg={16} xl={17}>
          <Card className="content-card">
            <div className="tab-content-wrapper">{renderTabContent()}</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Userinterface;