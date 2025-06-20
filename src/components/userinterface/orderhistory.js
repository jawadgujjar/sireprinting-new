import React, { useEffect, useState } from "react";
import { Table, Typography, Tag, Button, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import "./orderhistory.css"; // Optional CSS

const { Title } = Typography;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const loggedInEmail =
    localStorage.getItem("userEmail") || "jawad@example.com";

  useEffect(() => {
    const data = [
      {
        id: "OH001",
        product: "Mailer Boxes",
        material: "Kraft Paper",
        quantity: 500,
        length: 10,
        width: 8,
        height: 4,
        file: "design1.jpg",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        status: "delivered",
      },
      {
        id: "OH002",
        product: "Shipping Boxes",
        material: "Corrugated",
        quantity: 1000,
        length: 15,
        width: 10,
        height: 5,
        file: "shipping_file.pdf",
        customer: "Ali Raza",
        email: "ali@example.com",
        status: "cancelled",
      },
      {
        id: "OH003",
        product: "Custom Display Boxes",
        material: "Rigid Board",
        quantity: 300,
        length: 12,
        width: 9,
        height: 3,
        file: "displaybox.jpg",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        status: "pending",
      },
      {
        id: "OH004",
        product: "Tuck End Boxes",
        material: "Cardboard",
        quantity: 750,
        length: 11,
        width: 7,
        height: 2,
        file: "tuckend.jpg",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        status: "delivered",
      },
      {
        id: "OH005",
        product: "Sleeve Boxes",
        material: "Art Paper",
        quantity: 200,
        length: 8,
        width: 6,
        height: 4,
        file: "sleevefile.pdf",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        status: "pending",
      },
    ];

    const filtered = data.filter((item) => item.email === loggedInEmail);
    setOrders(filtered);
  }, [loggedInEmail]);

  const handleReorder = (record) => {
    console.log("Re-ordering:", record);
    // Add API call or redirect logic here
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Size (L×W×H)",
      key: "size",
      render: (_, record) =>
        `${record.length} × ${record.width} × ${record.height} in`,
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file) => {
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
        return isImage ? (
          <img
            src="https://via.placeholder.com/80"
            alt="design"
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 4,
              border: "1px solid #ddd",
            }}
          />
        ) : (
          <span style={{ color: "#888" }}>{file}</span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let color = "default";
        if (status === "delivered") color = "green";
        else if (status === "pending") color = "orange";
        else if (status === "cancelled") color = "red";

        return (
          <Space>
            <Tag color={color}>{status.toUpperCase()}</Tag>
            {status === "delivered" && (
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                size="small"
                onClick={() => handleReorder(record)}
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  fontWeight: 500,
                }}
              >
                Re-Order
              </Button>
            )}
          </Space>
        );
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
