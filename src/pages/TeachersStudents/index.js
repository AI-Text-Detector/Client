import React, { useEffect } from 'react';
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
import '../Home/index.css';

const { Content } = Layout;
const { Title } = Typography;

const TeachersStudents = () => {
  useEffect(() => {
    document.title = 'AI Detector for Teachers & Students free';
    // Update meta tags
    const desc = 'Free AI Detector for Teachers & Students: check essays and assignments instantly. Highlight AI-generated sentences, rewrite suggestions, and analytics. No signup.';
    const url = window.location.origin + '/ai-detector-for-teachers-students-free';
    const ensureMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    ensureMeta('name', 'description', desc);
    ensureMeta('property', 'og:title', 'AI Detector for Teachers & Students free');
    ensureMeta('property', 'og:description', desc);
    ensureMeta('property', 'og:type', 'website');
    ensureMeta('property', 'og:url', url);
    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', 'AI Detector for Teachers & Students free');
    ensureMeta('name', 'twitter:description', desc);
    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, []);

  return (
    <Layout className="home-layout">
      <Header />
      
      <Content>
        <Hero 
          titleText="AI Detector for Teachers & Students free"
          descriptionText="Free AI detector tailored for classrooms. Paste any essay or assignment to detect AI-generated content, highlight suspect sentences, and get rewrite suggestions with human-likeness scores."
        />
        
        <div className="home-container">
          <Card className="home-card">
            <header className="home-heading">
              <Title level={2} className="home-title">
                AI Detector for Teachers & Students free
              </Title>
              <p className="home-subtitle">
                Free AI Detector for Teachers & Students. Analyze essays instantly, highlight AI-like sentences, and improve them with one click. Perfect for classrooms and academic integrity.
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

export default TeachersStudents;


