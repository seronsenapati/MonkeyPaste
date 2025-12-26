import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AccessPaste: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter a paste code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Small delay for effect
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if paste exists in localStorage
    const pastes = JSON.parse(localStorage.getItem('monkeypaste_pastes') || '{}');
    
    if (pastes[code.trim()]) {
      navigate(`/paste/${code.trim()}`);
    } else {
      toast({
        title: "Paste not found",
        description: "The code you entered doesn't exist. Please check and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Access Paste - MonkeyPaste</title>
        <meta name="description" content="Enter a paste code to view shared text on MonkeyPaste." />
      </Helmet>
      
      <div className="min-h-screen gradient-hero flex flex-col">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
          <div className="w-full max-w-md animate-slide-up">
            <div className="bg-card rounded-3xl shadow-card border border-border p-6 sm:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                  <Search className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Access a Paste</h1>
                <p className="text-muted-foreground">Enter the unique code to view the shared text</p>
              </div>

              <form onSubmit={handleAccess} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Enter paste code"
                    maxLength={10}
                    className="w-full h-14 px-4 rounded-2xl bg-secondary border border-border text-foreground text-center text-2xl font-mono tracking-widest placeholder:text-muted-foreground placeholder:text-base placeholder:font-nunito placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !code.trim()}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      View Paste
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                The code is case-insensitive
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AccessPaste;
