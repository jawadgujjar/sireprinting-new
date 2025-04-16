import React from "react";
import "./blog.css";
import { Button, Row, Col, Divider, Tag } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ShareAltOutlined,
  LeftOutlined,
  EnvironmentOutlined,
  TagsOutlined,
} from "@ant-design/icons";

const Blog = () => {
  const blogPost = {
    id: 1,
    title: "The Future of Sustainable Packaging: Innovations Shaping Tomorrow",
    excerpt:
      "Exploring the cutting-edge developments in eco-friendly packaging solutions that are revolutionizing industries worldwide.",
    featuredImage:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    authorTitle: "Sustainability Expert",
    readTime: "5 min read",
    location: "Global Packaging Summit, Berlin",
    tags: ["Sustainability", "Innovation", "Eco-Friendly", "Design"],
    content: [
      {
        type: "paragraph",
        text: "The packaging industry is undergoing a radical transformation as environmental concerns take center stage. With consumers becoming increasingly eco-conscious, brands are pressured to adopt sustainable practices that don't compromise on functionality or aesthetics. This shift represents not just an environmental imperative but a significant business opportunity.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        caption:
          "Eco-friendly packaging materials gaining popularity in retail sectors",
      },
      {
        type: "paragraph",
        text: "Recent advancements in biodegradable materials have opened new possibilities for packaging solutions. Mushroom-based packaging, seaweed films, and plantable seed paper are just a few examples of how innovation is driving this sector forward. These materials not only decompose naturally but often require less energy to produce than traditional options.",
      },
      {
        type: "quote",
        text: "Sustainable packaging is no longer a niche market—it's becoming the industry standard. Companies that don't adapt risk being left behind.",
        author: "Dr. Michael Chen, Packaging Futurist",
      },
      {
        type: "heading",
        text: "Key Trends Shaping Sustainable Packaging",
      },
      {
        type: "paragraph",
        text: "1. Minimalist Design: Reducing material use while maintaining brand identity\n2. Recyclable Materials: Moving beyond plastic to paper, glass, and biopolymers\n3. Reusable Systems: Packaging-as-a-service models gaining traction\n4. Smart Packaging: Integrating technology for better tracking and user engagement",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        caption:
          "Modern sustainable packaging designs showcased at the 2023 Global Packaging Expo",
      },
      {
        type: "paragraph",
        text: "The shift toward sustainable packaging isn't just about environmental responsibility—it's creating new value propositions for brands. Companies implementing these solutions report improved customer loyalty, enhanced brand perception, and in many cases, reduced long-term costs through material efficiency and waste reduction.",
      },
      {
        type: "stats",
        items: [
          { value: "78%", label: "Consumers prefer sustainable packaging" },
          { value: "$150B", label: "Projected market value by 2025" },
          { value: "42%", label: "Reduction in carbon footprint achievable" },
        ],
      },
    ],
  };

  return (
    <div className="blog-detail-container">
      <Button
        type="text"
        icon={<LeftOutlined />}
        className="back-button"
        onClick={() => window.history.back()}
      >
        Back to Blog
      </Button>

      <Row gutter={[48, 48]}>
        <Col span={24}>
          <img
            src={blogPost.featuredImage}
            alt={blogPost.title}
            className="featured-image"
          />
        </Col>

        <Col xs={24} lg={18}>
          <div className="blog-header">
            <div className="tags-container">
              {blogPost.tags.map((tag, index) => (
                <Tag key={index} className="blog-tag">
                  {tag}
                </Tag>
              ))}
            </div>
            <h1 className="blog-title">{blogPost.title}</h1>
            <p className="blog-excerpt">{blogPost.excerpt}</p>

            <div className="blog-meta">
              <div className="meta-item">
                <UserOutlined className="meta-icon" />
                <div>
                  <span className="meta-value">{blogPost.author}</span>
                  <span className="meta-subtext">{blogPost.authorTitle}</span>
                </div>
              </div>
              <div className="meta-item">
                <CalendarOutlined className="meta-icon" />
                <div>
                  <span className="meta-value">{blogPost.date}</span>
                  <span className="meta-subtext">Published date</span>
                </div>
              </div>
              <div className="meta-item">
                <ClockCircleOutlined className="meta-icon" />
                <div>
                  <span className="meta-value">{blogPost.readTime}</span>
                  <span className="meta-subtext">Reading time</span>
                </div>
              </div>
              <div className="meta-item">
                <EnvironmentOutlined className="meta-icon" />
                <div>
                  <span className="meta-value">{blogPost.location}</span>
                  <span className="meta-subtext">Event location</span>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={6}>
          <div className="sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Table of Contents</h3>
              <ul className="toc-list">
                <li>Industry Transformation</li>
                <li>Material Innovations</li>
                <li>Key Trends</li>
                <li>Business Value</li>
                <li>Future Outlook</li>
              </ul>
            </div>
            <Divider />
            <div className="sidebar-section">
              <h3 className="sidebar-title">Related Topics</h3>
              <div className="related-tags">
                <Tag icon={<TagsOutlined />}>Circular Economy</Tag>
                <Tag icon={<TagsOutlined />}>Biodegradable</Tag>
                <Tag icon={<TagsOutlined />}>Supply Chain</Tag>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={18}>
          <div className="blog-content">
            {blogPost.content.map((section, index) => {
              switch (section.type) {
                case "paragraph":
                  return (
                    <p key={index} className="content-paragraph">
                      {section.text.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                          {i < section.text.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  );
                case "heading":
                  return (
                    <h2 key={index} className="content-heading">
                      {section.text}
                    </h2>
                  );
                case "image":
                  return (
                    <div key={index} className="content-image-container">
                      <img
                        src={section.src}
                        alt={section.caption}
                        className="content-image"
                      />
                      {section.caption && (
                        <p className="image-caption">{section.caption}</p>
                      )}
                    </div>
                  );
                case "quote":
                  return (
                    <div key={index} className="content-quote">
                      <blockquote>{section.text}</blockquote>
                      {section.author && <cite>- {section.author}</cite>}
                    </div>
                  );
                case "stats":
                  return (
                    <div key={index} className="content-stats">
                      <Row gutter={[16, 16]}>
                        {section.items.map((item, i) => (
                          <Col xs={24} sm={8} key={i}>
                            <div className="stat-item">
                              <div className="stat-value">{item.value}</div>
                              <div className="stat-label">{item.label}</div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          <Divider />

          <div className="author-section">
            <div className="author-avatar">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt={blogPost.author}
              />
            </div>
            <div className="author-info">
              <h3>{blogPost.author}</h3>
              <p className="author-title">{blogPost.authorTitle}</p>
              <p className="author-bio">
                Sarah is a leading expert in sustainable packaging with over 15
                years of experience helping Fortune 500 companies transition to
                eco-friendly solutions. She holds a PhD in Materials Science and
                regularly speaks at international conferences.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <div className="blog-detail-cta">
        <h3>Ready to transform your packaging strategy?</h3>
        <p>
          Our team of sustainability experts can help you implement cutting-edge
          packaging solutions that reduce environmental impact while enhancing
          your brand value.
        </p>
        <Button type="primary" size="large" className="cta-button">
          Schedule a Consultation
        </Button>
      </div>
    </div>
  );
};

export default Blog;
