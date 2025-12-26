import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MonkeyLogo from './MonkeyLogo';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAccess = location.pathname === '/access';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-card border border-border/50 px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <MonkeyLogo size={36} />
            </div>
            <span className="text-xl font-bold text-foreground">
              Monkey<span className="text-gradient">Paste</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={isHome ? "nav" : "navGhost"} 
                size="sm"
                className="gap-2"
              >
                <Home size={16} />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link to="/access">
              <Button 
                variant={isAccess ? "nav" : "navGhost"} 
                size="sm"
                className="gap-2"
              >
                <ClipboardList size={16} />
                <span className="hidden sm:inline">Access Paste</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
