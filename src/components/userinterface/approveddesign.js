import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Typography,
  Space,
  Tag,
  message,
  Card,
  Grid,
  Badge,
} from "antd";
import { orders } from "../../utils/axios";
import { useUser } from "../../contextapi/userContext";
import "./approveddesign.css";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ApprovedDesigns = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const screens = useBreakpoint();

  const loggedInUserId =
    user?.user?._id || user?.user?.id || user?._id || user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedInUserId) {
        message.warning("Please log in to view your orders.");
        return;
      }

      setLoading(true);
      try {
        const response = await orders.get(`/user/${loggedInUserId}`);
         

        if (response.data?.length > 0) {
          const formattedData = response.data.map((item) => ({
            key: item._id,
            name: item.shippingAddress?.[0]?.name || "Unknown",
            productType: item.product,
            quantity: item.quantity,
            material: item.material || "Not specified",
            dimensions: item.size
              ? `${item.size.length}×${item.size.width}×${item.size.height} in`
              : "Not specified",
            uploadFile: item.file,
            status: item.status,
            approval: item.approvedStatus,
            trackingid: item.trackingid || "Not assigned",
            price: item.price
              ? `£${item.price.toLocaleString("en-GB")}`
              : "Not specified",
            shippedvia: item.shippedvia || "Not shipped",
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }));

          setData(formattedData);
        } else {
          setData([]);
          message.info("No orders found for this user.");
        }
      } catch (error) {
        console.error("Error:", error);
        message.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedInUserId]);

  const handleApprove = async (id) => {
    try {
      await orders.patch(`/${id}`, { approvedStatus: "Approved" });
      setData(
        data.map((item) =>
          item.key === id ? { ...item, approval: "Approved" } : item
        )
      );
      message.success("Design approved!");
    } catch (error) {
      console.error("Approve error:", error);
      message.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await orders.patch(`/${id}`, { approvedStatus: "Rejected" });
      setData(
        data.map((item) =>
          item.key === id ? { ...item, approval: "Rejected" } : item
        )
      );
      message.warning("Design rejected");
    } catch (error) {
      console.error("Reject error:", error);
      message.error("Rejection failed");
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "Approved":
        return <Tag color="green">Approved</Tag>;
      case "Rejected":
        return <Tag color="red">Rejected</Tag>;
      case "under_production":
        return <Tag color="blue">In Production</Tag>;
      default:
        return <Tag color="orange">Pending</Tag>;
    }
  };

  const getOrderStatus = (status) => {
    switch (status) {
      case "Shipped":
        return <Badge status="success" text="Shipped" />;
      case "Processing":
        return <Badge status="processing" text="Processing" />;
      default:
        return <Badge status="default" text="Pending" />;
    }
  };

  const columns = [
    {
      title: "Sr. No",
      key: "serialNo",
      render: (text, record, index) => {
        const current = pagination.current || 1;
        const pageSize = pagination.pageSize || 5;
        return <Text strong>{(current - 1) * pageSize + index + 1}</Text>;
      },
      align: "center",
      width: 80,
    },
    {
      title: "Product",
      dataIndex: "productType",
      key: "productType",
      width: 120,
    },
    screens.md && {
      title: "Material",
      dataIndex: "material",
      key: "material",
      width: 120,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 80,
    },
    screens.md && {
      title: "Dimensions",
      dataIndex: "dimensions",
      key: "dimensions",
      width: 120,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      width: 100,
      render: (price) => <Text strong>{price}</Text>,
    },
    {
      title: "File",
      dataIndex: "uploadFile",
      key: "uploadFile",
      render: (file) =>
        file ? (
          <Button
            type="link"
            href={file}
            target="_blank"
            icon={<i className="fas fa-file-download" />}
            size="small"
          >
            {screens.md ? "View File" : "File"}
          </Button>
        ) : (
          <Text type="secondary">No file</Text>
        ),
      width: screens.md ? 120 : 80,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: getOrderStatus,
      width: 120,
    },
    screens.md && {
      title: "Tracking ID",
      dataIndex: "trackingid",
      key: "trackingId",
      width: 150,
      render: (trackingId) =>
        trackingId !== "Not assigned" ? (
          <a
            href={`https://www.dhl.com/in-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${trackingId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {trackingId}
          </a>
        ) : (
          <Text type="secondary">{trackingId}</Text>
        ),
    },
    screens.md && {
      title: "Shipped Via",
      dataIndex: "shippedvia",
      key: "shippedVia",
      width: 120,
      render: (shippedVia) => <Text>{shippedVia}</Text>,
    },
    {
      title: "Action",
      dataIndex: "approval",
      key: "approval",
      render: (approval, record) =>
        approval === "Pending" ? (
          <Space size="small">
            <Button
              size="small"
              type="primary"
              onClick={() => handleApprove(record.key)}
            >
              {screens.md ? "Approve" : "✓"}
            </Button>
            <Button
              size="small"
              danger
              onClick={() => handleReject(record.key)}
            >
              {screens.md ? "Reject" : "✗"}
            </Button>
          </Space>
        ) : (
          getStatusTag(approval)
        ),
      width: screens.md ? 150 : 100,
    },
  ].filter(Boolean);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    responsive: true,
  });

  if (!loggedInUserId) {
    return (
      <Card className="auth-message">
        <Title level={4}>Order Management</Title>
        <Text>Please login to view your designs</Text>
      </Card>
    );
  }

  return (
    <div className="approved-designs-container">
      <div className="page-header">
        <Title level={3}>Design Approvals and Order Status</Title>
       </div>

      <Card bordered={false} className="table-card">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={pagination}
          onChange={(newPagination) => setPagination(newPagination)}
          scroll={{ x: true }}
          rowClassName={(record) => `status-${record.approval.toLowerCase()}`}
          size={screens.md ? "default" : "small"}
        />
      </Card>
    </div>
  );
};

export default ApprovedDesigns;
