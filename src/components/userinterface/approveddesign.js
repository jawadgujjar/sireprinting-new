import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Space, Tag } from "antd";
import "./approveddesign.css";

const { Title } = Typography;

const ApprovedDesigns = () => {
  const [data, setData] = useState([]);

  // Use hardcoded user for demo
  const loggedInEmail =
    localStorage.getItem("userEmail") || "jawad@example.com";

  useEffect(() => {
    const fetchData = async () => {
      const res = [
        {
          id: "1",
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
        },
        {
          id: "2",
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
        },
      ];

      const filtered = res.filter((item) => item.email === loggedInEmail);
      setData(filtered);
    };

    fetchData();
  }, [loggedInEmail]);

  const handleApprove = (id) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, designApproved: true } : item
    );
    setData(updated);
  };

  const handleReject = (id) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, designApproved: false } : item
    );
    setData(updated);
  };

  const columns = [
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
          // 👇 Demo image preview (replace src with your actual file path when ready)
          return (
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
          );
        } else {
          return <span style={{ color: "#888" }}>{file}</span>; // no link, no icon
        }
      },
    },
    {
      title: "Status",
      dataIndex: "designApproved",
      key: "designApproved",
      render: (_, record) => {
        if (record.designApproved === true) {
          return <Tag color="green">Approved</Tag>;
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
