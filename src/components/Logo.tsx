interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className} group`}>
      {/* Logo Icon - Animated Building */}
      <div className="relative">
        <svg
          width="42"
          height="42"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
        >
          {/* Building Base */}
          <rect
            x="8"
            y="20"
            width="24"
            height="16"
            fill="currentColor"
            className="text-primary animate-draw-path"
            style={{
              animationDelay: "0.2s"
            }}
          />
          
          {/* Building Tower 1 */}
          <rect
            x="10"
            y="12"
            width="6"
            height="12"
            fill="currentColor"
            className="text-primary animate-slide-up"
            style={{
              animationDelay: "0.4s"
            }}
          />
          
          {/* Building Tower 2 (Tallest) */}
          <rect
            x="18"
            y="8"
            width="6"
            height="16"
            fill="currentColor"
            className="text-primary animate-slide-up"
            style={{
              animationDelay: "0.6s"
            }}
          />
          
          {/* Building Tower 3 */}
          <rect
            x="26"
            y="14"
            width="6"
            height="10"
            fill="currentColor"
            className="text-primary animate-slide-up"
            style={{
              animationDelay: "0.5s"
            }}
          />
          
          {/* Windows on Tower 1 */}
          <rect
            x="11.5"
            y="14"
            width="3"
            height="3"
            fill="hsl(var(--accent))"
            className="animate-twinkle"
            style={{ animationDelay: "1s" }}
          />
          <rect
            x="11.5"
            y="18"
            width="3"
            height="3"
            fill="hsl(var(--accent))"
            className="animate-twinkle"
            style={{ animationDelay: "1.2s" }}
          />
          
          {/* Windows on Tower 2 */}
          <rect
            x="19.5"
            y="10"
            width="3"
            height="3"
            fill="hsl(var(--accent))"
            className="animate-twinkle"
            style={{ animationDelay: "1.1s" }}
          />
          <rect
            x="19.5"
            y="14"
            width="3"
            height="3"
            fill="hsl(var(--accent))"
            className="animate-twinkle"
            style={{ animationDelay: "1.3s" }}
          />
          <rect
            x="19.5"
            y="18"
            width="3"
            height="3"
            fill="hsl(var(--accent))"
            className="animate-twinkle"
            style={{ animationDelay: "1.4s" }}
          />
          
          {/* Windows on Tower 3 */}
          <rect
            x="27.5"
            y="16"
            width="3"
            height="3"
            fill="hsl(var(--accent))"
            className="animate-twinkle"
            style={{ animationDelay: "1.5s" }}
          />
          <rect
            x="27.5"
            y="20"
            width="3"
            height="3"
            fill="hsl(var(--accent))"
            className="animate-twinkle"
            style={{ animationDelay: "1.6s" }}
          />
        </svg>
        
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent animate-slide-in-left transition-transform duration-200 group-hover:scale-105" style={{ animationDelay: "0.3s" }}>
          AHDC
        </span>
        <span className="text-[10px] font-medium text-muted-foreground -mt-1 animate-fade-in-delay" style={{ animationDelay: "0.8s" }}>
          Real Estate
        </span>
      </div>
    </div>
  );
};

export default Logo;

