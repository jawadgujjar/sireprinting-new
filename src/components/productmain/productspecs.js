import React from 'react';
import './productspecs.css';

function ProductSpecs() {
  return (
    <div className="specs-container">
      <div className="specs-header">
        <h2>Product Specifications</h2>
        <hr />
      </div>

      <div className="specs-grid">
        <div className="spec-item">
          <div className="spec-top">
            <div className="icon-circle">🔒</div>
          </div>
          <div className="spec-bottom">
            <h3>Self Locking</h3>
            <p>
              Custom Roll End Front Tuck (REFT) mailer boxes with Dust Flaps and Cherry Locks offer round flaps that lock to secure your product in transit.
            </p>
          </div>
        </div>

        <div className="spec-item">
          <div className="spec-top">
            <div className="icon-circle">📦</div>
          </div>
          <div className="spec-bottom">
            <h3>Durable Construction</h3>
            <p>
              Made with versatility and durability in mind, our 32 ECT mailer boxes can hold between 30 and 40 pounds of product.
            </p>
          </div>
        </div>

        <div className="spec-item">
          <div className="spec-top">
            <div className="icon-circle">🖨️</div>
          </div>
          <div className="spec-bottom">
            <h3>Two-Sided Printing</h3>
            <p>
              Personalize the look of your custom packaging by choosing two-sided prints that compliment your brand and its message.
            </p>
          </div>
        </div>

        <div className="spec-item">
          <div className="spec-top">
            <div className="icon-circle">🎨</div>
          </div>
          <div className="spec-bottom">
            <h3>Full Color Printing</h3>
            <p>
              Don't limit your design to just one color. With full digital CMYK printing, you can choose as many colors as your design needs without the extra costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSpecs;
