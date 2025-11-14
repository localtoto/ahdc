import { NavLink } from "./NavLink";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm animate-slide-down">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <NavLink to="/" className="hover:opacity-90 transition-all duration-300 hover:scale-105">
          <Logo />
        </NavLink>
        
        <nav className="flex items-center gap-1 md:gap-2">
          <NavLink
            to="/"
            className="nav-link-item relative px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-300 hover:text-foreground rounded-lg hover:bg-primary/5"
            activeClassName="text-primary font-semibold bg-primary/10"
          >
            <span className="relative z-10">Home</span>
            <span className="nav-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link-item relative px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-300 hover:text-foreground rounded-lg hover:bg-primary/5"
            activeClassName="text-primary font-semibold bg-primary/10"
          >
            <span className="relative z-10">About</span>
            <span className="nav-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/properties"
            className="nav-link-item relative px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-300 hover:text-foreground rounded-lg hover:bg-primary/5"
            activeClassName="text-primary font-semibold bg-primary/10"
          >
            <span className="relative z-10">Properties</span>
            <span className="nav-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-link-item relative px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-300 hover:text-foreground rounded-lg hover:bg-primary/5"
            activeClassName="text-primary font-semibold bg-primary/10"
          >
            <span className="relative z-10">Contact</span>
            <span className="nav-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300"></span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
