import React, { useEffect, useState } from "react";
import { Table, Button, Image as AntdImage, Modal, Typography, message, Card } from "antd";
import { orders } from "../../utils/axios";
import { useUser } from "../../contextapi/userContext";
import jsPDF from "jspdf";
import "./approveddesign.css";

const { Text } = Typography;

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
            trackingId: item.trackingid || "Not assigned",
            productName: item.product || "N/A",
            price: item.price
              ? `Rs. ${Number(item.price).toLocaleString("en-PK")}`
              : "Not specified",
            invoice: item.invoice || "",
          }));
          setInvoices(formatted);
        } else {
          setInvoices([]);
          message.info("No invoices found.");
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        message.error("Failed to load invoices.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [loggedInUserId]);

  const handlePreview = (url) => {
    if (!url) {
      message.error("No invoice image available.");
      return;
    }
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  const handleDownloadPDF = (url, id) => {
    if (!url) {
      message.error("No invoice URL provided.");
      return;
    }

    console.log("Generating PDF for URL:", url, "ID:", id);

    const img = new window.Image(); // Using window.Image to avoid conflict
    img.crossOrigin = "anonymous";
    img.src = url;

    img.onload = () => {
      try {
        const pdf = new jsPDF();
        const width = 180;
        const height = (img.height * width) / img.width;
        pdf.addImage(img, "JPEG", 15, 15, width, height);
        pdf.save(`Invoice_${id || "invoice"}.pdf`);
        message.success("PDF downloaded successfully.");
      } catch (error) {
        console.error("Error generating PDF:", error);
        message.error("Failed to generate PDF.");
      }
    };

    img.onerror = () => {
      message.error("Failed to load invoice image for PDF.");
    };
  };

  const columns = [
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
      key: "invoice",
      render: (_, record) =>
        record.invoice ? (
          <AntdImage
            width={60}
            src={record.invoice}
            preview={false}
            onClick={() => handlePreview(record.invoice)}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <Text type="secondary">No image</Text>
        ),
    },
    {
      title: "Download",
      key: "download",
      render: (_, record) =>
        record.invoice ? (
          <Button
            type="primary"
            onClick={() => handleDownloadPDF(record.invoice, record.trackingId)}
          >
            Download PDF
          </Button>
        ) : (
          <Text type="secondary">N/A</Text>
        ),
    },
  ];

  return (
    <div className="approved-designs-container">
      <h1 className="tab-head">Your Invoices</h1>
      <Card>
        <Table
          columns={columns}
          dataSource={invoices}
          rowKey="key"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={600}
      >
        <img src={previewImage} alt="Invoice" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

export default Invoices;