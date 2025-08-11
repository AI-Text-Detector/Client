import React from 'react';
import { Typography, Row, Col, Card, Space } from 'antd';
import { 
  ThunderboltOutlined, 
  SafetyOutlined, 
  RobotOutlined, 
  BarChartOutlined,
  LockOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Features = () => {
  const features = [
    {
      icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      title: 'Instant Analysis',
      description: 'Get results in seconds with our optimized AI algorithms that process text quickly and efficiently.'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      title: 'High Accuracy',
      description: '99% accuracy rate in detecting AI-generated content using advanced machine learning models.'
    },
    {
      icon: <RobotOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'AI-Powered',
      description: 'Built with state-of-the-art AI technology that continuously learns and improves over time.'
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      title: 'Detailed Insights',
      description: 'Receive comprehensive analysis with confidence scores and detailed explanations.'
    },
    {
      icon: <LockOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />,
      title: 'Privacy First',
      description: 'Your data is processed securely and never stored. We prioritize your privacy and security.'
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
      title: 'Multi-Language',
      description: 'Support for multiple languages with accurate detection across different writing styles.'
    }
  ];

  return (
    <div style={{ 
      padding: '80px 0',
      background: '#fafafa'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ 
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem'
          }}>
            Why Choose Our AI Detector?
          </Title>
          <Paragraph style={{ 
            fontSize: '18px', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Our advanced technology provides the most reliable and accurate AI text detection available
          </Paragraph>
        </div>

        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card 
                style={{ 
                  height: '100%',
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  background: '#fff',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                hoverable
                bodyStyle={{ padding: '32px 24px', textAlign: 'center' }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
                    margin: '0 auto'
                  }}>
                    {feature.icon}
                  </div>
                  
                  <div>
                    <Title level={4} style={{ 
                      margin: '0 0 12px 0',
                      color: '#333'
                    }}>
                      {feature.title}
                    </Title>
                    <Paragraph style={{ 
                      color: '#666',
                      margin: 0,
                      lineHeight: '1.6'
                    }}>
                      {feature.description}
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Features;
