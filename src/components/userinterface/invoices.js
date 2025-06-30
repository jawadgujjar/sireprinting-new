import { useEffect, useState } from "react";
import { Table, Button, Image, Modal, Typography, message, Card } from "antd";
import { orders } from "../../utils/axios";
import { useUser } from "../../contextapi/userContext";
import "./approveddesign.css";

const { Title, Text } = Typography;

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { user } = useUser();
  const loggedInUserId =
    user?.user?._id || user?.user?.id || user?._id || user?.id;

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!loggedInUserId) {
        message.warning("Please log in to view your invoices.");
        return;
      }

      setLoading(true);
      try {
        const response = await orders.get(`/user/${loggedInUserId}`);

        if (response.data?.length > 0) {
          const formatted = response.data.map((item, index) => ({
            key: item._id,
            serialNo: index + 1,
            trackingId: item.trackingid || "Not assigned",
            productName: item.product || "N/A",
            price: item.price
              ? `Rs. ${Number(item.price).toLocaleString("en-PK")}`
              : "Not specified",
            invoiceImage: item.invoiceImage || "", // make sure this field exists in backend
          }));
          setInvoices(formatted);
        } else {
          setInvoices([]);
          message.info("No invoices found.");
        }
      } catch (error) {
        console.error("Fetch invoices error:", error);
        message.error("Failed to load invoices.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [loggedInUserId]);

  const handlePreview = (img) => {
    setPreviewImage(img);
    setPreviewVisible(true);
  };

  const columns = [
    {
      title: "Sr. No",
      key: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tracking ID",
      dataIndex: "trackingId",
      key: "trackingId",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Invoice",
      dataIndex: "invoiceImage",
      key: "invoiceImage",
      render: (img) =>
        img ? (
          <Image
            width={60}
            src={img}
            preview={false}
            onClick={() => handlePreview(img)}
            style={{ cursor: "pointer", border: "1px solid #eee", borderRadius: 4 }}
          />
        ) : (
          <Text type="secondary">No image</Text>
        ),
    },
    {
      title: "Download",
      dataIndex: "invoiceImage",
      key: "download",
      render: (img) =>
        img ? (
          <a href={img} download target="_blank" rel="noreferrer">
            <Button type="primary">Download</Button>
          </a>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
    },
  ];

  return (
    <div className="approved-designs-container">
      <div className="page-header">
        <Title level={3}>Your Invoices</Title>
      </div>
      <Card bordered={false} className="table-card">
        <Table
          columns={columns}
          dataSource={invoices}
          rowKey="key"
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </Card>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={600}
      >
        <img
          alt="Invoice Preview"
          style={{ width: "100%", borderRadius: 8 }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default Invoices;
