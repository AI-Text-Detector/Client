import React from 'react';
import { Typography, Collapse, Space } from 'antd';
import { 
  ThunderboltOutlined, 
  SafetyOutlined, 
  RobotOutlined, 
  BarChartOutlined,
  LockOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;

const FAQ = () => {
  const faqs = [
    {
      icon: <ThunderboltOutlined style={{ fontSize: '20px', color: '#faad14' }} />,
      question: 'How fast is the analysis?',
      answer: 'Our optimized AI algorithms deliver instant results in just seconds.'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '20px', color: '#52c41a' }} />,
      question: 'How accurate is the AI detector?',
      answer: 'We achieve up to 99% accuracy using advanced machine learning models.'
    },
    {
      icon: <RobotOutlined style={{ fontSize: '20px', color: '#1890ff' }} />,
      question: 'What powers your AI detector?',
      answer: 'It is built with state-of-the-art AI that continuously learns and improves.'
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '20px', color: '#722ed1' }} />,
      question: 'Do you provide detailed insights?',
      answer: 'Yes, every analysis includes confidence scores and detailed explanations.'
    },
    {
      icon: <LockOutlined style={{ fontSize: '20px', color: '#eb2f96' }} />,
      question: 'Is my data secure?',
      answer: 'Absolutely. Your text is processed securely and never stored. Privacy first.'
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '20px', color: '#13c2c2' }} />,
      question: 'Does it support multiple languages?',
      answer: 'Yes, we support multiple languages with accurate detection across writing styles.'
    }
  ];

  return (
    <div style={{ 
      padding: '80px 0',
      background: '#fafafa'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={2} style={{ 
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem'
          }}>
            Frequently Asked Questions
          </Title>
        </div>

        <Collapse 
          accordion 
          bordered={false} 
          style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
        >
          {faqs.map((faq, index) => (
            <Panel 
              header={
                <Space>
                  {faq.icon}
                  <span style={{ fontWeight: 500 }}>{faq.question}</span>
                </Space>
              } 
              key={index}
              style={{ borderBottom: '1px solid #f0f0f0' }}
            >
              <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                {faq.answer}
              </p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default FAQ;
