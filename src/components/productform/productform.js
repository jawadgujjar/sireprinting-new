import React, { useState } from "react";
import { Button, Form, Select, Input, Upload, Row, Col, message } from "antd";
import { getquote } from "../../utils/axios"; // API call ke liye import
import FileUpload from "../productform/fileupload";
import './productform.css';

const { Option } = Select;

function Productform1() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    setLoading(true);
    console.log(values.uploadFile, "uploadedfile");
    // Ensure file URL is available before submission
    if (!values.uploadFile) {
      message.error("Please upload a file before submitting!");
      setLoading(false);
      return;
    }

    console.log(values, "formdata"); // Debugging ke liye

    try {
      const response = await getquote.post("/", values);
      console.log("API Response: ", response.data);
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
    <div className="allproduct-form-sticky-div">
      <div className="div-beatform-txt">
        <p className="allproduct-beat-txt">Beat My Quote</p>
      </div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="length">
              <Input className="form-input" placeholder="Length" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="width">
              <Input className="form-input" placeholder="Width" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="depth">
              <Input className="form-input" placeholder="Depth" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="inches">
              <Select className="double-border-select" defaultValue="inches">
                <Option value="inches">Inches</Option>
                <Option value="cm">cm</Option>
                <Option value="mm">mm</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="chooseProduct" label="Choose Product">
              <Select 
                className="double-border-select"
                placeholder="Select Product"
              >
                <Option value="mailer">Custom Mailer Boxes</Option>
                <Option value="poly">Custom Poly Mailers</Option>
                <Option value="shipping">Custom Shipping Boxes</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="colors" label="Color">
              <Select className="double-border-select" placeholder="Select Color">
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="quantity" label="Quantity">
              <Input
                className="input-allproduct"
                type="number"
                placeholder="Enter Quantity"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phoneNumber" label="Phone">
              <Input
                className="input-allproduct"
                placeholder="Enter Your Phone Number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="fullName" label="Full Name">
              <Input
                className="input-allproduct"
                placeholder="Enter Your Full Name"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input
                className="input-allproduct"
                type="email"
                placeholder="Enter Your Email"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="uploadFile" label="Upload File">
              <FileUpload
                onUploadSuccess={(url) =>
                  form.setFieldsValue({ uploadFile: url })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="message" label="Message">
              <Input.TextArea
                className="input-allproduct"
                placeholder="Enter Your Message"
                rows={2}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="allproduct-form-submit-button"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Productform1;
