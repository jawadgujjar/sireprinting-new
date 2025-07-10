import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Tag,
  Button,
  Space,
  Image,
  message,
  Card,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { orders, sampleorder } from "../../utils/axios";
import { useUser } from "../../contextapi/userContext";
import "./approveddesign.css";

const { Text } = Typography;

const OrderHistory = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    responsive: true,
  });
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const loggedInUserId =
    user?.user?._id || user?.user?.id || user?._id || user?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!loggedInUserId) {
        message.warning("Please log in to view your orders.");
        return;
      }

      setLoading(true);
      try {
        const response = await orders.get(`/user/${loggedInUserId}`);
        console.log("Raw GET response:", response.data); // Debug: Check raw response

        if (response.data?.length > 0) {
          const formatted = response.data.map((item, index) => ({
            key: item._id,
            serialNo: index + 1,
            trackingid: item.trackingid || "Not assigned",
            product: item.product,
            material: item.material || "Not specified",
            quantity: item.quantity,
            length: item.size?.length || 0,
            width: item.size?.width || 0,
            height: item.size?.height || 0,
            file: item.file,
            status: item.status,
            price: item.price || 0, // Add price for re-order
            shippingAddress: item.shippingAddress?.[0] || {}, // Extract first object from array
          }));
          setOrdersData(formatted);
        } else {
          setOrdersData([]);
          message.info("No orders found.");
        }
      } catch (error) {
        console.error("Order fetch error:", error);
        message.error("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [loggedInUserId]);

  const handleReorder = async (record) => {
    try {
      // Validate shippingAddress
      if (!record.shippingAddress || Object.keys(record.shippingAddress).length === 0) {
        message.warning("Shipping address is missing. Please update the order with a valid address.");
        return;
      }

      const reorderData = {
        userId: loggedInUserId,
        product: record.product,
        quantity: record.quantity,
        material: record.material,
        size: {
          length: record.length,
          width: record.width,
          height: record.height,
          unit: "in",
        },
        file: record.file,
        price: record.price || 0,
        shippingAddress: record.shippingAddress, // Send as single object
      };

      console.log("Reorder payload:", reorderData); // Debug: Log payload

      const response = await sampleorder.post("/", reorderData);
      console.log("POST response:", response.data); // Debug: Log response

      if (response.status === 201 || response.status === 200) {
        message.success(`Re-order placed for: ${record.product}`);
      } else {
        message.error("Something went wrong while reordering.");
      }
    } catch (error) {
      console.error("Reorder error:", error.response?.data || error.message);
      message.error("Failed to place reorder.");
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
      title: "Tracking ID",
      dataIndex: "trackingid",
      key: "trackingid",
      render: (trackingid) =>
        trackingid !== "Not assigned" ? (
          <a
            href={`https://www.dhl.com/in-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${trackingid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {trackingid}
          </a>
        ) : (
          <Text type="secondary">{trackingid}</Text>
        ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Dimensions",
      key: "dimensions",
      render: (_, record) =>
        `${record.length} × ${record.width} × ${record.height} in`,
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (file) => {
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
        return isImage ? (
          <Image
            width={80}
            height={80}
            src={file}
            alt="Design Preview"
            style={{
              objectFit: "cover",
              border: "1px solid #ddd",
              borderRadius: 4,
            }}
            preview={{ mask: "Click to Preview" }}
          />
        ) : (
          <a href={file} target="_blank" rel="noopener noreferrer">
            {file}
          </a>
        );
      },
    },
    // {
    //   title: "Shipping Address",
    //   dataIndex: "shippingAddress",
    //   key: "shippingAddress",
    //   render: (shippingAddress) =>
    //     shippingAddress && Object.keys(shippingAddress).length > 0
    //       ? `${shippingAddress.name}, ${shippingAddress.streetAddress}, ${shippingAddress.city}, ${shippingAddress.province} ${shippingAddress.zipCode}, ${shippingAddress.country}`
    //       : "Not provided",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const lowerStatus = status?.toLowerCase();
        let color = "default";

        if (lowerStatus === "delivered") color = "green";
        else if (lowerStatus === "pending") color = "orange";
        else if (lowerStatus === "cancelled") color = "red";
        else if (lowerStatus === "shipped") color = "blue";

        return (
          <Space>
            <Tag color={color}>{status?.toUpperCase()}</Tag>
            {["delivered", "shipped"].includes(lowerStatus) && (
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                size="small"
                onClick={() => handleReorder(record)}
              >
                Re-Order
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="approved-designs-container">
      <div className="page-header">
        <h1 className="tab-head">Order History</h1>
      </div>
      <Card bordered={false} className="table-card">
        <Table
          columns={columns}
          dataSource={ordersData}
          rowKey="key"
          loading={loading}
          pagination={pagination}
          onChange={(newPagination) => setPagination(newPagination)}
          scroll={{ x: true }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default OrderHistory;