import React from 'react';
import { Layout, Typography, Card } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import TextInput from '../components/TextInput';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content>
        <Hero />
        
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px 60px',
          minHeight: '60vh'
        }}>
          <Card 
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: 'none',
              background: '#fff'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Title level={2} style={{ 
                color: '#333',
                marginBottom: '10px'
              }}>
                Analyze Your Text
              </Title>
              <p style={{ 
                color: '#666', 
                fontSize: '16px',
                margin: 0
              }}>
                Paste or type your text below to get instant AI detection results
              </p>
            </div>
            
            <TextInput />
          </Card>
        </div>

        <Stats />
        <Features />
      </Content>
      
      <Footer />
    </Layout>
  );
};

export default Home;
