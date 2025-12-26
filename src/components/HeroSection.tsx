import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const scrollToPaste = () => {
    const pasteSection = document.getElementById('paste-section');
    if (pasteSection) {
      pasteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 pt-24 pb-12 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-glow/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Floating icons */}
        <div className="absolute top-32 right-[15%] text-4xl animate-float opacity-30" style={{ animationDelay: '0.5s' }}>📋</div>
        <div className="absolute bottom-32 left-[10%] text-3xl animate-float opacity-30" style={{ animationDelay: '1.5s' }}>🔗</div>
        <div className="absolute top-1/2 right-[8%] text-3xl animate-float opacity-30" style={{ animationDelay: '2.5s' }}>⚡</div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-slide-up">
          <Zap size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Simple & Lightning Fast</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Share <span className="text-gradient">Instantly</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Paste your text, get a unique code, share with anyone, anywhere.{' '}
          <span className="text-foreground font-semibold">No signup needed.</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={scrollToPaste}
            className="w-full sm:w-auto"
          >
            Start Sharing
            <ArrowRight size={18} />
          </Button>
          <Link to="/access" className="w-full sm:w-auto">
            <Button 
              variant="heroSecondary" 
              size="lg"
              className="w-full"
            >
              Access a Paste
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="flex flex-wrap items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">No signup required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Instant sharing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
