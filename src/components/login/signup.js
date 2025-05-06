import React from "react";
import { Input, Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {users} from "../../utils/axios";
import "./login.css"; // Reusing login styles

const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await users.post("/register", values);
      message.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      const errorMsg =
        error.response?.data?.message || "Signup failed. Please try again.";
      message.error(errorMsg);
    }
  };

  return (
    <div className="login-container" style={{marginTop:"6rem"}}>
      <div className="login-form">
        <h2 className="login-title">Sign Up</h2>

        <Form
          form={form}
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter your name"
              size="large"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            ]}
          >
            <Input
              placeholder="Enter your phone"
              size="large"
              className="login-input"
            />
          </Form.Item>

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
