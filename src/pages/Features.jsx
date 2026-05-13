import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Heart, Radio, Trophy, BarChart2, Dna, Skull, Share2, ArrowRight, Atom, Star, Telescope, Waves } from "lucide-react";

const iconMap = { Zap, Heart, Radio, Trophy, BarChart2, Dna, Skull, Share2, Star };

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

export default function Features() {
  const [features, setFeatures] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const features = [
  {
    title: "Universe Simulation",
    description: "Simulate alternate universes with adjustable constants."
  },
  {
    title: "Physics Sandbox",
    description: "Experiment with gravity, light speed, and more."
  }
];

  const staticFallback = [
    { icon: "Zap", title: "Big Bang Intro", description: "Particle burst, shockwaves, and a dramatic launch sequence that immerses you from the first moment.", category: "experience" },
    { icon: "Heart", title: "Vitals Monitor", description: "Life, stars, atoms, and age tracked like a living patient — watch your universe's health in real time.", category: "experience" },
    { icon: "Radio", title: "Event Feed", description: "Neutron stars, quark-gluon plasma, proton decay, and rare popups narrate your universe's story.", category: "experience" },
    { icon: "Trophy", title: "Challenges", description: "Tiered objectives reward precision and teach stability thresholds through engaging gameplay.", category: "gameplay" },
    { icon: "BarChart2", title: "Graphs", description: "Relationship charts show how properties scale as constants move.", category: "science" },
    { icon: "Dna", title: "Universe DNA", description: "A visual signature encodes how far your cosmos drifts from ours.", category: "science" },
    { icon: "Skull", title: "Catastrophes", description: "Full-screen collapse, hypernova, and vacuum-decay scenarios.", category: "experience" },
    { icon: "Share2", title: "Share Links", description: "Save snapshots and send exact universe configurations to anyone.", category: "social" },
  ];
  const allItems = features.length > 0 ? features : staticFallback;
  const tabs = ["all", "experience", "science", "gameplay", "social"];
  const filtered = activeTab === "all" ? allItems : allItems.filter(i => i.category === activeTab);

  const constants = [
    { symbol: "G", name: "Gravitational Constant", desc: "Controls the strength of gravity. Too high: stars burn in seconds, planets spiral inward. Too low: matter never clumps, no stars ever form.", range: "10⁻¹⁵ — 10⁵×G₀", icon: Telescope },
    { symbol: "c", name: "Speed of Light", desc: "The cosmic speed limit. Alter it and you change how much energy matter contains (E=mc²), how space and time relate, and whether atomic physics holds.", range: "0.001c — 1000c", icon: Waves },
    { symbol: "ℏ", name: "Planck's Constant", desc: "Controls the quantum scale. Larger ℏ means atoms become enormous and the quantum world bleeds into everyday reality. Smaller and the universe turns fully classical.", range: "10⁻⁴⁰ — 10⁻²⁸ J·s", icon: Atom },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background pt-20">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/60 rounded-full pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-accent/60 rounded-full pointer-events-none" style={{ animation: "floatB 6s ease-in-out 2s infinite" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Badge className="bg-primary/15 text-primary border border-primary/30 mb-6 px-4 py-1.5 text-xs tracking-widest uppercase">
              ✦ Full Feature Set
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight mb-6">
              Every tool to{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                reshape the cosmos
              </span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              FineTune Physics isn’t just a simulator — it’s an immersive cosmic laboratory. Here’s everything that makes it unlike anything else.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] hover:scale-[1.04]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              <span className="relative">Add to Chrome — Free</span>
              <ArrowRight className="relative w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Constants deep-dive */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="bg-primary/15 text-primary border border-primary/30 mb-5 px-4 py-1.5 text-xs tracking-widest uppercase">
                ✦ The Three Constants
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                The{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  knobs of reality
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">Each constant unlocks a different dimension of cosmic behavior. Adjust all three and watch the universe transform.</p>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-6">
            {constants.map((c, i) => {
              const Icon = c.icon;
              return (
                <AnimatedElement key={c.symbol} delay={i * 120}>
                  <div className="group relative bg-card border border-border/60 rounded-3xl p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] hover:border-primary/40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{c.symbol}</div>
                        <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-bold text-foreground text-lg mb-3">{c.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{c.desc}</p>
                      <div className="bg-muted/50 rounded-xl px-4 py-2.5 border border-border/40">
                        <span className="text-xs text-muted-foreground">Exploration range: </span>
                        <span className="text-xs text-primary font-mono">{c.range}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features grid with tabs */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-primary/15 text-primary border border-primary/30 mb-5 px-4 py-1.5 text-xs tracking-widest uppercase">
                ✦ Everything Inside
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                Built for{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">wonder</span>
              </h2>
            </div>
          </AnimatedElement>

          {/* Tab filter */}
          <AnimatedElement delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </AnimatedElement>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item, index) => {
              const IconComp = iconMap[item.icon] || Zap;
              return (
                <AnimatedElement key={item.title || index} delay={index * 80}>
                  <div className="group bg-card border border-border/60 rounded-2xl p-6 h-full transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.25)] hover:border-primary/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors duration-300">
                        <IconComp className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2 text-sm">{item.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <AnimatedElement>
            <Badge className="bg-primary/15 text-primary border border-primary/30 mb-6 px-4 py-1.5 text-xs tracking-widest uppercase">
              ✦ Ready to Explore?
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your universe is{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                waiting to be broken
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Install FineTune Physics for free and start bending the fundamental laws of nature in seconds.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold px-12 py-5 rounded-full text-xl transition-all duration-300 hover:shadow-[0_0_70px_hsl(var(--primary)/0.6)] hover:scale-[1.05] hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              <span className="relative">Install Free on Chrome</span>
              <ArrowRight className="relative w-6 h-6" />
            </a>
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span>Free forever · No account required · Instant access</span>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}