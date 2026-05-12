import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/" ) return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-2xl shadow-background/50 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-105 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] group-hover:border-primary/40 group-active:scale-95">
              ✦
            </div>
            <div className="flex flex-col leading-none">
              <strong className="text-foreground text-lg font-extrabold tracking-tight group-hover:text-primary transition-colors duration-300">FineTune Physics</strong>
              <small className="text-muted-foreground text-[11px] tracking-widest uppercase font-semibold mt-0.5">Build Your Universe</small>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav Pill */}
        <div className="hidden sm:flex justify-center flex-none">
          <nav className="flex items-center gap-1 bg-secondary/40 border border-border/40 rounded-full p-1.5 backdrop-blur-md shadow-inner shadow-black/20">
            <Link
              to="/"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive("/") ? "bg-background text-foreground shadow-md border border-border/50" : "text-muted-foreground hover:text-foreground hover:bg-background/40"}`}
            >
              Home
            </Link>
            <Link
              to="/Features"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive("/Features") ? "bg-background text-foreground shadow-md border border-border/50" : "text-muted-foreground hover:text-foreground hover:bg-background/40"}`}
            >
              Features
            </Link>
            <Link
              to="/Support"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive("/Support") ? "bg-background text-foreground shadow-md border border-border/50" : "text-muted-foreground hover:text-foreground hover:bg-background/40"}`}
            >
              Support
            </Link>
            <a
              href="#"
              className="px-5 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/40 transition-all duration-300"
            >
              Privacy
            </a>
          </nav>
        </div>

        {/* Right: CTA & Mobile Trigger */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <a
            href="https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex relative overflow-hidden items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-[1.04] active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]" style={{ animation: 'shimmer 2.5s infinite linear' }} />
            <span className="relative">Add to Chrome</span>
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/50 rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-80 p-0 flex flex-col">
              <div className="p-6 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xl">
                    ✦
                  </div>
                  <div className="flex flex-col leading-none">
                    <strong className="text-foreground text-lg font-extrabold">FineTune Physics</strong>
                    <small className="text-muted-foreground text-[11px] tracking-widest uppercase mt-1">Build Your Universe</small>
                  </div>
                </div>
              </div>
              <nav className="flex-1 flex flex-col gap-2 p-6 overflow-y-auto">
                {[
                  { path: "/", label: "Home" },
                  { path: "/Features", label: "Features" },
                  { path: "/Support", label: "Support" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-200 ${isActive(item.path) ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent"}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="#"
                  className="px-4 py-4 rounded-2xl text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent transition-all duration-200"
                >
                  Privacy
                </a>
              </nav>
              <div className="p-6 border-t border-border/40 bg-secondary/10">
                <a
                  href="https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="relative overflow-hidden w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-4 rounded-2xl text-base transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] active:scale-95"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]" style={{ animation: 'shimmer 2.5s infinite linear' }} />
                  <span className="relative">Add to Chrome — Free</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}