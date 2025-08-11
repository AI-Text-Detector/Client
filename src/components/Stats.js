import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import { 
  FileTextOutlined, 
  CheckCircleOutlined, 
  UserOutlined, 
  ThunderboltOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

const Stats = () => {
  const stats = [
    {
      icon: <FileTextOutlined style={{ fontSize: '32px', color: '#667eea' }} />,
      value: '1M+',
      suffix: 'Texts Analyzed',
      description: 'Over a million texts processed with our AI'
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      value: '99.2%',
      suffix: 'Accuracy Rate',
      description: 'Industry-leading accuracy in AI detection'
    },
    {
      icon: <UserOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      value: '50K+',
      suffix: 'Active Users',
      description: 'Trusted by thousands of users worldwide'
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />,
      value: '< 2s',
      suffix: 'Average Response',
      description: 'Lightning-fast analysis and results'
    }
  ];

  return (
    <div style={{ 
      padding: '60px 0',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Title level={2} style={{ 
            color: '#fff',
            marginBottom: '20px',
            fontSize: '2.5rem'
          }}>
            Trusted by Users Worldwide
          </Title>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '18px',
            margin: 0
          }}>
            Our AI text detector has processed millions of texts with exceptional accuracy
          </p>
        </div>

        <Row gutter={[48, 32]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <div style={{ 
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  {stat.icon}
                </div>
                
                <Statistic
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{ 
                    color: '#fff',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}
                />
                
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {stat.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Stats;
