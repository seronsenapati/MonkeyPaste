import React from 'react';

interface MonkeyLogoProps {
  className?: string;
  size?: number;
}

const MonkeyLogo: React.FC<MonkeyLogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ears */}
      <circle cx="18" cy="45" r="14" fill="hsl(30 50% 60%)" />
      <circle cx="18" cy="45" r="9" fill="hsl(37 60% 80%)" />
      <circle cx="82" cy="45" r="14" fill="hsl(30 50% 60%)" />
      <circle cx="82" cy="45" r="9" fill="hsl(37 60% 80%)" />
      
      {/* Head */}
      <circle cx="50" cy="50" r="35" fill="hsl(30 50% 55%)" />
      
      {/* Face */}
      <ellipse cx="50" cy="58" rx="25" ry="22" fill="hsl(37 60% 80%)" />
      
      {/* Eyes */}
      <ellipse cx="38" cy="42" rx="7" ry="8" fill="white" />
      <ellipse cx="62" cy="42" rx="7" ry="8" fill="white" />
      <circle cx="40" cy="43" r="4" fill="hsl(30 43% 12%)" />
      <circle cx="64" cy="43" r="4" fill="hsl(30 43% 12%)" />
      <circle cx="41" cy="42" r="1.5" fill="white" />
      <circle cx="65" cy="42" r="1.5" fill="white" />
      
      {/* Nose */}
      <ellipse cx="50" cy="58" rx="8" ry="6" fill="hsl(30 50% 45%)" />
      <circle cx="46" cy="57" r="2" fill="hsl(30 43% 25%)" />
      <circle cx="54" cy="57" r="2" fill="hsl(30 43% 25%)" />
      
      {/* Smile */}
      <path
        d="M42 68 Q50 76 58 68"
        stroke="hsl(30 50% 45%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Eyebrows */}
      <path
        d="M32 35 Q38 32 44 35"
        stroke="hsl(30 43% 30%)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M56 35 Q62 32 68 35"
        stroke="hsl(30 43% 30%)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default MonkeyLogo;
