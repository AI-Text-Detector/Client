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
      question: 'How fast is the AI text analysis?',
      answer: 'Our optimized AI algorithms deliver instant results in just seconds. Simply paste your text and get immediate AI detection results with detailed analysis.'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '20px', color: '#52c41a' }} />,
      question: 'How accurate is the AI text detector?',
      answer: 'We achieve 99% accuracy using advanced machine learning models trained on millions of text samples. Our AI detector can distinguish between human and AI-generated content with high confidence.'
    },
    {
      icon: <RobotOutlined style={{ fontSize: '20px', color: '#1890ff' }} />,
      question: 'What technology powers your AI detector?',
      answer: 'Our AI text detector is built with state-of-the-art machine learning algorithms that analyze linguistic patterns, writing style, and text complexity to identify AI-generated content.'
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '20px', color: '#722ed1' }} />,
      question: 'What insights does the AI detector provide?',
      answer: 'Every analysis includes confidence scores, detailed explanations, and breakdowns of detected patterns. You get comprehensive insights into why content was flagged as AI-generated.'
    },
    {
      icon: <LockOutlined style={{ fontSize: '20px', color: '#eb2f96' }} />,
      question: 'Is my text data secure and private?',
      answer: 'Absolutely. Your text is processed securely and never stored on our servers. We prioritize privacy and security - your content is analyzed and immediately discarded.'
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '20px', color: '#13c2c2' }} />,
      question: 'Does the AI detector support multiple languages?',
      answer: 'Yes, our AI text detector supports multiple languages including English, Spanish, French, German, and more, with accurate detection across different writing styles and languages.'
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
            AI Text Detector FAQ - Common Questions Answered
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
