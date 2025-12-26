import React from 'react';
import MonkeyLogo from './MonkeyLogo';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MonkeyLogo size={28} />
            <span className="text-lg font-bold text-foreground">
              Monkey<span className="text-gradient">Paste</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center sm:text-right">
            Simple, fast, and anonymous text sharing.
            <br />
            <span className="text-xs">No signup required • Instant sharing</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
