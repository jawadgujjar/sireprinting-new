import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./cart.css"; // styling neeche dee hai

function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Custom Sample",
      price: "$100",
      quantity: 1,
      image:
        "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/plain-sample.png",
    },
    {
      id: 2,
      name: "Random Sample",
      price: "$40",
      quantity: 2,
      image:
        "https://cdn-glkkl.nitrocdn.com/IFwdajcPpRUghfJEUUZJTMOqctApESOx/assets/images/optimized/rev-aa17197/www.elitecustomboxes.com/wp-content/uploads/2023/01/random-sample.png",
    },
  ];

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-info">
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            className="cart-delete-btn"
          />
        </div>
      ))}

      <div className="cart-summary">
        <h2>Total: $180</h2>
        <Button type="primary" size="large" className="checkout-btn">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
