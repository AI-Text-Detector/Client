import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Card, Space, message } from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      message.success('Thanks! Your message has been sent.');
    } catch (err) {
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="contact-layout">
      <Header />
      <Content className="contact-content">
        <div className="contact-container">
          <Space direction="vertical" size="large" className="contact-stack">
            <div className="contact-heading">
              <Title level={2} className="contact-title">Contact Us</Title>
              <Paragraph type="secondary" className="contact-subtitle">
                Have questions or feedback? We would love to hear from you.
              </Paragraph>
            </div>

            <Card className="contact-card">
              <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                  <Input placeholder="Jane Doe" size="large" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                  <Input placeholder="jane@example.com" size="large" />
                </Form.Item>
                <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please enter a subject' }]}>
                  <Input placeholder="How can we help?" size="large" />
                </Form.Item>
                <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter your message' }]}>
                  <Input.TextArea placeholder="Write your message here..." autoSize={{ minRows: 4 }} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <div className="contact-footer-text">
              <Text type="secondary">Or email us at </Text>
              <a href="mailto:contact@aitextdetector.com">contact@aitextdetector.com</a>
            </div>
          </Space>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Contact;



