import React from "react";
import "../footerthings/aboutus.css";

function ReturnPolicy() {
  return (
    <div className="about-container">
      <h1 className="about-title">Return & Refund Policy</h1>

      {/* Section 1 */}
      <div>
        <div className="about-text">
          <p>
            At Cheap Custom Packaging, we strive to provide high-quality
            packaging products that meet our customers’ needs across the United
            States. This Return & Refund Policy outlines the process and
            guidelines for returning products and receiving refunds. By placing
            an order on our website, you agree to comply with this policy.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <h2 className="about-subtitle">Eligibility for Returns</h2>
        <div className="about-text">
          <p>
            Products purchased from Cheap Custom Packaging may be eligible for
            return if they meet the following criteria: the item must be unused,
            in its original condition, and in the original packaging. Customized
            or personalized products are generally non-returnable unless there
            is a defect or error caused by our company.
            <br />
            Returns must be requested within 30 days of delivery. Requests made
            after this period may not be accepted.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div>
        <h2 className="about-subtitle">Defective or Damaged Products</h2>
        <div className="about-text">
          <p>
            If your product arrives damaged or defective, please contact us
            immediately at <strong>support@cheapcustompackaging.com</strong>{" "}
            with your order number and details. Cheap Custom Packaging will
            provide a replacement or full refund including shipping. Photos may
            be required.
          </p>
        </div>
      </div>

      {/* Section 4 */}
      <div>
        <h2 className="about-subtitle">Return Process</h2>
        <div className="about-text">
          <p>
            To initiate a return, contact our support team to obtain a Return
            Authorization. Once approved, products should be securely packaged
            and shipped to the provided address. Customers are responsible for
            return shipping unless the product was damaged or defective.
            <br />
            We recommend using a trackable shipping method.
          </p>
        </div>
      </div>

      {/* Section 5 */}
      <div>
        <h2 className="about-subtitle">Refunds</h2>
        <div className="about-text">
          <p>
            Refunds are processed once items are received and inspected.
            Approved refunds will be issued to the original payment method
            within 7–10 business days. Shipping fees are non-refundable unless
            the return is our error.
          </p>
        </div>
      </div>

      {/* Section 6 */}
      <div>
        <h2 className="about-subtitle">Exchanges</h2>
        <div className="about-text">
          <p>
            Exchanges are possible for damaged, defective, or incorrect
            products. Contact support with your order details to begin the
            process. Additional shipping costs may apply unless the issue was
            caused by our company.
          </p>
        </div>
      </div>

      {/* Section 7 */}
      <div>
        <h2 className="about-subtitle">Non-Returnable Items</h2>
        <div className="about-text">
          <p>Some items cannot be returned, including:</p>

          <ul style={{ marginLeft: "20px", listStyle: "disc" }}>
            <li>Customized or personalized packaging products</li>
            <li>Items that have been used or altered</li>
            <li>Gift cards or promotional items</li>
          </ul>
        </div>
      </div>

      {/* Section 8 */}
      <div>
        <h2 className="about-subtitle">Shipping Costs for Returns</h2>
        <div className="about-text">
          <p>
            Return shipping costs are generally the customer’s responsibility.
            Cheap Custom Packaging recommends using a trackable shipping service
            and retaining proof of shipment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;
