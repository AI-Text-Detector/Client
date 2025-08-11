import React from 'react';
import { Layout, Typography, Space, Button } from 'antd';
import { RobotOutlined, GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  return (
    <AntHeader 
      style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '0 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Space align="center">
        <RobotOutlined 
          style={{ 
            fontSize: '32px', 
            color: '#fff',
            marginRight: '12px'
          }} 
        />
        <Title 
          level={3} 
          style={{ 
            margin: 0, 
            color: '#fff',
            fontWeight: 'bold'
          }}
        >
          AI Text Detector
        </Title>
      </Space>
      
      <Space size="large">
        <Button 
          type="text" 
          icon={<QuestionCircleOutlined />}
          style={{ color: '#fff' }}
        >
          How it Works
        </Button>
        <Button 
          type="text" 
          icon={<GithubOutlined />}
          style={{ color: '#fff' }}
        >
          GitHub
        </Button>
      </Space>
    </AntHeader>
  );
};

export default Header;
