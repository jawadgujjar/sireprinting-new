import React, { useEffect, useState } from "react";
import { Table, Typography, Modal } from "antd";
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
      },
      {
        id: "INV002",
        productName: "Shipping Boxes",
        customer: "Ali Raza",
        email: "ali@example.com",
        invoiceImage: "https://via.placeholder.com/100x100?text=Invoice+2",
      },
    ];

    const filtered = data.filter((item) => item.email === loggedInEmail);
    setInvoices(filtered);
  }, [loggedInEmail]);

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

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
