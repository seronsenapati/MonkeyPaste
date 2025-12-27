import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MonkeyLogo from "@/components/MonkeyLogo";
import { Search, ArrowRight, Clipboard, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccessPaste = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedCode = code.trim();
    
    if (!trimmedCode) {
      toast({
        title: "Enter a code",
        description: "Please enter a valid paste code.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Paste codes are 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Navigate with the code (case will be handled by case-insensitive lookup in pasteStore)
    navigate(`/paste/${trimmedCode}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 gradient-hero">
        <section className="relative overflow-hidden gradient-hero pt-24 pb-6 xs:pt-24 xs:pb-8 sm:pt-24 sm:pb-12">
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
              {/* Icon */}
              <div 
                className="mb-6 xs:mb-8 inline-flex animate-fade-in"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl animate-pulse" />
                  <div className="relative flex h-16 w-16 xs:h-20 xs:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent shadow-glow">
                    <Clipboard className="h-8 w-8 xs:h-10 xs:w-10 text-secondary" />
                  </div>
                </div>
              </div>
              
              {/* Heading */}
              <h1 
                className="mb-2 text-3xl xs:text-4xl font-black tracking-tight sm:text-5xl animate-fade-in"
                style={{ animationDelay: '0.1s', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Access <span className="">MonkeyPaste</span>
              </h1>
              
              <p 
                className="mb-6 text-base xs:text-lg text-muted-foreground animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                Enter the 6-digit numeric code to access your MonkeyPaste
              </p>

              {/* Card */}
              <Card 
                className="border-0 shadow-card bg-card/90 backdrop-blur-sm animate-fade-in-up overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
                style={{ animationDelay: '0.3s' }}
              >
                
                <CardContent className="p-6 xs:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Input
                        type="text"
                        placeholder="123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={6}
                        className="h-16 xs:h-20 rounded-2xl border-2 border-border/50 bg-muted/30 text-center font-mono text-3xl xs:text-4xl font-black tracking-[0.2em] xs:tracking-[0.3em] transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none placeholder:text-muted-foreground/30 placeholder:tracking-[0.2em] xs:placeholder:tracking-[0.3em]"
                        aria-label="MonkeyPaste code"
                        autoComplete="off"
                      />
                      <div className="flex items-center justify-center gap-1.5 xs:gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1.5 w-5 xs:h-1.5 xs:w-6 rounded-full transition-all duration-300 ${
                              i < code.length ? 'bg-primary' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full gap-1 py-5 xs:py-6"
                      disabled={code.length !== 6}
                    >
                      Access MonkeyPaste
                      <div className="text-lg xs:text-xl">🐵</div>
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Link */}
              <p 
                className="mt-4 text-sm xs:text-base text-muted-foreground animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                Don't have a code?{" "}
                <Link 
                  to="/" 
                  className="font-semibold text-primary hover:underline underline-offset-4 inline-flex items-center gap-0.5 transition-colors"
                >
                  Create a new MonkeyPaste
                  <div className="text-lg xs:text-xl">🙊</div>
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AccessPaste;
