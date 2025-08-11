import React from 'react';
import { Layout, Typography } from 'antd';
import TextInput from '../components/TextInput';

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 50px' }}>
        <Title level={2} style={{ margin: '16px 0', color: '#1890ff' }}>
          AI Text Detector
        </Title>
      </Header>
      <Content style={{ padding: '50px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
          <TextInput />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
