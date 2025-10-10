import React from 'react';
import { Layout, Typography, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { RobotOutlined } from '@ant-design/icons';

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
          <Link to="/" style={{ color: '#fff' }}>AI Text Detector</Link>
        </Title>
      </Space>
      
      <Space size="large">
        <Link to="/ai-detector-for-teachers-students-free">
          <Button type="text" style={{ color: '#fff' }}>For Teachers & Students</Button>
        </Link>
        <Link to="/contact">
          <Button type="text" style={{ color: '#fff' }}>Contact Us</Button>
        </Link>
      </Space>
    </AntHeader>
  );
};

export default Header;
