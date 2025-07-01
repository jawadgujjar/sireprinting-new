import React, { useEffect, useState } from "react";
import { Table, Tag, Typography, Modal } from "antd";
import "./orderstatus.css";

const { Title } = Typography;

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const loggedInEmail =
    localStorage.getItem("userEmail") || "jawad@example.com";

  useEffect(() => {
    const res = [
      {
        id: "101",
        name: "Jawad Ahmad",
        email: "jawad@example.com",
        productType: "Mailer Boxes",
        material: "Kraft Paper",
        quantity: 500,
        length: "10",
        width: "8",
        height: "4",
        uploadFile: "design1.jpg",
        orderDate: "2025-06-15",
        status: "pending",
      },
      {
        id: "102",
        name: "Jawad Ahmad",
        email: "jawad@example.com",
        productType: "Shipping Boxes",
        material: "Corrugated",
        quantity: 1000,
        length: "15",
        width: "10",
        height: "5",
        uploadFile: "design2.jpg",
        orderDate: "2025-06-10",
        status: "shipped",
      },
      {
        id: "103",
        name: "Ali Raza",
        email: "ali@example.com",
        productType: "Product Boxes",
        material: "White Cardstock",
        quantity: 300,
        length: "12",
        width: "9",
        height: "6",
        uploadFile: "design3.png",
        orderDate: "2025-06-05",
        status: "delivered",
      },
    ];

    const filtered = res.filter((order) => order.email === loggedInEmail);
    setOrders(filtered);
  }, [loggedInEmail]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product",
      dataIndex: "productType",
      key: "productType",
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
      key: "dimensions",
      render: (_, record) =>
        `${record.length} × ${record.width} × ${record.height} in`,
    },
    {
      title: "File",
      dataIndex: "uploadFile",
      key: "uploadFile",
      render: (file) => {
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
        if (isImage) {
          return (
            <img
              src="https://via.placeholder.com/80"
              alt="design"
              onClick={() => {
                setPreviewImage("https://via.placeholder.com/300");
                setIsModalOpen(true);
              }}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 4,
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            />
          );
        } else {
          return <span style={{ color: "#888" }}>{file}</span>;
        }
      },
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "pending") color = "orange";
        else if (status === "shipped") color = "blue";
        else if (status === "delivered") color = "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Title level={3}>Order Tracking</Title>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Image Preview Modal */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <img
          alt="Preview"
          src={previewImage}
          style={{ width: "100%", borderRadius: 6 }}
        />
      </Modal>
    </div>
  );
};

export default OrderStatus;
