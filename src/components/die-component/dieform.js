import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./dieform.css";

function Dieform() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Form submitted successfully:", values);
    navigate("/Die-category-template");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
  };

  return (
    <div className="dieform-section">
      <Row gutter={[24, 24]} align="top">
        <Col xs={24} md={12}>
          <div className="dieform-text">
            <h2>What Is a Dieline Template in Packaging?</h2>
            <p>
              A dieline template is a 2D technical drawing that shows the flat
              layout of a box before it’s assembled. It acts as a guide for
              designers to place artwork and for printers to understand where to
              cut, fold, and glue the box.
            </p>
            <p>
              Think of a custom dieline as the foundation of any professional
              packaging design—it ensures precision, symmetry, and brand
              consistency across every printed piece.
            </p>
            <p>
              We offer our packaging dielines in multiple formats to suit your
              workflow:
            </p>
            <ul>
              <li>
                <strong>PDF</strong> for easy viewing and sharing
              </li>
              <li>
                <strong>AI</strong> (Adobe Illustrator) for editable design work
              </li>
              <li>
                <strong>EPS</strong> for compatibility with various design tools
              </li>
            </ul>
            <p>
              Using the correct printable dieline files helps eliminate
              production errors and ensures your packaging layout translates
              perfectly.
            </p>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="dieform-form">
            <h3>Request Your Dieline Today</h3>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input placeholder="Your Phone" />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[{ required: true, message: "Please enter your message" }]}
              >
                <Input.TextArea placeholder="Message" rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="submit-btn">
                  Get DieLine
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dieform;
