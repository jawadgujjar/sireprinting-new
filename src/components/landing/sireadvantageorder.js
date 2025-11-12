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
              <Option value="1 color">1 Color</Option>
              <Option value="2 color">2 Color</Option>
              <Option value="3 color">3 Color</Option>
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
          <Card title={<span>Request a Price Quote</span>} bordered={false}>
            <img
              alt="submit-quote"
              src="../images/submit_quote.png"
              style={{ height: "5rem", width: "4rem", marginBottom: "1rem" }}
            />
            <p>
              First, use our website or give our customer support agent a call
              to submit a request for a free personalised estimate. The rates
              will be available to you in half an hour.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Comparing prices" bordered={false}>
            <img
              alt="submit-quote"
              src="../images/budget_friendly.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Ask the agent to match the pricing with your budget line. At CCP,
              we will make every effort to provide you with the most affordable
              costs.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Price Approval" bordered={false}>
            <img
              alt="submit-quote"
              src="../images/Price_Approval.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Please approve the prices so that the order can be placed. Joining
              CCP for all of your packaging requirements will be a pleasure.
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
          <Card title={<span>Personalized Quote</span>} bordered={false}>
            <img
              alt="Submit_Artwork"
              src="../images/Submit_Artwork.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Submit your packaging details or contact our support team to
              receive a free, personalized cost estimate. We calculate accurate
              rates based on size, quantity, material, and design, ensuring
              transparency and no hidden fees.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Budget Comparison" bordered={false}>
            <img
              alt="Design_my_packaging_box_free"
              src="../images/Design_my_packaging_box_free.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We help match your packaging needs with your budget. Our team
              suggests options for custom boxes wholesale or affordable custom
              packaging without compromising quality, so you get the best value
              for your investment.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Approval & Confirmation" bordered={false}>
            <img
              alt="Design_Approval"
              src="../images/Design_Approval.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Once you review and approve the estimate, we confirm your order to
              proceed. This step ensures your custom packaging service aligns
              with your expectations, pricing, and timeline, making the process
              seamless and stress-free.
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
          <Card title={<span>Design Creation</span>} bordered={false}>
            <img
              alt="Accept_Card_Payments"
              src="../images/Accept_Card_Payments.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Our expert designers craft your packaging design proof using your
              brand colors, logos, and style to ensure an accurate
              representation of your custom boxes with logo.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Digital Proof Review" bordered={false}>
            <img
              alt="Accept_PayPal_Payments"
              src="../images/Accept_PayPal_Payments.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              You receive a clear digital proof to review every detail. Request
              changes to make sure your packaging looks perfect before
              production starts.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title=" Final Approval" bordered={false}>
            <img
              alt="Bank_Transfer"
              src="../images/Bank_Transfer.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Approve the final design proof to move forward with printing. This
              step guarantees your satisfaction with the custom packaging boxes
              USA.
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
          <Card
            title={<span>Advanced Printing Technology</span>}
            bordered={false}
          >
            <img
              alt="Final_spec_sheet_for_approval"
              src="../images/Final_spec_sheet_for_approval.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We use high-quality printing methods like digital and offset to
              produce vibrant, sharp images on your custom printed boxes.
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
              Each batch undergoes strict quality checks to ensure colors,
              logos, and finishes meet premium standards and your expectations.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Durable Finishes" bordered={false}>
            <img
              alt="production-time"
              src="../images/production_time.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Your custom boxes receive protective coatings like matte, gloss,
              spot UV, varnish to enhance appearance and protect the print.
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
          <Card title={<span>Secure Packaging</span>} bordered={false}>
            <img
              alt="packaging"
              src="../images/shipping_packaging.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Your custom packaging is carefully packed to prevent damage during
              transit and maintain the quality of your custom boxes wholesale in
              USA.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Reliable Delivery" bordered={false}>
            <img
              alt="shipping-options"
              src="../images/shipping_options.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              We partner with trusted carriers to ensure fast and safe delivery
              across the USA, tracking every shipment along the way.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card title="Customer Support" bordered={false}>
            <img
              alt="delivery-support"
              src="../images/delivery_support.png"
              style={{ height: "5rem", width: "5rem", marginBottom: "1rem" }}
            />
            <p>
              Our support team is available to assist you throughout the
              shipping process, answering questions and providing updates as
              needed.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="sireadvantage-wrapper" style={{ marginTop: "2rem" }}>
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
              <TabPane tab="Cost Estimation" key="2">
                {renderDesignCards()}
              </TabPane>
              <TabPane tab="Packaging Design Proof" key="3">
                {renderDesignProofCards()}
              </TabPane>
              <TabPane tab="Printing Process" key="4">
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
