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
  Modal,
  Descriptions,
} from "antd";
import { orders } from "../../utils/axios";
import { useUser } from "../../contextapi/userContext";
import "./approveddesign.css";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ApprovedDesigns = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
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

  const showDetails = (record) => {
    setSelectedRecord(record);
    setDetailVisible(true);
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
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      width: 100,
      render: (price) => <Text strong>{price}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: getOrderStatus,
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            className="view-details-btn"
            onClick={() => showDetails(record)}
          >
            View Details
          </Button>
          {record.approval === "Pending" && (
            <Space>
              <Button
                size="small"
                type="primary"
                onClick={() => handleApprove(record.key)}
              >
                Approve
              </Button>
              <Button
                size="small"
                danger
                onClick={() => handleReject(record.key)}
              >
                Reject
              </Button>
            </Space>
          )}
        </Space>
      ),
      width: screens.md ? 200 : 150,
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
        <h1 className="tab-head">Design Approvals and Order Status</h1>
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

      {/* Detail View Modal */}
      <Modal
        title="Order Details"
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="back" type="primary" onClick={() => setDetailVisible(false)}>
            Close
          </Button>,
        ]}
        width={screens.md ? 800 : "90%"}
        className="order-details-modal"
        bodyStyle={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
        }}
        style={{
          top: 20,
        }}
      >
        {selectedRecord && (
          <Descriptions
            bordered
            column={screens.md ? 1 : 1}
            size="middle"
            className="order-details-descriptions"
          >
            <Descriptions.Item label="Product Type">
              <Text strong>{selectedRecord.productType}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Material">
              <Text>{selectedRecord.material}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">
              <Text>{selectedRecord.quantity}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Dimensions">
              <Text>{selectedRecord.dimensions}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <Text strong>{selectedRecord.price}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {getOrderStatus(selectedRecord.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Approval Status">
              {getStatusTag(selectedRecord.approval)}
            </Descriptions.Item>
            <Descriptions.Item label="Tracking ID">
              {selectedRecord.trackingid !== "Not assigned" ? (
                <a
                  href={`https://www.dhl.com/in-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${selectedRecord.trackingid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1890ff" }}
                >
                  {selectedRecord.trackingid}
                </a>
              ) : (
                <Text type="secondary">{selectedRecord.trackingid}</Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Shipped Via">
              <Text>{selectedRecord.shippedvia}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Design File">
              {selectedRecord.uploadFile ? (
                <Button
                  type="link"
                  href={selectedRecord.uploadFile}
                  target="_blank"
                  icon={<i className="fas fa-file-download" />}
                  style={{ padding: 0 }}
                >
                  Download File
                </Button>
              ) : (
                <Text type="secondary">No file available</Text>
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default ApprovedDesigns;