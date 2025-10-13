import React, { useMemo, useState, useEffect } from 'react';
import { Card, Tag, Typography, Progress, Space, Divider, Input, Button, message } from 'antd';
import { updateAnalytics } from './ToolAnalytics';
import { RobotOutlined, UserOutlined, TrophyOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const ResultDisplay = ({ result, originalText }) => {
  if (!result) return null;

  const confidence = result.confidence || 0;
  const isAI = result.isAI;
  
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#52c41a';
    if (confidence >= 60) return '#faad14';
    return '#ff4d4f';
  };

  const getConfidenceStatus = (confidence) => {
    if (confidence >= 80) return 'success';
    if (confidence >= 60) return 'normal';
    return 'exception';
  };

  // Simple heuristic to flag AI-suspect sentences for highlighting
  const transitionalPhrases = [
    'in conclusion', 'to summarize', 'as a result', 'therefore', 'thus', 'hence',
    'furthermore', 'moreover', 'additionally', 'consequently', 'accordingly',
    'on the other hand', 'in contrast', 'however', 'nevertheless', 'nonetheless',
    'for instance', 'for example', 'specifically', 'particularly'
  ];
  const formalPhrases = [
    'it is important to note', 'it should be noted', 'it is worth mentioning',
    'it is crucial', 'it is essential', 'it is necessary', 'it is vital'
  ];
  const isSentenceSuspect = (sentence) => {
    if (!sentence) return false;
    const s = sentence.trim().toLowerCase();
    if (s.length === 0) return false;
    const longSentence = s.split(/\s+/).length > 25;
    const hasTransitional = transitionalPhrases.some(p => s.includes(p));
    const hasFormal = formalPhrases.some(p => s.includes(p));
    return longSentence || hasTransitional || hasFormal;
  };

  const splitIntoSentencesWithDelims = (text) => {
    if (!text) return [];
    const parts = text.split(/([.!?]+\s+)/);
    const sentences = [];
    for (let i = 0; i < parts.length; i += 2) {
      const chunk = parts[i] || '';
      const delim = parts[i + 1] || '';
      if (chunk.trim().length === 0 && delim.length === 0) continue;
      sentences.push(chunk + delim);
    }
    return sentences;
  };

  const sentences = splitIntoSentencesWithDelims(originalText || '');

  // Build suspect sentence indices for editing
  const suspectIndices = useMemo(() => {
    const indices = [];
    sentences.forEach((s, i) => {
      if (isSentenceSuspect(s)) indices.push(i);
    });
    return indices;
  }, [sentences]);

  const [editedByIndex, setEditedByIndex] = useState({});

  // Update analytics when suspect sentences computed (once per render of originalText)
  useEffect(() => {
    const suspectCount = suspectIndices.length;
    if (suspectCount > 0) {
      updateAnalytics({ totalSuspectSentences: suspectCount });
    }
  }, [originalText]);

  const handleEditChange = (index, value) => {
    setEditedByIndex(prev => ({ ...prev, [index]: value }));
  };

  // Human-likeness scoring (0-100)
  const personalWords = ['i', 'me', 'my', 'mine', 'myself', 'we', 'us', 'our', 'ours', 'ourselves'];
  const emotionalWords = ['love', 'hate', 'angry', 'happy', 'sad', 'excited', 'frustrated', 'worried', 'scared', 'nervous', 'confident', 'proud', 'ashamed', 'embarrassed', 'surprised', 'shocked', 'amazed', 'disappointed', 'relieved', 'anxious', 'calm', 'peaceful', 'joyful'];

  const scoreHumanLikeness = (text) => {
    const t = (text || '').trim().toLowerCase();
    if (t.length === 0) return 0;
    const words = t.split(/\s+/);
    const numWords = Math.max(words.length, 1);
    const personalCount = personalWords.reduce((acc, w) => acc + (t.includes(` ${w} `) || t.startsWith(w + ' ') || t.endsWith(' ' + w) ? 1 : 0), 0);
    const emotionalCount = emotionalWords.reduce((acc, w) => acc + (t.includes(w) ? 1 : 0), 0);
    const hasTransitional = transitionalPhrases.some(p => t.includes(p));
    const hasFormal = formalPhrases.some(p => t.includes(p));

    // Features
    const personalScore = Math.min(personalCount / 3, 1); // encourages some personal voice
    const emotionalScore = Math.min(emotionalCount / 3, 1);
    const lengthPenalty = words.length > 30 ? Math.min((words.length - 30) / 30, 1) : 0; // long sentences penalized
    const formalPenalty = hasFormal ? 0.4 : 0;
    const transitionalPenalty = hasTransitional ? 0.3 : 0;
    const diversityScore = Math.min(new Set(words).size / numWords, 1);

    let score = 0;
    score += personalScore * 0.3;
    score += emotionalScore * 0.2;
    score += diversityScore * 0.3;
    score += (words.length <= 25 ? 0.2 : 0.1); // slight length preference
    score -= lengthPenalty * 0.3;
    score -= formalPenalty;
    score -= transitionalPenalty;

    score = Math.max(0, Math.min(1, score));
    return Math.round(score * 100);
  };

  const perSentenceScores = useMemo(() => {
    return suspectIndices.map((idx) => {
      const edited = editedByIndex[idx] !== undefined ? editedByIndex[idx] : sentences[idx];
      return scoreHumanLikeness(edited);
    });
  }, [suspectIndices, editedByIndex, sentences]);

  const averageScore = perSentenceScores.length > 0
    ? Math.round(perSentenceScores.reduce((a, b) => a + b, 0) / perSentenceScores.length)
    : 0;

  // Simple rewrite helper to make text more human-like
  const rewriteToHuman = (text) => {
    if (!text) return '';
    let s = (text + ' ').replace(/\s+/g, ' ').trim();
    const lower = s.toLowerCase();

    // Remove or simplify transitional/formal phrases at the start
    const starters = [
      'in conclusion,', 'to summarize,', 'as a result,', 'therefore,', 'thus,', 'hence,',
      'furthermore,', 'moreover,', 'additionally,', 'consequently,', 'accordingly,',
      'on the other hand,', 'in contrast,', 'however,', 'nevertheless,', 'nonetheless,',
      'for instance,', 'for example,', 'specifically,', 'particularly,',
      'it is important to note that', 'it should be noted that', 'it is worth mentioning that',
      'it is crucial that', 'it is essential that', 'it is necessary that', 'it is vital that'
    ];
    starters.forEach(p => {
      const regex = new RegExp('^' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*', 'i');
      s = s.replace(regex, '');
    });

    // Light de-formalization
    s = s
      .replace(/\bit is\b/gi, "it's")
      .replace(/\bdo not\b/gi, "don't")
      .replace(/\bcannot\b/gi, "can't")
      .replace(/\bwe are\b/gi, "we're")
      .replace(/\bthey are\b/gi, "they're")
      .replace(/\bthere is\b/gi, "there's")
      .replace(/\bthere are\b/gi, "there are")
      .replace(/\bmoreover\b/gi, 'also')
      .replace(/\bfurthermore\b/gi, 'also')
      .replace(/\badditionally\b/gi, 'also')
      .replace(/\butilize\b/gi, 'use')
      .replace(/\butilization\b/gi, 'use')
      .replace(/\bmethodology\b/gi, 'method')
      .replace(/\bthus\b/gi, 'so')
      .replace(/\btherefore\b/gi, 'so');

    // Split long sentences by commas to reduce length
    if (s.split(/\s+/).length > 28) {
      const parts = s.split(/,\s+/);
      if (parts.length > 1) {
        s = parts.slice(0, 2).join(', ') + '.';
      }
    }

    // Add a subtle personal touch if none present
    if (!/(\bi\b|\bwe\b|\bmy\b|\bour\b)/i.test(s)) {
      s = `I think ${s.charAt(0).toLowerCase()}${s.slice(1)}`;
    }

    // Ensure sentence ends properly
    if (!/[.!?]$/.test(s)) s += '.';

    return s.trim();
  };

  const suggestForIndex = (idx) => {
    const original = sentences[idx] || '';
    const suggestion = rewriteToHuman(original);
    setEditedByIndex(prev => ({ ...prev, [idx]: suggestion }));
    updateAnalytics({ totalRewriteSuggestions: 1 });
  };

  const improvedFullText = useMemo(() => {
    if (sentences.length === 0) return '';
    return sentences
      .map((s, i) => (editedByIndex[i] !== undefined ? editedByIndex[i] : s))
      .join('');
  }, [sentences, editedByIndex]);

  return (
    <Card 
      style={{ 
        marginTop: '20px',
        borderRadius: '16px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
        animation: 'fadeInUp 0.6s ease-out'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: isAI ? 'linear-gradient(135deg, #ff6b6b, #ee5a52)' : 'linear-gradient(135deg, #4ecdc4, #44a08d)',
          marginBottom: '20px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }}>
          {isAI ? (
            <RobotOutlined style={{ fontSize: '40px', color: '#fff' }} />
          ) : (
            <UserOutlined style={{ fontSize: '40px', color: '#fff' }} />
          )}
        </div>
        
        <Title level={3} style={{ 
          margin: '0 0 10px 0',
          color: isAI ? '#ff4d4f' : '#52c41a'
        }}>
          {isAI ? 'AI Generated' : 'Human Written'}
        </Title>
        
        <Text style={{ color: '#666', fontSize: '16px' }}>
          {isAI 
            ? 'This text appears to be generated by artificial intelligence'
            : 'This text appears to be written by a human'
          }
        </Text>
      </div>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Confidence Score */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <Text strong style={{ fontSize: '16px' }}>Confidence Score</Text>
            <Tag 
              color={getConfidenceColor(confidence)}
              style={{ 
                fontSize: '14px',
                padding: '4px 12px',
                borderRadius: '12px'
              }}
            >
              {confidence}%
            </Tag>
          </div>
          <Progress 
            percent={confidence} 
            status={getConfidenceStatus(confidence)}
            strokeColor={getConfidenceColor(confidence)}
            strokeWidth={8}
            showInfo={false}
            style={{ marginBottom: '20px' }}
          />
        </div>

        {/* Classification */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px',
          background: isAI ? 'rgba(255, 77, 79, 0.1)' : 'rgba(82, 196, 26, 0.1)',
          borderRadius: '12px',
          border: `2px solid ${isAI ? 'rgba(255, 77, 79, 0.2)' : 'rgba(82, 196, 26, 0.2)'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAI ? (
              <RobotOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
            ) : (
              <UserOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            )}
            <div>
              <Text strong style={{ fontSize: '16px', display: 'block' }}>
                Classification
              </Text>
              <Text style={{ color: '#666' }}>
                {isAI ? 'AI Generated Content' : 'Human Written Content'}
              </Text>
            </div>
          </div>
          <Tag 
            color={isAI ? 'red' : 'green'}
            style={{ 
              fontSize: '14px',
              padding: '6px 16px',
              borderRadius: '16px',
              fontWeight: 'bold'
            }}
          >
            {isAI ? 'AI' : 'Human'}
          </Tag>
        </div>

        {/* Additional Details */}
        {result.details && (
          <div style={{ 
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
              Analysis Details
            </Text>
            <Text style={{ color: '#666', lineHeight: '1.6' }}>
              {result.details}
            </Text>
          </div>
        )}

        {/* Highlighted Text Preview */}
        {originalText && originalText.trim().length > 0 && (
          <div style={{ 
            padding: '16px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text strong style={{ fontSize: '16px' }}>
                Highlighted Text (AI-suspect sentences)
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '16px', height: '10px', background: 'rgba(255, 77, 79, 0.2)', border: '1px solid rgba(255, 77, 79, 0.35)', borderRadius: '4px' }} />
                  <Text style={{ color: '#666' }}>Suspected AI</Text>
                </div>
              </div>
            </div>
            <div style={{ color: '#333', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-wrap' }}>
              {sentences.map((s, idx) => {
                const suspect = isSentenceSuspect(s);
                return (
                  <span
                    key={idx}
                    style={suspect ? {
                      background: 'rgba(255, 77, 79, 0.2)',
                      border: '1px solid rgba(255, 77, 79, 0.35)',
                      borderRadius: '6px',
                      padding: '0 3px'
                    } : undefined}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Improve Highlighted Content */}
        {suspectIndices.length > 0 && (
          <div style={{ 
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text strong style={{ fontSize: '16px' }}>
                Improve Highlighted Content (make it sound more human)
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text style={{ color: '#666' }}>Average human-likeness</Text>
                <Progress percent={averageScore} style={{ width: 180, margin: 0 }} showInfo />
              </div>
            </div>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {suspectIndices.map((idx, i) => {
                const original = sentences[idx];
                const edited = editedByIndex[idx] !== undefined ? editedByIndex[idx] : original;
                const score = scoreHumanLikeness(edited);
                return (
                  <div key={idx} style={{ background: '#fff', border: '1px solid #e9ecef', borderRadius: '12px', padding: '12px' }}>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                      Sentence {i + 1}
                    </Text>
                    <div style={{ marginBottom: '8px', color: '#888', fontSize: '13px' }}>
                      Original: {original}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                      <Button size="small" onClick={() => suggestForIndex(idx)}>
                        Suggest rewrite
                      </Button>
                    </div>
                    <Input.TextArea
                      rows={3}
                      value={edited}
                      onChange={(e) => handleEditChange(idx, e.target.value)}
                      placeholder="Rewrite this sentence to be more personal, concise, and expressive."
                      style={{ borderRadius: '8px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                      <Text>Human-likeness</Text>
                      <Progress percent={score} style={{ width: 220, margin: 0 }} showInfo />
                    </div>
                  </div>
                );
              })}
            </Space>
          </div>
        )}

        {/* Improved Full Text */}
        {improvedFullText && improvedFullText.trim().length > 0 && (
          <div style={{ 
            padding: '16px',
            background: '#fff',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <Text strong style={{ fontSize: '16px' }}>
                Improved full text
              </Text>
              <Button size="small" onClick={() => {
                navigator.clipboard.writeText(improvedFullText);
                message.success('Improved text copied');
              }}>Copy</Button>
            </div>
            <div style={{ color: '#333', lineHeight: '1.8', fontSize: '15px', whiteSpace: 'pre-wrap' }}>
              {improvedFullText}
            </div>
          </div>
        )}

        {/* Trust Indicator */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '8px',
          padding: '12px',
          background: 'rgba(24, 144, 255, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(24, 144, 255, 0.2)'
        }}>
          <TrophyOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
          <Text style={{ color: '#1890ff', fontSize: '14px' }}>
            Powered by advanced AI detection technology
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default ResultDisplay;
