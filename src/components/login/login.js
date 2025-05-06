import React from "react";
import { Input, Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../../utils/axios";
import { toast } from "react-toastify";
import "./login.css";
import { useUser } from "../../contextapi/userContext.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser(); // <-- use context

  const onFinish = async (values) => {
    try {
      const response = await users.post("/login", values);
      const userData = response.data; // adjust according to your API

      loginUser(userData); // Save in context
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      message.error(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>

        <Form name="login" onFinish={onFinish}>
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
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
