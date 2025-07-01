import React from "react";
import { Tabs } from "antd";
import "./userinterface.css";
import ApprovedDesigns from "./approveddesign";
import OrderStatus from "./orderstatus";
import OrderHistory from "./orderhistory";
import Invoices from "./invoices";
import Samplequote from "./samplequote";
import Userdetail from "./userdetail";
import UserProfile from "./userprofile"; // ✅ Add this line

const { TabPane } = Tabs;

const Userinterface = () => {
  return (
    <div className="userinterface-container">
      <div className="dashboard-content">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          className="user-tabs"
          tabBarStyle={{ width: 200 }}
        >
          <TabPane tab="Profile" key="1">  
            <UserProfile />
          </TabPane>
          <TabPane tab="Approved Designs" key="2">
            <ApprovedDesigns />
          </TabPane>
          <TabPane tab="Order History" key="3">
            <OrderHistory />
          </TabPane>
          <TabPane tab="Invoices" key="4">
            <Invoices />
          </TabPane>
          <TabPane tab="Sample Quote" key="5">
            <Samplequote />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Userinterface;
