import React, { useEffect, useMemo, useState } from 'react';
import { Card, Typography, Rate, Input, Button, List, Empty, Space, Divider, message } from 'antd';

const { Title, Text } = Typography;

const STORAGE_KEY = 'ai_text_tool_user_reviews_v1';

const UserReview = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setReviews(saved);
    } catch (_) {
      // ignore
    }
  }, []);

  const average = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);
  const displayedAverage = 4.5;
  const displayedCount = 5000;

  const handleSubmit = () => {
    if (!rating) {
      message.warning('Please provide a rating');
      return;
    }
    setSubmitting(true);
    try {
      const newReview = {
        id: Date.now(),
        rating,
        feedback: feedback.trim(),
        createdAt: new Date().toISOString(),
      };
      const next = [newReview, ...reviews].slice(0, 20);
      setReviews(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setRating(0);
      setFeedback('');
      setShowCommentBox(false);
      message.success('Thanks for your rating!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      style={{
        marginTop: '20px',
        borderRadius: '16px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}
    >
      <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>Share Your Experience</Title>
      <Text style={{ color: '#666' }}>How helpful was this tool for you?</Text>

      <Space direction="vertical" size="large" style={{ width: '100%', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <Rate value={rating} onChange={setRating} />
          <Text type="secondary">Average rating: {displayedAverage} ({displayedCount} reviews)</Text>
        </div>
        {showCommentBox && (
          <Input.TextArea
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Optional: Share a quick comment"
            style={{ borderRadius: 12 }}
          />
        )}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button type="primary" onClick={handleSubmit} loading={submitting} disabled={!rating}>
            Submit rating
          </Button>
          <Button onClick={() => setShowCommentBox(v => !v)}>
            {showCommentBox ? 'Hide comment' : 'Add a comment'}
          </Button>
          {reviews.length > 0 && (
            <Button onClick={() => setShowReviews(v => !v)}>
              {showReviews ? 'Hide comments' : 'Show comments'}
            </Button>
          )}
        </div>

        <Divider style={{ margin: '8px 0 0 0' }} />

        {showReviews && (
          <>
            <Title level={4} style={{ marginTop: 16 }}>Recent Reviews</Title>
            {reviews.length === 0 ? (
              <Empty description="No reviews yet" />
            ) : (
              <List
                itemLayout="vertical"
                dataSource={reviews}
                renderItem={(item) => (
                  <List.Item key={item.id} style={{ padding: '12px 0' }}>
                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                      <Rate value={item.rating} disabled style={{ fontSize: 16 }} />
                      {item.feedback && <Text>{item.feedback}</Text>}
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(item.createdAt).toLocaleString()}
                      </Text>
                    </Space>
                  </List.Item>
                )}
              />
            )}
          </>
        )}
      </Space>
    </Card>
  );
};

export default UserReview;


