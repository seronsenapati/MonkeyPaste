import { cn } from "@/lib/utils";

interface MonkeyLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
}

const MonkeyLogo = ({ className, size = "md", animated = true, showText = true }: MonkeyLogoProps) => {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          sizeClasses[size],
          "relative",
          animated && "hover:animate-wiggle cursor-pointer transition-transform hover:scale-110"
        )}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Monkey Face SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-lg relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ears */}
          <circle cx="12" cy="42" r="16" className="fill-[hsl(25,45%,22%)]" />
          <circle cx="12" cy="42" r="11" className="fill-primary" />
          <circle cx="88" cy="42" r="16" className="fill-[hsl(25,45%,22%)]" />
          <circle cx="88" cy="42" r="11" className="fill-primary" />
          
          {/* Main face */}
          <circle cx="50" cy="50" r="40" className="fill-[hsl(25,45%,22%)]" />
          
          {/* Face inner (lighter) */}
          <ellipse cx="50" cy="58" rx="28" ry="24" className="fill-primary" />
          
          {/* Eyes background */}
          <ellipse cx="36" cy="40" rx="10" ry="11" className="fill-background" />
          <ellipse cx="64" cy="40" rx="10" ry="11" className="fill-background" />
          
          {/* Pupils */}
          <circle cx="38" cy="41" r="5" className="fill-secondary" />
          <circle cx="66" cy="41" r="5" className="fill-secondary" />
          
          {/* Eye shine */}
          <circle cx="40" cy="39" r="2" className="fill-background" />
          <circle cx="68" cy="39" r="2" className="fill-background" />
          
          {/* Nose area */}
          <ellipse cx="50" cy="58" rx="14" ry="10" className="fill-[hsl(25,45%,22%)]/70" />
          
          {/* Nostrils */}
          <ellipse cx="44" cy="58" rx="3.5" ry="2.5" className="fill-secondary/50" />
          <ellipse cx="56" cy="58" rx="3.5" ry="2.5" className="fill-secondary/50" />
          
          {/* Smile */}
          <path
            d="M 38 70 Q 50 80 62 70"
            stroke="hsl(var(--secondary))"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Eyebrows */}
          <path
            d="M 28 30 Q 36 26 44 30"
            stroke="hsl(25,45%,22%)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 56 30 Q 64 26 72 30"
            stroke="hsl(25,45%,22%)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      
      {showText && (
        <span
          className={cn(
            "font-extrabold tracking-tight",
            textSizes[size]
          )}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="text-primary">Monkey</span>
          <span className="text-secondary">Paste</span>
        </span>
      )}
    </div>
  );
};

export default MonkeyLogo;
