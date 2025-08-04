import { useState } from "react";
import "./sireadvantageorder.css";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  message,
  Upload,
  Tabs,
  Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { instantquote } from "../../utils/axios";

const { TabPane } = Tabs;
const { Option } = Select;

const cloudName = "dxhpud7sx";
const uploadPreset = "sireprinting";

// CloudinaryUploader component remains unchanged
const CloudinaryUploader = ({
  cloudName,
  uploadPreset,
  listType,
  maxCount,
  form,
  fieldName,
  children,
}) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const newFileList = [
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: response.data.secure_url,
        },
      ];
      setFileList(newFileList);
      form.setFieldsValue({ [fieldName]: response.data.secure_url });
      return response.data.secure_url;
    } catch (error) {
      message.error("Upload failed");
      console.error(error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: async (file) => {
      await handleUpload(file);
      return false;
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    listType,
    maxCount,
  };

  return (
    <Upload {...uploadProps}>
      {fileList.length >= maxCount ? null : children}
    </Upload>
  );
};

function Sireadvantageorder() {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [step, setStep] = useState(1);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const validateImage = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please upload an image"));
    }
    return Promise.resolve();
  };

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        setStep(2);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleFinish = async () => {
    try {
      const values = form.getFieldsValue(true);
      console.log("All form values:", values);

      const payload = {
        length: Number(values.length),
        width: Number(values.width),
        depth: Number(values.depth),
        unit: values.unit,
        color: values.color,
        quantity: Number(values.quantity),
        image: values.mainImage || "",
        name: values.name,
        email: values.email,
        phonenumber: values.phone,
      };

      const response = await instantquote.post("/", payload);
      console.log("API Response:", response.data);

      if (response.data.success) {
        message.success("Quote submitted successfully!");
        form.resetFields();
        setStep(1);
        setActiveTab("2");
      } else {
        message.error("Failed to submit quote");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form");
    }
  };

  const renderForm = () => (
    <Form
      layout="vertical"
      onFinish={handleFinish}
      form={form}
      className="your-form-class"
    >
      {step === 1 && (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="length"
                label="Length"
                rules={[{ required: true, message: "Please enter length" }]}
              >
                <Input placeholder="Length" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="width"
                label="Width"
                rules={[{ required: true, message: "Please enter width" }]}
              >
                <Input placeholder="Width" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="depth"
                label="Depth"
                rules={[{ required: true, message: "Please enter depth" }]}
              >
                <Input placeholder="Depth" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="unit"
                label="Unit"
                initialValue="cm"
                rules={[{ required: true, message: "Please select unit" }]}
              >
                <Select placeholder="Select Unit" defaultValue="cm">
                  <Option value="inches">Inches</Option>
                  <Option value="cm">Centimeters</Option>
                  <Option value="mm">Millimeters</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please select color" }]}
          >
            <Select placeholder="Select Color">
              <Option value="white">White</Option>
              <Option value="kraft">Kraft</Option>
              <Option value="black">Black</Option>
              <Option value="full">Full Color</Option>
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please select quantity" }]}
              >
                <Select placeholder="Select Quantity">
                  <Option value="10">10</Option>
                  <Option value="25">25</Option>
                  <Option value="50">50</Option>
                  <Option value="100">100</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="mainImage"
                label="Upload File"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ validator: validateImage }]}
              >
                <CloudinaryUploader
                  cloudName={cloudName}
                  uploadPreset={uploadPreset}
                  listType="picture-card"
                  maxCount={1}
                  form={form}
                  fieldName="mainImage"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </CloudinaryUploader>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              className="submit-button"
              onClick={handleNext}
            >
              Next
            </Button>
          </Form.Item>
        </>
      )}
      {step === 2 && (
        <>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item>
            <div className="form-buttons">
              <Button
                type="primary"
                onClick={() => setStep(1)}
                className="submit-button"
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </>
      )}
    </Form>
  );

  const renderRequestQuoteCards = () => (
    <div className="process-cards">
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card title={<span>Submit Quote</span>} bordered={false}>
            <img
              alt="submit-quote"
              src="../images/submit_quote.png"
              style={{ height: "5rem", width: "4rem", marginBottom: "1rem" }}
            />
            <p>
              To get started, please submit our quote form with your printing
              and packaging requirements, or feel free to contact us directly
              with any queries. For an instant quote, you can also chat with our
              live packaging experts, available 24/7 to assist you.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Budget Friendly" bordered={false}>
            <img
              alt="submit-quote"
              src="../images/budget_friendly.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              If you have a budget allocated for your printing project, please
              don't hesitate to share it with us. We are dedicated to supporting
              small businesses in launching their ventures. If you are comparing
              prices, feel free to let us know the best quote you have received
              so far. Our dedicated "Beat My Quote" department is here to ensure
              you receive the most competitive pricing available.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Quote Approval" bordered={false}>
            <img
              alt="submit-quote"
              src="../images/Price_Approval.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Once we receive your approval on the quoted price, we will proceed
              to set up your account with us. This will give you convenient
              access to your packaging designs, order history, and more. There
              is no need to make any payment until your design has been
              finalised.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderDesignCards = () => (
    <div className="process-cards">
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card title={<span>Submit Your Artwork</span>} bordered={false}>
            <img
              alt="Submit_Artwork"
              src="../images/Submit_Artwork.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Our design team will work closely with you to create packaging
              that reflects your brand identity. Share your ideas, logos, and
              any specific requirements, and we'll bring your vision to life.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Design My Packaging" bordered={false}>
            <img
              alt="Design_my_packaging_box_free"
              src="../images/Design_my_packaging_box_free.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We offer a wide range of custom templates to suit your product
              needs. Whether you need boxes, bags, or specialty packaging, we
              have templates that can be customized to your exact
              specifications.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Design Approval" bordered={false}>
            <img
              alt="Design_Approval"
              src="../images/Design_Approval.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We ensure your packaging maintains brand consistency across all
              your products. Our designers will match colors, fonts, and styles
              to your existing branding materials.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderDesignProofCards = () => (
    <div className="process-cards">
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card title={<span>Accept Card Payment</span>} bordered={false}>
            <img
              alt="Accept_Card_Payments"
              src="../images/Accept_Card_Payments.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Within 48 hours of finalizing your design, we'll send you a
              digital proof for approval. This allows you to see exactly how
              your packaging will look before we proceed to production.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Accept Paypal Transfers" bordered={false}>
            <img
              alt="Accept_PayPal_Payments"
              src="../images/Accept_PayPal_Payments.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We include up to 3 rounds of revisions in our standard service.
              Our team will work with you to make any necessary adjustments
              until you're completely satisfied with the design.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Accept Bank Transfer" bordered={false}>
            <img
              alt="Bank_Transfer"
              src="../images/Bank_Transfer.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Once you approve the final proof, we'll lock in the design and
              prepare for production. This is your last chance to make changes,
              so please review carefully.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderPrintingCards = () => (
    <div className="process-cards">
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card title={<span>Final Spec Sheet For Approval</span>} bordered={false}>
            <img
              alt="Final_spec_sheet_for_approval"
              src="../images/Final_spec_sheet_for_approval.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We use state-of-the-art printing technology to ensure vibrant
              colors and crisp details on every package. Our printing process is
              environmentally friendly and uses high-quality, sustainable inks.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Quality Control" bordered={false}>
            <img
              alt="quality-control"
              src="../images/quality_control.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Every piece goes through rigorous quality control checks. We
              verify color accuracy, print quality, and structural integrity
              before shipping your order.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Production Time" bordered={false}>
            <img
              alt="production-time"
              src="../images/production_time.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Standard production takes 7-10 business days after final approval.
              Rush services are available for an additional fee if you need your
              order sooner.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderShippingCards = () => (
    <div className="process-cards">
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card title={<span>Packaging</span>} bordered={false}>
            <img
              alt="packaging"
              src="../images/shipping_packaging.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We carefully package your order to ensure it arrives in perfect
              condition. All boxes are securely packed with protective materials
              to prevent damage during transit.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Shipping Options" bordered={false}>
            <img
              alt="shipping-options"
              src="../images/shipping_options.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We offer multiple shipping options including standard, expedited,
              and freight services for large orders. You'll receive tracking
              information as soon as your order ships.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Delivery & Support" bordered={false}>
            <img
              alt="delivery-support"
              src="../images/delivery_support.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Our customer support team is available to assist with any delivery
              questions or concerns. If there are any issues with your shipment,
              we'll work quickly to resolve them.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="sireadvantage-wrapper">
      <Row className="form-section">
        <Col xs={24} className="form-left">
          <h3 className="form-title-advantage">How to Place Your Order?</h3>
          <div className="process-tabs">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              tabPosition="top"
              className="custom-tabs"
            >
              <TabPane tab="Request A Quote" key="1">
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={24} lg={16}>
                    {renderRequestQuoteCards()}
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8}>
                    {renderForm()}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Packaging Design" key="2">
                {renderDesignCards()}
              </TabPane>
              <TabPane tab="Payment" key="3">
                {renderDesignProofCards()}
              </TabPane>
              <TabPane tab="Production" key="4">
                {renderPrintingCards()}
              </TabPane>
              <TabPane tab="Shipping & Handling" key="5">
                {renderShippingCards()}
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Sireadvantageorder;
