import React, { useState } from 'react';
import { Copy, Check, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const generateCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const PasteInput: React.FC = () => {
  const [text, setText] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter some text to share.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const code = generateCode();
      
      const { error } = await supabase
        .from('pastes')
        .insert({ code, content: text });
      
      if (error) {
        // If code already exists, try again with a new code
        if (error.code === '23505') {
          const newCode = generateCode();
          const { error: retryError } = await supabase
            .from('pastes')
            .insert({ code: newCode, content: text });
          
          if (retryError) throw retryError;
          setGeneratedCode(newCode);
        } else {
          throw error;
        }
      } else {
        setGeneratedCode(code);
      }
      
      toast({
        title: "🐵 Paste Created!",
        description: "Your unique code is ready to share.",
      });
    } catch (error) {
      console.error('Error creating paste:', error);
      toast({
        title: "Error",
        description: "Failed to create paste. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareableLink = generatedCode 
    ? `${window.location.origin}/paste/${generatedCode}`
    : '';

  const handleNewPaste = () => {
    setText('');
    setGeneratedCode(null);
    setCopied(false);
  };

  return (
    <section id="paste-section" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {!generatedCode ? (
          <div className="bg-card rounded-3xl shadow-card border border-border p-6 sm:p-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-secondary">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Create a Paste</h2>
                <p className="text-sm text-muted-foreground">Enter your text below</p>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="w-full h-48 p-4 rounded-2xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 font-nunito"
            />

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">
                {text.length} characters
              </span>
              <Button
                variant="hero"
                onClick={handleGenerate}
                disabled={isGenerating || !text.trim()}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Share2 size={18} />
                    Generate Link
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-3xl shadow-card border border-border p-6 sm:p-8 animate-slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Paste Created! 🎉</h2>
              <p className="text-muted-foreground">Share the code or link below</p>
            </div>

            {/* Code display */}
            <div className="bg-secondary rounded-2xl p-6 mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Your Unique Code
              </label>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold tracking-widest text-foreground font-mono">
                  {generatedCode}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(generatedCode)}
                  className="shrink-0"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </Button>
              </div>
            </div>

            {/* Link display */}
            <div className="bg-secondary rounded-2xl p-4 mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Shareable Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 bg-transparent text-foreground text-sm truncate focus:outline-none"
                />
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => copyToClipboard(shareableLink)}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  Copy
                </Button>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={handleNewPaste}
            >
              Create Another Paste
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PasteInput;
