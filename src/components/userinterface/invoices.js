import React, { useEffect, useState } from "react";
import { Table, Typography, Modal, Tag } from "antd";
import "./invoices.css"; // Optional CSS

const { Title } = Typography;

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const loggedInEmail =
    localStorage.getItem("userEmail") || "jawad@example.com";

  useEffect(() => {
    const data = [
      {
        id: "INV001",
        productName: "Mailer Boxes",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        invoiceImage: "https://via.placeholder.com/100x100?text=Invoice+1",
        date: "2025-06-15",
        amount: "$300.00",
        status: "paid",
      },
      {
        id: "INV002",
        productName: "Shipping Boxes",
        customer: "Ali Raza",
        email: "ali@example.com",
        invoiceImage: "https://via.placeholder.com/100x100?text=Invoice+2",
        date: "2025-06-10",
        amount: "$450.00",
        status: "unpaid",
      },
      {
        id: "INV003",
        productName: "Rigid Boxes",
        customer: "Jawad Ahmad",
        email: "jawad@example.com",
        invoiceImage: "https://via.placeholder.com/100x100?text=Invoice+3",
        date: "2025-06-18",
        amount: "$650.00",
        status: "pending",
      },
    ];

    const filtered = data.filter((item) => item.email === loggedInEmail);
    setInvoices(filtered);
  }, [loggedInEmail]);

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "paid":
        return <Tag color="green">PAID</Tag>;
      case "unpaid":
        return <Tag color="red">UNPAID</Tag>;
      case "pending":
        return <Tag color="orange">PENDING</Tag>;
      default:
        return <Tag>UNKNOWN</Tag>;
    }
  };

  const columns = [
    {
      title: "Invoice ID",
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Invoice",
      dataIndex: "invoiceImage",
      key: "invoiceImage",
      render: (imgUrl) => (
        <img
          src={imgUrl}
          alt="Invoice"
          style={{
            width: 80,
            height: 80,
            cursor: "pointer",
            border: "1px solid #ddd",
            borderRadius: 4,
            objectFit: "cover",
          }}
          onClick={() => handlePreview(imgUrl)}
        />
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Invoices</Title>
      <Table
        columns={columns}
        dataSource={invoices}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          alt="Invoice Preview"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default Invoices;
