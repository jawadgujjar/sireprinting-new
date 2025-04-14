import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./search.css";

const SearchBox = () => {
  return (
    <div className="search-box-elite">
      <h2 className="search-title">Search Products</h2>
      <Input
        placeholder="Enter product name..."
        size="large"
        className="search-input"
        suffix={<SearchOutlined />}
      />
      <Button type="primary" className="search-button">
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
