import logoImage from "@/logo/logo.jpeg";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-10 sm:h-12 w-auto",
    lg: "h-16 sm:h-20 w-auto"
  };

  return (
    <div className={`flex items-center ${className} group`}>
      <img
        src={logoImage}
        alt="AHDC Real Estate Logo"
        className={`${sizeClasses[size]} object-contain transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
};

export default Logo;

