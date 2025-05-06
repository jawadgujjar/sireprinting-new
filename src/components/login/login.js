import React from "react";
import { Input, Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../../utils/axios";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await users.post("/login", values);
      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg =
        error.response?.data?.message || "Login failed. Try again.";
      message.error(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>

        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter password"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="login-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
