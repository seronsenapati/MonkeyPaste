import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, ArrowLeft, FileText, Clock, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PasteData {
  content: string;
  created_at: string;
}

const ViewPaste: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [paste, setPaste] = useState<PasteData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPaste = async () => {
      if (!code) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('pastes')
          .select('content, created_at')
          .eq('code', code)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setPaste(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching paste:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaste();
  }, [code]);

  const copyToClipboard = async () => {
    if (paste) {
      await navigator.clipboard.writeText(paste.content);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading... - MonkeyPaste</title>
        </Helmet>
        
        <div className="min-h-screen gradient-hero flex flex-col">
          <Navbar />
          
          <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
            <div className="text-center animate-slide-up">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading paste...</p>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <Helmet>
          <title>Paste Not Found - MonkeyPaste</title>
        </Helmet>
        
        <div className="min-h-screen gradient-hero flex flex-col">
          <Navbar />
          
          <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
            <div className="text-center animate-slide-up">
              <div className="text-6xl mb-6">🙈</div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Paste Not Found</h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                The paste you're looking for doesn't exist or may have been removed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/">
                  <Button variant="hero">
                    <ArrowLeft size={18} />
                    Go Home
                  </Button>
                </Link>
                <Link to="/access">
                  <Button variant="heroSecondary">
                    Try Another Code
                  </Button>
                </Link>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>View Paste - MonkeyPaste</title>
        <meta name="description" content="View shared text on MonkeyPaste." />
      </Helmet>
      
      <div className="min-h-screen gradient-hero flex flex-col">
        <Navbar />
        
        <main className="flex-1 px-4 pt-24 pb-12">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <div className="bg-card rounded-3xl shadow-card border border-border p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-secondary">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">Paste: {code}</h1>
                    {paste && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock size={14} />
                        {formatDate(paste.created_at)}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="hero"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </Button>
              </div>

              {/* Content */}
              {paste && (
                <div className="bg-secondary/50 rounded-2xl p-4 sm:p-6 border border-border">
                  <pre className="whitespace-pre-wrap break-words text-foreground font-nunito text-base leading-relaxed">
                    {paste.content}
                  </pre>
                </div>
              )}

              {/* Back link */}
              <div className="mt-6 text-center">
                <Link to="/">
                  <Button variant="ghost" className="text-muted-foreground">
                    <ArrowLeft size={16} />
                    Create Your Own Paste
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ViewPaste;
