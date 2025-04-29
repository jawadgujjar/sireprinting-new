import React, { useState } from "react";
import { Button, Form, Select, Input, Row, Col, message } from "antd";
import { getquote } from "../../utils/axios";
import FileUpload from "../productform/fileupload";
import "./productform.css";

const { Option } = Select;

function Productform1() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    setLoading(true);
    if (!values.uploadFile) {
      message.error("Please upload a file before submitting!");
      setLoading(false);
      return;
    }

    try {
      const response = await getquote.post("/", values);
      message.success("Form submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.error("API Error: ", error);
      message.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ultra-compact-form">
      <div className="form-header">
        <h2 className="form-title-main">BEAT MY QUOTE</h2>
      </div>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* Dimensions Section */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item name="length">
              <Input
                className="ultra-compact-input"
                placeholder="Length"
                // suffix={<span className="unit-suffix">in</span>}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item name="width">
              <Input
                className="ultra-compact-input"
                placeholder="Width"
                // suffix={<span className="unit-suffix">in</span>}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item name="depth">
              <Input
                className="ultra-compact-input"
                placeholder="Depth"
                // suffix={<span className="unit-suffix">in</span>}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="inches" className="unit-selector">
          <Select className="ultra-compact-select" defaultValue="inches">
            <Option value="inches">Inches</Option>
            <Option value="cm">cm</Option>
            <Option value="mm">mm</Option>
          </Select>
        </Form.Item>

        {/* Product Selection */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Form.Item name="chooseProduct" label="PRODUCT">
              <Select className="ultra-compact-select" placeholder="Select">
                <Option value="mailer">Mailer Boxes</Option>
                <Option value="poly">Poly Mailers</Option>
                <Option value="shipping">Shipping Boxes</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="colors" label="COLOR">
              <Select className="ultra-compact-select" placeholder="Select">
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Details Section */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={8}>
            <Form.Item name="quantity">
              <Input
                className="ultra-compact-input"
                type="number"
                placeholder="Quantity"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="phoneNumber">
              <Input
                className="ultra-compact-input"
                placeholder="Enter Phone"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="fullName">
              <Input className="ultra-compact-input" placeholder="Enter Name" />
            </Form.Item>
          </Col>
        </Row>

        {/* Contact Section */}
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Form.Item name="email" label="EMAIL">
              <Input
                className="ultra-compact-input"
                type="email"
                placeholder="Email"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="uploadFile" label="FILE">
              <FileUpload
                onUploadSuccess={(url) =>
                  form.setFieldsValue({ uploadFile: url })
                }
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Message Section */}
        <Form.Item name="message" label="NOTES">
          <Input.TextArea
            className="ultra-compact-textarea"
            placeholder="Special instructions..."
            rows={2}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="ultra-compact-submit-btn"
            loading={loading}
          >
            {loading ? "PROCESSING..." : "GET QUOTE"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Productform1;
