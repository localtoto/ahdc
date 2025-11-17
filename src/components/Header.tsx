import { useState } from "react";
import { NavLink } from "./NavLink";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/properties", label: "Properties" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm animate-slide-down">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <NavLink to="/" className="hover:opacity-90 transition-all duration-300 hover:scale-105">
          <Logo />
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="nav-link-item relative px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-300 hover:text-foreground rounded-lg hover:bg-primary/5"
              activeClassName="text-primary font-semibold bg-primary/10"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="nav-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300"></span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center justify-between mb-4">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-9 w-9"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-link-item relative px-4 py-3 text-base font-medium text-foreground/70 transition-all duration-300 hover:text-foreground rounded-lg hover:bg-primary/5"
                  activeClassName="text-primary font-semibold bg-primary/10"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="nav-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300"></span>
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
