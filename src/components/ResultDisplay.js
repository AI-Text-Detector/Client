import React from 'react';
import { Card, Tag, Typography } from 'antd';

const { Text, Title } = Typography;

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <Card style={{ marginTop: 20 }}>
      <Title level={4}>Detection Results</Title>
      <div>
        <Text strong>Confidence: </Text>
        <Tag color="blue">{result.confidence || 'N/A'}%</Tag>
      </div>
      <div style={{ marginTop: 10 }}>
        <Text strong>Classification: </Text>
        <Tag color={result.isAI ? 'red' : 'green'}>
          {result.isAI ? 'AI Generated' : 'Human Written'}
        </Tag>
      </div>
      {result.details && (
        <div style={{ marginTop: 10 }}>
          <Text strong>Details: </Text>
          <Text>{result.details}</Text>
        </div>
      )}
    </Card>
  );
};

export default ResultDisplay;
