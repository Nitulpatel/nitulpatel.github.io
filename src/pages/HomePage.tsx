import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Skills from '../components/Skills';

interface HomePageProps {
  onNavigate: (target: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <Stats />
      <About onNavigate={onNavigate} />
      <Skills />
    </main>
  );
};

export default HomePage;
