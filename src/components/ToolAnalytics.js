import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Statistic } from 'antd';

const { Title, Text } = Typography;

export const ANALYTICS_STORAGE_KEY = 'ai_text_tool_analytics_v1';

const defaultStats = {
  totalAnalyses: 0,
  totalWordsAnalyzed: 0,
  totalSuspectSentences: 0,
  totalRewriteSuggestions: 0,
};

export const readAnalytics = () => {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : { ...defaultStats };
  } catch (_) {
    return { ...defaultStats };
  }
};

export const updateAnalytics = (delta) => {
  const current = readAnalytics();
  const next = { ...current, ...Object.keys(delta).reduce((acc, k) => {
    const v = delta[k] || 0;
    acc[k] = (current[k] || 0) + v;
    return acc;
  }, {}) };
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(next));
  // Dispatch a custom event so listeners can refresh in real-time
  try {
    window.dispatchEvent(new CustomEvent('tool-analytics-updated', { detail: next }));
  } catch (_) {
    // noop
  }
  return next;
};

const ToolAnalytics = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    setStats(readAnalytics());
    const onUpdate = (e) => {
      if (e && e.detail) setStats(e.detail);
      else setStats(readAnalytics());
    };
    const onStorage = (e) => {
      if (e.key === ANALYTICS_STORAGE_KEY) setStats(readAnalytics());
    };
    window.addEventListener('tool-analytics-updated', onUpdate);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('tool-analytics-updated', onUpdate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <Card
      style={{
        marginTop: '20px',
        borderRadius: '16px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}
    >
      <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>Tool Analytics</Title>
      <Text style={{ color: '#666' }}>Cumulative activity across this browser.</Text>
      <div style={{
        marginTop: 12,
        padding: '12px 14px',
        background: '#f6ffed',
        border: '1px solid #b7eb8f',
        borderRadius: 12,
        color: '#389e0d'
      }}>
        <strong>Total summary:</strong> {stats.totalAnalyses} analyses • {stats.totalWordsAnalyzed} words reviewed • {stats.totalSuspectSentences} suspect sentences • {stats.totalRewriteSuggestions} rewrite suggestions
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={12} md={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Analyses run" value={stats.totalAnalyses} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Words analyzed" value={stats.totalWordsAnalyzed} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Suspect sentences" value={stats.totalSuspectSentences} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Rewrite suggestions" value={stats.totalRewriteSuggestions} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ToolAnalytics;


