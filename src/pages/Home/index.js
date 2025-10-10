import React from 'react';
import { Layout, Typography, Card } from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Stats from '../../components/Stats';
import TextInput from '../../components/TextInput';
import FAQ from '../../components/FeaturesHomepageFaq';
import UserReview from '../../components/UserReview';
import ToolAnalytics from '../../components/ToolAnalytics';
import './index.css';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <Layout className="home-layout">
      <Header />
      
      <Content>
        <Hero />
        
        <div className="home-container">
          <Card className="home-card">
            <header className="home-heading">
              <Title level={2} className="home-title">
                Free AI Text Analysis Tool - Detect AI-Generated Content
              </Title>
              <p className="home-subtitle">
                Paste or type your text below to get instant AI detection results with 99% accuracy. 
                Our advanced machine learning algorithms analyze writing patterns to identify AI-generated content.
              </p>
            </header>
            
            <TextInput />
          </Card>
        </div>

        <section aria-label="User Reviews and Feedback">
          <div className="home-container">
            <Card className="home-card">
              <UserReview />
            </Card>
          </div>
        </section>

        <section aria-label="Tool Analytics">
          <div className="home-container">
            <Card className="home-card">
              <ToolAnalytics />
            </Card>
          </div>
        </section>

        <section aria-label="AI Detection Statistics">
          <Stats />
        </section>
        
        <section aria-label="AI Text Detection Features">
          <Features />
        </section>
        
        <section aria-label="Frequently Asked Questions about AI Detection">
          <FAQ />
        </section>
      </Content>
      
      <Footer />
    </Layout>
  );
};

export default Home;



