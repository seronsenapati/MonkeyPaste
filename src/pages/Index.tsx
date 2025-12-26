import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PasteInput from '@/components/PasteInput';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>MonkeyPaste - Simple & Fast Anonymous Text Sharing</title>
        <meta name="description" content="Share text instantly with MonkeyPaste. Paste your text, get a unique code, and share with anyone. No signup needed!" />
      </Helmet>
      
      <div className="min-h-screen gradient-hero">
        <Navbar />
        <main>
          <HeroSection />
          <PasteInput />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
