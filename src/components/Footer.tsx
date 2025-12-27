import MonkeyLogo from "./MonkeyLogo";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-muted/20">
      <div className="container mx-auto flex flex-col items-center gap-3 xs:gap-4 sm:gap-5 px-4 py-6 xs:py-8 sm:py-10 text-center">
        <MonkeyLogo size="sm" animated={true} />
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
          <span>by</span>
          <a 
            href="https://in.linkedin.com/in/seronsenapati" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline transition-all duration-300"
          >
            @SeronSenapati
          </a>
        </div>
        
        <p className="text-sm text-muted-foreground font-medium">
          Share text like a monkey shares bananas 🍌
        </p>
        
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} MonkeyPaste. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
