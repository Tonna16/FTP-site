import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Heart, Radio, Trophy, BarChart2, Dna, Skull, Share2, ArrowRight, Star, ChevronRight, Atom, Sun, Globe, Activity, List } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import SolarSystem from "@/components/SolarSystem";

const iconMap = { Zap, Heart: Activity, Radio: List, Trophy, BarChart2, Dna, Skull, Share2, Star, Atom, Sun, Globe };

const globalStyles = `
  @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
  @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
  @keyframes floatC { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(1deg); } }
  @keyframes pulse { 0% { transform: scale(0.65); opacity: 0.8; } 100% { transform: scale(1.35); opacity: 0; } }
  @keyframes pulseBar { 0% { transform: scaleY(0.3); opacity: 0.6; } 100% { transform: scaleY(1); opacity: 1; } }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes orbit { 0% { transform: rotate(0deg) translateX(40px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); } }
`;

const AnimatedElement = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 1200 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        clearTimeout(fallback); 
        setTimeout(() => setIsVisible(true), delay); 
        observer.unobserve(el); 
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}>
      {children}
    </div>
  );
};

const HERO_IMAGE = "https://media.base44.com/images/public/6a0339c8274ca04b146adf9a/b58e90b83_generated_2221f373.png";

function HeroSection() {
  const diagnostics = [
    { label: "Life potential", value: "Habitable window", color: "text-primary" },
    { label: "Star health", value: "Pulsing corona", color: "text-accent" },
    { label: "Atom stability", value: "Hydrogen stable", color: "text-primary" },
    { label: "Cosmic age", value: "13.8B year track", color: "text-foreground" },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-background pt-24 pb-16">
      {/* Cinematic ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grain texture overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
      
      {/* Floating particles mimicking cosmic dust */}
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-primary rounded-full blur-[1px]" style={{ animation: "floatA 8s ease-in-out infinite" }} />
      <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-accent rounded-full blur-[1px]" style={{ animation: "floatB 6s ease-in-out 2s infinite" }} />
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary/60 rounded-full blur-[2px]" style={{ animation: "floatC 9s ease-in-out 4s infinite" }} />
      <div className="absolute top-1/3 left-[40%] w-1.5 h-1.5 bg-accent/60 rounded-full blur-[1px]" style={{ animation: "floatA 11s ease-in-out 1s infinite" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_450px] gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <Badge className="bg-primary/10 text-primary border border-primary/20 mb-8 px-4 py-1.5 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
                <span className="mr-2">✦</span> Cinematic Physics Sandbox
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] text-foreground mb-8 drop-shadow-sm"
            >
              What if you could{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'gradient-x 8s linear infinite' }}>
                control reality
              </span>{" "}
              itself?
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }} className="text-muted-foreground text-xl font-medium leading-relaxed mb-4 max-w-2xl">
              FineTune Physics lets you rewrite three fundamental constants — gravity <strong className="text-primary font-bold">G</strong>, the speed of light <strong className="text-primary font-bold">c</strong>, and Planck's reduced constant <strong className="text-primary font-bold">ℏ</strong> — then watch atoms, stars, planets, and cosmic history respond in real time.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }} className="text-muted-foreground/80 text-base leading-relaxed mb-10 max-w-2xl">
              This is not a textbook or lecture. It is an immersive experiment where a single slider can bloom into stable complexity, ignite a star, tear atoms apart, or collapse everything into nothing.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="flex flex-wrap gap-4 mb-14 w-full">
              <a
                href="https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:scale-[1.03] active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]" style={{ animation: 'shimmer 2.5s infinite linear' }} />
                <span className="relative">Experience it for yourself</span>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-secondary/30 border border-border/50 text-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-secondary/60 hover:border-border hover:scale-[1.03] active:scale-95 backdrop-blur-sm"
              >
                How it works
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl">
              {[
                { dt: "G", dd: "Gravity strength" },
                { dt: "c", dd: "Light speed limit" },
                { dt: "ℏ", dd: "Quantum scale" },
              ].map((item, i) => (
                <div key={item.dt} className="group bg-secondary/20 border border-border/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:bg-secondary/40 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.2)] flex flex-col items-center sm:items-start text-center sm:text-left backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <dt className="relative text-3xl sm:text-4xl font-extrabold text-foreground group-hover:text-primary transition-colors mb-1.5">{item.dt}</dt>
                  <dd className="relative text-[11px] sm:text-xs font-semibold text-muted-foreground tracking-wide uppercase">{item.dd}</dd>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Diagnostics Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
            className="relative lg:ml-auto w-full"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 rounded-[2.5rem] blur-2xl scale-105" />
            
            <div className="relative bg-[#090b14]/80 border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col group">
              {/* Header */}
              <div className="p-5 border-b border-border/40 flex items-center gap-3 bg-secondary/30">
                <span className="w-2 h-2 bg-destructive rounded-full shadow-[0_0_10px_hsl(var(--destructive))] relative">
                  <span className="absolute inset-0 bg-destructive rounded-full animate-ping opacity-75" />
                </span>
                <span className="text-xs tracking-widest uppercase text-muted-foreground font-bold">Live Universe Diagnostics</span>
              </div>
              
              {/* Solar System Visualization */}
              <div className="relative px-4 py-6 flex justify-center items-center bg-gradient-to-b from-background/40 to-[#090b14] min-h-[300px] overflow-hidden transition-colors duration-700">
                <SolarSystem />
              </div>

              {/* Stats */}
              <div className="p-6 pt-2 space-y-1">
                {diagnostics.map((d, idx) => (
                  <div key={d.label} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 relative overflow-hidden">
                    {/* Hover highlight line */}
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-primary/50 to-transparent transition-all duration-300 group-hover:w-full" style={{ transitionDelay: `${idx * 100}ms` }} />
                    <span className="text-sm font-medium text-muted-foreground">{d.label}</span>
                    <strong className={`text-sm font-bold ${d.color} drop-shadow-sm`}>{d.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const scales = [
    { icon: Atom, title: "Atomic scale", desc: "Watch hydrogen orbitals tighten, bloat, dissolve into quantum fog, or collapse into the nucleus as the Bohr-radius balance changes.", color: "from-primary/20 via-primary/5 to-transparent" },
    { icon: Sun, title: "Stellar scale", desc: "See live stars flare, cool, shift color, fail to ignite, burn out too quickly, or cross into black-hole conditions with an accretion disk.", color: "from-accent/20 via-accent/5 to-transparent" },
    { icon: Globe, title: "Cosmic scale", desc: "Track orbital speeds, period ratios, Schwarzschild radii, cosmic eras, and whether planets hold together or drift into the void.", color: "from-primary/15 via-transparent to-transparent" },
  ];

  return (
    <section id="how-it-works" className="relative py-32 bg-secondary/20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="bg-background border border-border mb-6 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-muted-foreground shadow-sm">
              <span className="text-primary mr-2">✦</span> The Premise
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight">
              Three numbers.{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'gradient-x 10s linear infinite' }}>
                Everything else follows.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              At the heart of physical reality are constants tuned with astonishing precision. Change them, and the familiar rules that make atoms stable, stars long-lived, chemistry possible, and life imaginable start to break. FineTune Physics makes that fine-tuning visible, playable, and visceral.
            </p>
          </div>
        </AnimatedElement>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {scales.map((scale, i) => (
            <AnimatedElement key={scale.title} delay={i * 150} className="h-full">
              <div className="group relative bg-card border border-border/50 rounded-[2rem] p-8 lg:p-10 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.2)] hover:border-primary/40 overflow-hidden backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${scale.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary/50 transition-all duration-500 shadow-sm">
                    <scale.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">{scale.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">{scale.desc}</p>
                  <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out group-hover:w-full" />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyItsDifferentSection() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-destructive/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <AnimatedElement>
            <Badge className="bg-secondary/50 border border-border mb-6 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
              <span className="text-primary mr-2">✦</span> Why It Feels Different
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-8 leading-[1.1] tracking-tight">
              From abstract physics to{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'gradient-x 8s linear infinite' }}>
                immediate consequence.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-10">
              Instead of reading that stronger gravity can shorten stellar lifetimes, you see the star brighten, the lifetime bar collapse, the heartbeat monitor panic, and a consequence alert tell you exactly what your universe has lost.
            </p>
            <ul className="space-y-6">
              {[
                "Real-time canvas visuals across atomic, stellar, and cosmic scales.",
                "Plain-language stories explain what your universe contains — or why it contains nothing.",
                "Beginner and Expert modes let visitors choose between guided intuition and equations.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mt-0.5 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <Check className="w-3.5 h-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </span>
                  <span className="text-foreground text-base font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedElement>

          <AnimatedElement delay={200} className="lg:ml-auto w-full">
            <div className="relative max-w-lg mx-auto lg:mx-0 lg:ml-auto group">
              {/* Pulse glow matching the chart animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-transparent rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 scale-105" />
              
              <div className="relative bg-[#110c0e]/90 border border-destructive/30 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-destructive/50 hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2.5 h-2.5 bg-destructive rounded-full shadow-[0_0_10px_hsl(var(--destructive))] relative">
                     <span className="absolute inset-0 bg-destructive rounded-full animate-ping opacity-75" />
                  </span>
                  <span className="text-destructive font-bold text-xs tracking-widest uppercase">Consequence Alert</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight drop-shadow-sm group-hover:text-destructive-foreground transition-colors duration-300">No atoms can exist.</h3>
                
                <p className="text-muted-foreground font-medium leading-relaxed mb-12 text-sm sm:text-base">
                  Matter has imploded. Electrons cannot remain bound in stable orbitals. There is no chemistry, no stars as we know them, no planets, and no life.
                </p>
                
                {/* Simulated flatlining waveform matching screenshot */}
                <div className="flex items-end gap-1.5 sm:gap-2 h-20 opacity-90 border-b border-destructive/20 pb-1">
                  {[100, 85, 100, 95, 20, 15, 25, 10, 5, 15, 8, 5, 8, 4, 2].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm origin-bottom ${i < 4 ? 'bg-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.5)]' : 'bg-destructive/20'}`}
                      style={{ 
                        height: `${h}%`, 
                        animation: i < 4 ? `pulseBar 1s ease-in-out ${i * 0.15}s infinite alternate` : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function CosmicLabSection({ features }) {
  const staticFallback = [
    { icon: "Zap", title: "Big Bang Intro", description: "Particle burst, shockwaves, and a dramatic launch sequence that immerses you.", category: "experience" },
    { icon: "Heart", title: "Vitals Monitor", description: "Life, stars, atoms, and age tracked like a living patient in real time.", category: "experience" },
    { icon: "Radio", title: "Event Feed", description: "Neutron stars, quark-gluon plasma, proton decay, and rare popups narrate.", category: "experience" },
    { icon: "Trophy", title: "Challenges", description: "Tiered objectives reward precision and teach stability thresholds.", category: "gameplay" },
    { icon: "BarChart2", title: "Graphs", description: "Relationship charts show how properties scale as constants move.", category: "science" },
    { icon: "Dna", title: "Universe DNA", description: "A visual signature encodes how far your cosmos drifts from ours.", category: "science" },
    { icon: "Skull", title: "Catastrophes", description: "Full-screen collapse, hypernova, and vacuum-decay scenarios.", category: "experience" },
    { icon: "Share2", title: "Share Links", description: "Save snapshots and send exact universe configurations to anyone.", category: "social" },
  ];
  const items = features && features.length > 0 ? features : staticFallback;

  return (
    <section className="relative py-32 bg-secondary/20 overflow-hidden border-y border-border/30">
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="max-w-2xl mb-16">
            <Badge className="bg-background border border-border mb-6 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-muted-foreground shadow-sm">
              <span className="text-primary mr-2">✦</span> Explore, Break, Restore
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight">
              A complete{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                cosmic laboratory
              </span>
            </h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              The app combines sandbox controls, cinematic feedback, challenges, shareable universes, and narrative explanations so curiosity turns into understanding.
            </p>
          </div>
        </AnimatedElement>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => {
            const IconComp = iconMap[item.icon] || Zap;
            return (
              <AnimatedElement key={item.title || index} delay={index * 100} className="h-full">
                <div className="group bg-card border border-border/50 rounded-3xl p-6 sm:p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.15)] hover:border-primary/40 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <IconComp className="w-5 h-5 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <h4 className="font-extrabold text-foreground mb-3 text-lg tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed flex-1">{item.description}</p>
                  </div>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 bg-background overflow-hidden flex items-center justify-center">
      {/* Background elements for deep cosmic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-primary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <AnimatedElement>
          <div className="bg-secondary/20 border border-border/40 rounded-[3rem] p-10 sm:p-20 text-center backdrop-blur-xl relative overflow-hidden group shadow-2xl">
            {/* Interactive inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <Badge className="bg-background border border-border mb-8 px-5 py-2 text-xs font-bold tracking-widest uppercase text-muted-foreground shadow-sm">
                <span className="text-primary mr-2">✦</span> For Curious Minds, Classes, and Explorers
              </Badge>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-8 leading-[1.1] tracking-tight">
                Show the fine-tuning of reality{" "}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'gradient-x 8s linear infinite' }}>
                  instead of merely describing it.
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-12">
                FineTune Physics is built for students, educators, science communicators, gamers, and anyone who has looked up at the night sky and wondered: what if?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
                <a
                  href="https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-10 py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]" style={{ animation: 'shimmer 2.5s infinite linear' }} />
                  <span className="relative">Add to Chrome — It's Free</span>
                </a>
                <Link
                  to="/Features"
                  className="inline-flex items-center justify-center gap-2 bg-background/50 border border-border/50 text-foreground font-bold px-10 py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:bg-secondary hover:border-border hover:scale-[1.03] active:scale-95 w-full sm:w-auto backdrop-blur-sm"
                >
                  Dive into the features
                </Link>
              </div>

              {/* Social proof / Info row */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-muted-foreground font-semibold text-sm">
                <div className="flex items-center gap-3 bg-background/50 pl-2 pr-4 py-2 rounded-full border border-border/30 backdrop-blur-sm">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center relative z-30 shadow-sm"><Atom className="w-4 h-4 text-primary" /></div>
                    <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center relative z-20 shadow-sm"><Sun className="w-4 h-4 text-accent" /></div>
                    <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center relative z-10 shadow-sm"><Globe className="w-4 h-4 text-primary" /></div>
                  </div>
                  <span className="tracking-wide">Explore 3 cosmic scales</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 px-4 py-2.5 rounded-full border border-border/30 backdrop-blur-sm">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary drop-shadow-[0_0_5px_hsl(var(--primary)/0.5)]" />)}
                  </div>
                  <span className="tracking-wide ml-1">Chrome Web Store</span>
                </div>
                <div className="flex items-center gap-3 bg-background/50 px-4 py-2.5 rounded-full border border-border/30 backdrop-blur-sm">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full relative shadow-[0_0_10px_hsl(var(--primary))]">
                     <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                  </span>
                  <span className="tracking-wide">100% Free</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default function Home() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    base44.entities.Feature.list("-updated_date", 20)
      .then(setFeatures)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <style>{globalStyles}</style>
      <HeroSection />
      <HowItWorksSection />
      <WhyItsDifferentSection />
      <CosmicLabSection features={features} />
      <CTASection />
    </div>
  );
}