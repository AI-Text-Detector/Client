import React, { useState } from 'react';
import { Input, Button, notification, Spin, Space, Typography } from 'antd';
import { SendOutlined, FileTextOutlined } from '@ant-design/icons';
import { analyzeTextWithAI } from '../services/aiDetectionService';
import { updateAnalytics, readAnalytics } from './ToolAnalytics';
import ResultDisplay from './ResultDisplay';

const { Text } = Typography;

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

    // Check minimum text length for accurate results
    if (text.trim().length < 250) {
      notification.warning({ 
        message: 'Text too short for accurate analysis',
        description: 'Please enter at least 250 characters for more reliable AI detection results.',
        placement: 'topRight'
      });
      return;
    }

    setLoading(true);
    try {
      const MIN_LOADING_MS = 3000;
      const responsePromise = analyzeTextWithAI(text);
      const delayPromise = new Promise(resolve => setTimeout(resolve, MIN_LOADING_MS));
      const [response] = await Promise.all([responsePromise, delayPromise]);
      
      if (response.success) {
        setResult(response.result);
        // Analytics: increment counts
        updateAnalytics({ 
          totalAnalyses: 1, 
          totalWordsAnalyzed: text.trim().split(/\s+/).length 
        });
        notification.success({ 
          message: 'Analysis completed!',
          description: 'Your text has been successfully analyzed using free AI detection algorithms.',
          placement: 'topRight'
        });
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error:', error);
      notification.error({ 
        message: 'Analysis failed', 
        description: error.message || 'Please try again later',
        placement: 'topRight'
      });
    } finally {
      setLoading(false);
    }
  };

  const characterCount = text.length;
  const isTextLongEnough = characterCount >= 250;
  const totalWordsReviewed = (() => {
    try { return readAnalytics().totalWordsAnalyzed || 0; } catch { return 0; }
  })();

  return (
    <div style={{ padding: '20px 0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Input.TextArea
            rows={8}
            value={text}
            onChange={handleTextChange}
            disabled={loading}
            placeholder='Enter or paste text to analyze for AI detection... (Minimum 250 characters for accurate results)'
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
          <div style={{ 
            marginTop: '8px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Text 
              type={isTextLongEnough ? "success" : "warning"}
              style={{ fontSize: '14px' }}
            >
              {isTextLongEnough 
                ? `✓ Text length: ${characterCount} characters (sufficient for analysis)`
                : `⚠ Text length: ${characterCount}/250 characters (need ${250 - characterCount} more for accurate results)`
              }
            </Text>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Button 
            type='primary' 
            onClick={handleDetectText} 
            loading={loading}
            disabled={!isTextLongEnough}
            size="large"
            icon={loading ? null : <SendOutlined />}
            style={{ 
              height: '48px',
              padding: '0 32px',
              fontSize: '16px',
              borderRadius: '24px',
              background: isTextLongEnough 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#d9d9d9',
              border: 'none',
              boxShadow: isTextLongEnough 
                ? '0 4px 15px rgba(102, 126, 234, 0.3)'
                : 'none',
              transition: 'all 0.3s ease',
              cursor: isTextLongEnough ? 'pointer' : 'not-allowed'
            }}
            onMouseEnter={(e) => {
              if (isTextLongEnough) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (isTextLongEnough) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }
            }}
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </Button>
        </div>

        <div style={{ textAlign: 'center', color: '#888' }}>
          <Text type="secondary">Total words reviewed so far: {totalWordsReviewed}</Text>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <Spin size="large" />
            <p style={{ marginTop: '16px', color: '#666', fontSize: '16px' }}>
              Processing your text with our AI model...
            </p>
          </div>
        )}

        {result && <ResultDisplay result={result} originalText={text} />}
      </Space>
    </div>
  );
};

export default TextInput;
