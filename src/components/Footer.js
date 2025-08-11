import React from 'react';
import { Layout, Typography, Space, Divider } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter 
      style={{ 
        background: '#001529',
        color: '#fff',
        padding: '40px 50px 20px',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Main Footer Content */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Company Info */}
            <div style={{ textAlign: 'left', flex: 1, minWidth: '250px', marginBottom: '20px' }}>
              <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
                AI Text Detector
              </Text>
              <Text style={{ color: '#8c8c8c', display: 'block', marginBottom: '10px' }}>
                Advanced AI-powered text analysis to detect AI-generated content with high accuracy.
              </Text>
            </div>

            {/* Quick Links */}
            <div style={{ textAlign: 'left', flex: 1, minWidth: '200px', marginBottom: '20px' }}>
              <Text style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>
                Quick Links
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="#" style={{ color: '#8c8c8c' }}>How it Works</Link>
                <Link href="#" style={{ color: '#8c8c8c' }}>API Documentation</Link>
                <Link href="#" style={{ color: '#8c8c8c' }}>Privacy Policy</Link>
                <Link href="#" style={{ color: '#8c8c8c' }}>Terms of Service</Link>
              </div>
            </div>

            {/* Contact */}
            <div style={{ textAlign: 'left', flex: 1, minWidth: '200px', marginBottom: '20px' }}>
              <Text style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>
                Contact
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="mailto:contact@aitextdetector.com" style={{ color: '#8c8c8c' }}>
                  <MailOutlined style={{ marginRight: '8px' }} />
                  contact@aitextdetector.com
                </Link>
                <Link href="#" style={{ color: '#8c8c8c' }}>Support</Link>
                <Link href="#" style={{ color: '#8c8c8c' }}>Feedback</Link>
              </div>
            </div>
          </div>

          <Divider style={{ borderColor: '#303030', margin: '20px 0' }} />

          {/* Bottom Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Text style={{ color: '#8c8c8c' }}>
              © 2024 AI Text Detector. All rights reserved.
            </Text>
            
            <Space size="large">
              <Link href="#" style={{ color: '#8c8c8c' }}>
                <GithubOutlined style={{ fontSize: '20px' }} />
              </Link>
              <Link href="#" style={{ color: '#8c8c8c' }}>
                <TwitterOutlined style={{ fontSize: '20px' }} />
              </Link>
              <Link href="#" style={{ color: '#8c8c8c' }}>
                <LinkedinOutlined style={{ fontSize: '20px' }} />
              </Link>
            </Space>
          </div>
        </Space>
      </div>
    </AntFooter>
  );
};

export default Footer;
