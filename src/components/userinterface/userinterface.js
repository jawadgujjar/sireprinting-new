import React from "react";
import { Tabs } from "antd";
import "./userinterface.css";
import ApprovedDesigns from "./approveddesign";
import OrderStatus from "./orderstatus";
import OrderHistory from "./orderhistory";
import Invoices from "./invoices";
import SampleQuote from "./samplequote"; // Make sure to create this component
import Userdetail from "./userdetail";
import Samplequote from "./samplequote";

const { TabPane } = Tabs;

const Userinterface = () => {
  return (
    <div className="userinterface-container">
      <h1 className="userinterface-heading">User Dashboard</h1>
      <Tabs defaultActiveKey="1" type="card" className="user-tabs">
        {/* <TabPane tab="Order Status" key="2">
          <OrderStatus />
        </TabPane> */}
        <TabPane tab="Approved Designs and status" key="1">
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
        {/* <TabPane tab="Personal Details" key="6">
          <Userdetail />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default Userinterface;