import React, { useState } from 'react';
import { Input, Button, notification, Spin, Space } from 'antd';
import { SendOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from 'axios';
import ResultDisplay from './ResultDisplay';

const TextInput = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => setText(e.target.value);

  const handleDetectText = async () => {
    if (!text.trim()) {
      notification.warning({ 
        message: 'Please enter some text to analyze',
        placement: 'topRight'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/detect-text', { text });
      setResult(response.data.result);
      notification.success({ 
        message: 'Analysis completed!',
        description: 'Your text has been successfully analyzed.',
        placement: 'topRight'
      });
    } catch (error) {
      console.error('Error:', error);
      notification.error({ 
        message: 'Analysis failed', 
        description: error.response?.data?.error || 'Please try again later',
        placement: 'topRight'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Input.TextArea
            rows={8}
            value={text}
            onChange={handleTextChange}
            placeholder='Enter or paste text to analyze for AI detection...'
            style={{ 
              fontSize: '16px',
              borderRadius: '12px',
              border: '2px solid #f0f0f0',
              transition: 'all 0.3s ease',
              resize: 'vertical'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#f0f0f0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Button 
            type='primary' 
            onClick={handleDetectText} 
            loading={loading}
            size="large"
            icon={loading ? null : <SendOutlined />}
            style={{ 
              height: '48px',
              padding: '0 32px',
              fontSize: '16px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </Button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <Spin size="large" />
            <p style={{ marginTop: '16px', color: '#666', fontSize: '16px' }}>
              Processing your text with our AI model...
            </p>
          </div>
        )}

        {result && <ResultDisplay result={result} />}
      </Space>
    </div>
  );
};

export default TextInput;
