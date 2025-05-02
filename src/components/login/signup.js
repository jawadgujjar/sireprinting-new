import React from "react";
import { Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import "./login.css"; // reuse same styles

const SignupPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Sign Up</h2>

        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={(values) => console.log("Signup success:", values)}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" size="large" className="login-input" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" size="large" className="login-input" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
