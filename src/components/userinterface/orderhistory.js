import React, { useEffect, useState } from "react";
import { Table, Typography, Tag } from "antd";
import "./orderhistory.css"; // Optional CSS

const { Title } = Typography;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // 🧪 Dummy login (replace with real logic later)
  const loggedInEmail =
    localStorage.getItem("userEmail") || "jawad@example.com";

  useEffect(() => {
    // 👇 Hardcoded data for all users
    const data = [
      {
        id: "OH001",
        productName: "Mailer Boxes",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        status: "delivered",
      },
      {
        id: "OH002",
        productName: "Shipping Boxes",
        customer: "Ali Raza",
        email: "ali@example.com",
        status: "cancelled",
      },
      {
        id: "OH003",
        productName: "Custom Boxes",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        status: "pending",
      },
    ];

    // 🔐 Filter only orders for logged-in user
    const filtered = data.filter((item) => item.email === loggedInEmail);
    setOrders(filtered);
  }, [loggedInEmail]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "delivered") color = "green";
        else if (status === "pending") color = "orange";
        else if (status === "cancelled") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Title level={3}>Order History</Title>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OrderHistory;
