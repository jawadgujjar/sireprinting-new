import React from "react";
import { Row, Col } from "antd";
import SearchBox from "./searchbox"; // updated name
import "./search.css";
import Productform1 from "../productform/productform";

function Search() {
  return (
    <div className="search-form-wrapper">
      <Row>
        <Col xs={24} md={14}>
          <SearchBox />
        </Col>
        <Col xs={24} md={10}>
          <Productform1 />
        </Col>
      </Row>
    </div>
  );
}

export default Search;
