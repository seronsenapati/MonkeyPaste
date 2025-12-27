import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPaste } from "@/lib/pasteStore";
import { Copy, Check, Home, AlertCircle, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const PasteViewer = () => {
  const { code } = useParams<{ code: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPaste = async () => {
      if (code) {
        try {
          const paste = await getPaste(code);
          setContent(paste);
        } catch (error) {
          console.error('Error fetching paste:', error);
          setContent(null);
        }
      }
      setLoading(false);
    };
    
    fetchPaste();
  }, [code]);

  const copyToClipboard = async () => {
    if (content) {
      try {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Copied!",
          description: "Text copied to clipboard.",
        });
      } catch (err) {
        console.error('Failed to copy:', err);
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard. Please try again or copy manually.",
          variant: "destructive",
        });
        
        // Fallback: try to use document.execCommand
        try {
          const textArea = document.createElement('textarea');
          textArea.value = content;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          
          toast({
            title: "Copied!",
            description: "Text copied to clipboard using fallback method.",
          });
        } catch (fallbackErr) {
          console.error('Fallback copy also failed:', fallbackErr);
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 gradient-hero">
        <section className="relative overflow-hidden gradient-hero pt-24 pb-16 sm:pt-16 sm:pb-20 lg:py-24">
          {/* Background decorations */}
          <div className="absolute inset-0 pattern-dots opacity-40" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute pointer-events-none select-none top-20 left-[10%] floating opacity-60">
            <div className="text-5xl">🍌</div>
          </div>
          <div className="absolute pointer-events-none select-none top-32 right-[15%] floating-delayed opacity-50">
            <div className="text-4xl">📋</div>
          </div>
          <div className="absolute pointer-events-none select-none bottom-20 left-[20%] floating-slow opacity-40">
            <div className="text-3xl">✨</div>
          </div>
          <div className="absolute pointer-events-none select-none bottom-32 right-[10%] floating opacity-50">
            <div className="text-4xl">🐒</div>
          </div>

          <div className="container relative mx-auto px-4">
            <Card 
              className="mx-auto max-w-2xl border-0 shadow-card bg-card/90 backdrop-blur-sm overflow-hidden animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
            >
              
              <CardContent className="p-4 xs:p-6 sm:p-10">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="relative">
                      <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Loading paste...</p>
                  </div>
                ) : content !== null ? (
                  <div className="space-y-8 animate-scale-in">
                    {/* Header */}
                    <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-4">
                      <div className="flex items-center gap-3 xs:gap-4">
                        <div className="flex h-12 w-12 xs:h-14 xs:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                          <FileText className="h-6 xs:h-7 w-6 xs:w-7 text-primary" />
                        </div>
                        <div>
                          <div>
                            <h1 
                              className="text-xl xs:text-2xl font-black"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              MonkeyPaste Shared
                            </h1>
                            <p className="text-xs xs:text-sm text-muted-foreground flex items-center gap-2 mt-1">
                              MonkeyPaste Code: 
                              <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                {code}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <Textarea
                        readOnly
                        value={content}
                        className="min-h-[200px] xs:min-h-[280px] resize-none rounded-2xl border-2 border-border/50 bg-muted/30 text-sm xs:text-base font-medium leading-relaxed"
                        aria-label="Shared text content"
                      />
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 xs:gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {content.length.toLocaleString()} characters
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <Button
                        variant={copied ? "default" : "hero"}
                        size="lg"
                        className={cn(
                          "w-full gap-2 transition-all duration-300",
                          copied && "bg-green-500 hover:bg-green-500"
                        )}
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <>
                            <Check className="h-5 w-5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            Copy MonkeyPaste
                            <div className="text-lg">🐵</div>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="w-full gap-2"
                      >
                        <Link to="/">
                          Create New MonkeyPaste
                          <div className="text-lg">🙊</div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 py-8 text-center animate-scale-in">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-destructive/10">
                      <AlertCircle className="h-10 w-10 text-destructive" />
                    </div>
                    <div>
                      <h2 
                        className="text-2xl font-black mb-3"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        MonkeyPaste Not Found
                      </h2>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        The MonkeyPaste with code{" "}
                        <span className="font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded">
                          {code}
                        </span>{" "}
                        doesn't exist or has expired.
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Button variant="hero" size="lg" asChild className="w-full gap-2">
                        <Link to="/">
                          Create New MonkeyPaste
                          <div className="text-lg">🙊</div>
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild className="w-full gap-2">
                        <Link to="/access">
                          Try Another MonkeyPaste
                          <div className="text-lg">🙈</div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PasteViewer;
