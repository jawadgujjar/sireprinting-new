import { useState } from "react";
import { Table, Button, Image, Modal, Typography } from "antd";
const { Title } = Typography;

const Invoices = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const invoices = [
    {
      orderId: "ORD-001",
      productName: "Custom Packaging Box",
      customerName: "Ali Khan",
      totalAmount: "Rs. 5,000",
      invoiceImage:
        "https://res.cloudinary.com/demo/image/upload/v1710000000/sample-invoice.png",
    },
  ];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
    },
    {
      title: "Product",
      dataIndex: "productName",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    {
      title: "Invoice",
      dataIndex: "invoiceImage",
      render: (img) => (
        <Image
          width={60}
          src={img}
          preview={false}
          onClick={() => {
            setPreviewImage(img);
            setPreviewVisible(true);
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      title: "Download",
      dataIndex: "invoiceImage",
      render: (img) => (
        <a href={img} download target="_blank" rel="noreferrer">
          <Button type="primary">Download</Button>
        </a>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>Your Invoices</Title>
      <Table columns={columns} dataSource={invoices} rowKey="orderId" />
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Invoice Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Invoices;
