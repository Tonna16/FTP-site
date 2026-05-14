import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-card border-t border-border/40 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-primary/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">
              ✦
            </div>
            <div className="flex flex-col leading-none">
              <strong className="text-foreground text-sm font-bold">FineTune Physics</strong>
              <small className="text-muted-foreground text-[10px] tracking-wide">Build Your Universe</small>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-1 flex-wrap justify-center">
            <Link to="/" className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200">Home</Link>
            <span className="text-border/80">·</span>
            <Link to="/Features" className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200">Features</Link>
            <span className="text-border/80">·</span>
            <Link to="/Support" className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200">Support</Link>
            <span className="text-border/80">·</span>
           <Link
  to="/Privacy"
  className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
>
  Privacy Policy
</Link>
          </nav>

          {/* CTA + copyright */}
          <div className="flex flex-col items-end gap-3">
            <a
              href="https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-1.5 bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-xl text-xs transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:scale-[1.03]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/15 to-transparent animate-[shimmer_4s_ease-in-out_infinite] bg-[length:200%_100%]" />
              <span className="relative">Add to Chrome — Free</span>
            </a>
            <p className="text-muted-foreground text-xs">© 2026 FineTune Physics</p>
          </div>
        </div>
      </div>
    </footer>
  );
}