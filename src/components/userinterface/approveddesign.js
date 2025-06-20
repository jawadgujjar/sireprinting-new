import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Space, Tag } from "antd";
import dayjs from "dayjs"; // npm install dayjs
import "./approveddesign.css";

const { Title } = Typography;

const ApprovedDesigns = () => {
  const [data, setData] = useState([]);

  const loggedInEmail =
    localStorage.getItem("userEmail") || "jawad@example.com";

  useEffect(() => {
    const fetchData = async () => {
      const res = [
        {
          id: "1",
          orderId: "ORD-001",
          name: "Jawad Ahmad",
          email: "jawad@example.com",
          productType: "Mailer Boxes",
          quantity: 500,
          material: "Kraft Paper",
          length: "10",
          width: "8",
          height: "4",
          uploadFile: "design-file.pdf",
          designApproved: null, // Initially pending
          approvedAt: null,
        },
        {
          id: "2",
          orderId: "ORD-002",
          name: "Ali Raza",
          email: "ali@example.com",
          productType: "Shipping Boxes",
          quantity: 1000,
          material: "Corrugated",
          length: "15",
          width: "10",
          height: "5",
          uploadFile: "design2.jpg",
          designApproved: false,
          approvedAt: null,
        },
      ];

      const filtered = res.filter((item) => item.email === loggedInEmail);
      setData(filtered);
    };

    fetchData();
  }, [loggedInEmail]);

  // ✅ Auto-update to "Under Production" after 24 hours
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = data.map((item) => {
        if (
          item.designApproved === true &&
          item.approvedAt &&
          dayjs().diff(dayjs(item.approvedAt), "hour") >= 24
        ) {
          return { ...item, designApproved: "under_production" };
        }
        return item;
      });
      setData(updated);
    }, 60 * 1000); // check every 1 minute

    return () => clearInterval(interval);
  }, [data]);

  const handleApprove = (id) => {
    const updated = data.map((item) =>
      item.id === id
        ? {
            ...item,
            designApproved: true,
            approvedAt: new Date().toISOString(),
          }
        : item
    );
    setData(updated);
  };

  const handleReject = (id) => {
    const updated = data.map((item) =>
      item.id === id
        ? { ...item, designApproved: false, approvedAt: null }
        : item
    );
    setData(updated);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
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
      dataIndex: "designApproved",
      key: "designApproved",
      render: (_, record) => {
        if (record.designApproved === "under_production") {
          return <Tag color="blue">Under Production</Tag>;
        } else if (record.designApproved === true) {
          return <Tag color="gold">Forwarded to Production</Tag>;
        } else if (record.designApproved === false) {
          return <Tag color="red">Rejected</Tag>;
        } else {
          return (
            <Space>
              <Button
                type="primary"
                size="small"
                onClick={() => handleApprove(record.id)}
              >
                Accept
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleReject(record.id)}
              >
                Reject
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={3}>Approved Designs</Title>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ApprovedDesigns;
