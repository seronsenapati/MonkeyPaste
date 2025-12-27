import { Link, useLocation } from "react-router-dom";
import MonkeyLogo from "./MonkeyLogo";
import { Button } from "./ui/button";
import { Clipboard, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
      <Link to="/" className="inline-flex items-center gap-2 transition-transform hover:scale-105 group px-6 py-3 rounded-full border-[1.5px] border-[#dadada] bg-background/50 backdrop-blur-sm">
        <MonkeyLogo size="md" showText={true} />
      </Link>
    </nav>
  );
};

export default Navbar;
