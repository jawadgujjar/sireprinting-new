import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={(values) => console.log("Login success:", values)}
        >
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
      </div>
    </div>
  );
};

export default LoginPage;
