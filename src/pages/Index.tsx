import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MonkeyLogo from "@/components/MonkeyLogo";
import { savePaste, generateLink } from "@/lib/pasteStore";
import {
  Copy,
  Share2,
  Check,
  Sparkles,
  Zap,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const FloatingElement = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("absolute pointer-events-none select-none", className)}>
    {children}
  </div>
);

const Index = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [activeCard, setActiveCard] = useState<'create' | 'access'>('create');
  const { toast } = useToast();

  const handleShare = async () => {
    if (!text.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter some text to share.",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);

    try {
      const newCode = await savePaste(text);
      const newLink = generateLink(newCode);
      setCode(newCode);
      setLink(newLink);

      toast({
        title: "Paste created! 🐵",
        description: "Your text is ready to share with the world.",
      });
    } catch (error) {
      console.error("Error creating paste:", error);
      toast({
        title: "Error",
        description: "Failed to create paste. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async (value: string, type: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(value);
      if (type === "code") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${
          type === "code" ? "Code" : "Link"
        } copied to clipboard.`,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy failed",
        description:
          "Could not copy to clipboard. Please try again or copy manually.",
        variant: "destructive",
      });

      // Fallback: try to use document.execCommand
      try {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        if (type === "code") {
          setCopiedCode(true);
          setTimeout(() => setCopiedCode(false), 2000);
        } else {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
        }

        toast({
          title: "Copied!",
          description: `${
            type === "code" ? "Code" : "Link"
          } copied to clipboard using fallback method.`,
        });
      } catch (fallbackErr) {
        console.error("Fallback copy also failed:", fallbackErr);
      }
    }
  };

  const handleReset = () => {
    setText("");
    setCode(null);
    setLink(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 gradient-hero">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero py-16 sm:py-20 lg:py-24">
          {/* Background decorations */}
          <div className="absolute inset-0 pattern-dots opacity-40" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
            <div
              className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          {/* Floating decorative elements */}
          <FloatingElement className="top-20 left-[10%] floating opacity-60">
            <div className="text-5xl">🍌</div>
          </FloatingElement>
          <FloatingElement className="top-32 right-[15%] floating-delayed opacity-50">
            <div className="text-4xl">📋</div>
          </FloatingElement>
          <FloatingElement className="bottom-20 left-[20%] floating-slow opacity-40">
            <div className="text-3xl">✨</div>
          </FloatingElement>
          <FloatingElement className="bottom-32 right-[10%] floating opacity-50">
            <div className="text-4xl">🐒</div>
          </FloatingElement>

          <div className="container relative mx-auto px-4 py-4 xs:py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row gap-4 xs:gap-5 sm:gap-6 xl:gap-12 items-center">
              {/* Cards Section - Left side */}
              <div className="w-full lg:w-1/2 space-y-6 max-w-2xl">
                {/* Toggle Buttons */}
                <div className="flex rounded-2xl bg-muted p-1 mt-2 xs:mt-3 mb-4 xs:mb-5 sm:mb-6">
                  <button
                    className={`flex-1 rounded-xl py-3 xs:py-4 text-center text-sm xs:text-base font-semibold transition-all duration-300 ${activeCard === 'create' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setActiveCard('create')}
                  >
                    Create MonkeyPaste
                  </button>
                  <button
                    className={`flex-1 rounded-xl py-3 xs:py-4 text-center text-sm xs:text-base font-semibold transition-all duration-300 ${activeCard === 'access' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setActiveCard('access')}
                  >
                    Access MonkeyPaste
                  </button>
                </div>
                
                {/* Card based on active state */}
                <Card
                  className="relative border border-white/40 shadow-card bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm animate-fade-in-up overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-4 xs:p-5 sm:p-6 lg:p-8 relative min-h-[380px] xs:min-h-[420px] sm:min-h-[450px]">
                    {/* Card background decorations */}
                    <div className="absolute inset-0 pattern-dots opacity-20" />
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl animate-pulse" />
                      <div
                        className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </div>
                    <div className="space-y-6 relative z-10 h-full flex flex-col">
                      {activeCard === 'create' ? (
                        <>
                          {/* Header */}
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                              <div className="text-2xl">🙊</div>
                            </div>
                            <div>
                              <h2
                                className="text-xl font-bold"
                                style={{
                                  fontFamily: "'Space Grotesk', sans-serif",
                                }}
                              >
                                Create MonkeyPaste
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                Share your text with the world via MonkeyPaste
                              </p>
                            </div>
                          </div>

                          {/* Textarea */}
                          <div className="flex-1 flex flex-col justify-center space-y-3">
                            <Textarea
                              id="paste-input"
                              placeholder="Share your text with MonkeyPaste..."
                              className="min-h-[150px] resize-none rounded-2xl border-2 border-border/50 bg-muted/30 text-base sm:text-lg transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-muted-foreground/50 flex-1"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              aria-label="Text to share with MonkeyPaste"
                            />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{text.length.toLocaleString()} characters</span>
                              {text.length > 0 && (
                                <button
                                  onClick={() => setText("")}
                                  className="hover:text-primary transition-colors"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-3">
                            <Button
                              variant="hero"
                              size="sm"
                              className="w-full gap-1 py-7 xs:py-8 text-lg xs:text-xl"
                              onClick={handleShare}
                              disabled={!text.trim() || isSharing}
                            >
                              {isSharing ? (
                                <>
                                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  Creating MonkeyPaste...
                                </>
                              ) : (
                                <>
                                  Share MonkeyPaste
                                  <div className="text-2xl xs:text-3xl">🐵</div>
                                </>
                              )}
                            </Button>
                            {code && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="w-full gap-1 py-7 xs:py-8 text-lg xs:text-xl"
                              >
                                New MonkeyPaste
                              </Button>
                            )}
                          </div>

                          {/* Results */}
                          <div className="flex-1">
                            {code && link && (
                              <div className="space-y-5 animate-scale-in pt-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                                  <span className="text-xs font-medium text-muted-foreground px-2">
                                    YOUR PASTE IS READY
                                  </span>
                                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                                </div>

                                <div className="grid gap-3 xs:gap-4">
                                  {/* Code */}
                                  <div className="space-y-2">
                                    <label className="text-base font-semibold text-foreground flex items-center gap-2">
                                      <span className="h-2 w-2 rounded-full bg-primary" />
                                      Your Unique Code
                                    </label>
                                    <div className="flex gap-1.5 xs:gap-2">
                                      <div className="flex-1 flex items-center justify-center rounded-2xl bg-secondary px-3 xs:px-5 py-4 xs:py-5 font-mono text-2xl xs:text-3xl font-black tracking-[0.15em] xs:tracking-[0.2em] text-secondary-foreground">
                                        {code}
                                      </div>
                                      <Button
                                        variant={copiedCode ? "default" : "outline"}
                                        size="icon"
                                        className={cn(
                                          "h-14 w-14 xs:h-16 xs:w-16 shrink-0 transition-all duration-300",
                                          copiedCode &&
                                            "bg-green-500 border-green-500 text-white hover:bg-green-500"
                                        )}
                                        onClick={() => copyToClipboard(code, "code")}
                                        aria-label="Copy code"
                                      >
                                        {copiedCode ? (
                                          <Check className="h-5 xs:h-6 w-5 xs:w-6" />
                                        ) : (
                                          <Copy className="h-5 xs:h-6 w-5 xs:w-6" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Link */}
                                  <div className="space-y-2">
                                    <label className="text-base font-semibold text-foreground flex items-center gap-2">
                                      <span className="h-2 w-2 rounded-full bg-accent" />
                                      Shareable Link
                                    </label>
                                    <div className="flex gap-1.5 xs:gap-2">
                                      <div className="flex-1 flex items-center overflow-hidden rounded-2xl bg-muted/50 border border-border/50 px-3 xs:px-5 py-4 xs:py-5 text-sm xs:text-base text-muted-foreground">
                                        <span className="truncate font-medium">
                                          {link}
                                        </span>
                                      </div>
                                      <Button
                                        variant={copiedLink ? "default" : "outline"}
                                        size="icon"
                                        className={cn(
                                          "h-14 w-14 xs:h-16 xs:w-16 shrink-0 transition-all duration-300",
                                          copiedLink &&
                                            "bg-green-500 border-green-500 text-white hover:bg-green-500"
                                        )}
                                        onClick={() => copyToClipboard(link, "link")}
                                        aria-label="Copy link"
                                      >
                                        {copiedLink ? (
                                          <Check className="h-5 xs:h-6 w-5 xs:w-6" />
                                        ) : (
                                          <Copy className="h-5 xs:h-6 w-5 xs:w-6" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Header */}
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                              <div className="text-2xl">🙉</div>
                            </div>
                            <div>
                              <h2
                                className="text-xl font-bold"
                                style={{
                                  fontFamily: "'Space Grotesk', sans-serif",
                                }}
                              >
                                Access MonkeyPaste
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                Enter the 6-digit numeric code to access shared text
                              </p>
                            </div>
                          </div>

                          <div className="flex-1 flex flex-col justify-center space-y-6 xs:space-y-8">
                            <div className="space-y-6">
                              <div className="space-y-5">
                                <Input
                                  type="text"
                                  placeholder="123456"
                                  value={accessCode}
                                  onChange={(e) => setAccessCode(e.target.value)}
                                  maxLength={6}
                                  className="h-16 xs:h-20 sm:h-24 rounded-2xl border-2 border-border/50 bg-muted/30 text-center font-mono text-3xl xs:text-4xl sm:text-5xl font-black tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none placeholder:text-muted-foreground/30 placeholder:tracking-[0.2em] sm:placeholder:tracking-[0.3em]"
                                  aria-label="MonkeyPaste code"
                                  autoComplete="off"
                                />
                                <div className="flex items-center justify-center gap-3 sm:gap-4">
                                  {[...Array(6)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`h-1.5 w-5 xs:h-2 xs:w-6 sm:h-2.5 sm:w-8 rounded-full transition-all duration-300 ${
                                        i < accessCode.length
                                          ? "bg-primary"
                                          : "bg-border"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            <Button
                              variant="hero"
                              size="sm"
                              className="w-full gap-1 py-7 xs:py-8 text-lg xs:text-xl"
                              onClick={() => {
                                if (accessCode.length === 6) {
                                  window.location.href = `/paste/${accessCode}`;
                                }
                              }}
                              disabled={accessCode.length !== 6}
                            >
                              Access MonkeyPaste
                              <div className="text-2xl xs:text-3xl">🐵</div>
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hero Content - Right side */}
              <div className="w-full lg:w-1/2 max-w-3xl text-center lg:text-left mt-8 xs:mt-10 sm:mt-4 md:mt-0 lg:-mt-16 xl:-mt-24">
                {/* Badge */}
                <div className="mb-2 xs:mb-3 inline-flex items-center gap-1 xs:gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-semibold text-primary animate-fade-in">
                  <Zap className="h-3 w-3 xs:h-4 xs:w-4" />
                  Simple & Lightning Fast
                </div>

                {/* Heading */}
                <h1
                  className="mb-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight animate-fade-in"
                  style={{
                    animationDelay: "0.1s",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Share{" "}
                  <span className="relative">
                    Instantly.
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      height="10"
                      viewBox="0 0 200 10"
                      fill="none"
                    >
                      <path
                        d="M2 8C50 4 150 4 198 8"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="opacity-50"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Subheading */}
                <p
                  className="mt-4 mb-4 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  Share text like a monkey shares bananas 🍌
                </p>

                {/* Stats */}
                <div
                  className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 xs:gap-2 sm:gap-3 md:gap-5 text-xs sm:text-sm animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#281D15] animate-pulse" />
                    <span className="text-[#281D15]">No signup required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#281D15] animate-pulse" />
                    <span className="text-[#281D15]">Instant sharing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#281D15] animate-pulse" />
                    <span className="text-[#281D15]">Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#281D15] animate-pulse" />
                    <span className="text-[#281D15]">Easy Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
