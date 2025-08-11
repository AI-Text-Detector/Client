import React, { useState } from 'react';
import { Input, Button, notification, Spin } from 'antd';
import axios from 'axios';
import ResultDisplay from './ResultDisplay';

const TextInput = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => setText(e.target.value);

  const handleDetectText = async () => {
    if (!text.trim()) {
      notification.warning({ message: 'Please enter some text to analyze' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/detect-text', { text });
      setResult(response.data.result);
      notification.success({ message: 'Text analysis completed!' });
    } catch (error) {
      console.error('Error:', error);
      notification.error({ 
        message: 'Analysis failed', 
        description: error.response?.data?.error || 'Please try again later'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20, color: '#1890ff' }}>Text Analysis</h2>
      
      <Input.TextArea
        rows={6}
        value={text}
        onChange={handleTextChange}
        placeholder='Enter or paste text to analyze for AI detection...'
        style={{ marginBottom: 16 }}
      />
      
      <Button 
        type='primary' 
        onClick={handleDetectText} 
        loading={loading}
        size="large"
        style={{ marginBottom: 20 }}
      >
        {loading ? 'Analyzing...' : 'Analyze Text'}
      </Button>

      {loading && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Spin size="large" />
          <p>Processing your text...</p>
        </div>
      )}

      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default TextInput;
