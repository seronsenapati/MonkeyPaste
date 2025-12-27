import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, AlertTriangle, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 gradient-hero">
        <section className="relative overflow-hidden gradient-hero py-16 sm:py-24">
          {/* Background decorations */}
          <div className="absolute inset-0 pattern-dots opacity-30" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
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
          <div className="absolute inset-0 pattern-dots opacity-30" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-lg text-center">
              <div 
                className="mb-8 inline-flex animate-fade-in"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-destructive/20 blur-xl animate-pulse" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-destructive to-destructive/70 shadow-glow">
                    <AlertTriangle className="h-10 w-10 text-destructive-foreground" />
                  </div>
                </div>
              </div>
              
              <h1 
                className="mb-4 text-4xl font-black tracking-tight sm:text-5xl animate-fade-in"
                style={{ animationDelay: '0.1s', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Page Not <span className="text-destructive">Found</span>
              </h1>
              
              <p 
                className="mb-10 text-lg text-muted-foreground animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                The page you're looking for doesn't exist or has been moved
              </p>

              <Card 
                className="border-0 shadow-card bg-card/90 backdrop-blur-sm animate-fade-in-up overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
                style={{ animationDelay: '0.3s' }}
              >
                
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-5xl">🙈</div>
                    <p className="text-muted-foreground">
                      We couldn't find the page at <span className="font-mono font-bold bg-muted px-2 py-0.5 rounded">{location.pathname}</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                      <Button
                        variant="hero"
                        size="lg"
                        asChild
                        className="gap-2"
                      >
                        <a href="/">
                          <Home className="h-5 w-5" />
                          Go Home
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="gap-2"
                      >
                        <a href="/access">
                          <Sparkles className="h-5 w-5" />
                          Access a Paste
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
