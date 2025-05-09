import React from "react";
import { Row, Col } from "antd";
import SearchBox from "./searchbox"; // updated name
import "./search.css";
import Productform1 from "../productform/productform";

function Search() {
  return (
    <div>
      <Row className="search-form-wrapper">
        <Col xs={24} md={12}>
          <div className="searchbox">
            {" "}
            <SearchBox />
          </div>
        </Col>
        <Col xs={24} md={10}>
          <Productform1 />
        </Col>
      </Row>
    </div>
  );
}

export default Search;
