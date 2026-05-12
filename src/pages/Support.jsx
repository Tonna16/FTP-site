import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, MessageCircle, BookOpen, ChevronDown, Check, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

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

const faqs = [
  { q: "What is FineTune Physics?", a: "FineTune Physics is a Chrome extension that lets you interactively adjust the fundamental constants of the universe — gravity (G), the speed of light (c), and Planck's reduced constant (ℏ) — and watch atoms, stars, and cosmic history respond in real time." },
  { q: "Is it really free?", a: "Yes — completely free to install from the Chrome Web Store. No account, no subscription, no hidden costs. Just install and start bending reality." },
  { q: "What browsers are supported?", a: "FineTune Physics is available as a Chrome extension. It works on any Chromium-based browser including Chrome, Brave, Edge, and Opera." },
  { q: "How do I switch between Beginner and Expert mode?", a: "Inside the extension, there's a mode toggle in the top bar. Beginner mode shows plain-language explanations and guided prompts. Expert mode reveals the underlying equations and precise numeric readouts." },
  { q: "Can I share my universe configuration with others?", a: "Absolutely. The Share Links feature generates a unique URL encoding your exact constant values. Anyone with the link can open the same universe configuration instantly." },
  { q: "Why does my universe collapse when I increase G?", a: "Higher gravitational constant makes stellar processes run much faster — stars burn their fuel in fractions of the normal time, collapse to black holes, and the gravitational pressure on atoms becomes unsustainable. The consequence alert will tell you exactly what broke." },
  { q: "What are the Challenges?", a: "Challenges are tiered objectives that ask you to achieve specific universe states — like maintaining a habitable window for 5 billion simulated years, or creating a stable neutron star. They teach stability thresholds through direct experimentation." },
  { q: "I found a bug — how do I report it?", a: "Use the contact form on this page or reach out via the Chrome Web Store review page. Please include your browser version and a description of what happened." },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await base44.entities.ContactMessage.create({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-background pt-20">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/60 rounded-full pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-accent/60 rounded-full pointer-events-none" style={{ animation: "floatB 6s ease-in-out 2s infinite" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <Badge className="bg-primary/15 text-primary border border-primary/30 mb-6 px-4 py-1.5 text-xs tracking-widest uppercase">
              ✦ Support Center
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight mb-6">
              We're here to{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                help you explore
              </span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Questions about the app, bug reports, or just want to share your wildest universe — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support options */}
      <section className="relative py-16 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "FAQ", desc: "Browse common questions about features, constants, and how the simulation works.", action: "Jump to FAQ", scrollId: "faq" },
              { icon: Mail, title: "Email Support", desc: "Send us a message using the contact form below. We respond within 24 hours.", action: "Contact us", scrollId: "contact" },
              { icon: MessageCircle, title: "Chrome Reviews", desc: "Leave feedback directly on the Chrome Web Store — we read every review.", action: "Leave a review", href: "https://chromewebstore.google.com/detail/universe-simulator/mcjlmpehbgnknjhjlgdhfpbeppafchka" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedElement key={item.title} delay={i * 100}>
                  <div className="group bg-card border border-border/60 rounded-3xl p-8 h-full transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.25)] hover:border-primary/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.desc}</p>
                      {item.scrollId ? (
                        <button
                          onClick={() => scrollTo(item.scrollId)}
                          className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all duration-200"
                        >
                          {item.action} <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all duration-200">
                          {item.action} <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 bg-background overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center mb-16">
              <Badge className="bg-primary/15 text-primary border border-primary/30 mb-5 px-4 py-1.5 text-xs tracking-widest uppercase">
                ✦ Frequently Asked
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                Common{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">questions</span>
              </h2>
            </div>
          </AnimatedElement>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedElement key={i} delay={i * 50}>
                <div
                  className={`bg-card border rounded-2xl transition-all duration-300 overflow-hidden ${openFaq === i ? "border-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.15)]" : "border-border/60 hover:border-primary/30"}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="relative py-24 bg-secondary overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/12 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center mb-12">
              <Badge className="bg-primary/15 text-primary border border-primary/30 mb-5 px-4 py-1.5 text-xs tracking-widest uppercase">
                ✦ Get In Touch
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Send us a{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">message</span>
              </h2>
            </div>

            {submitted ? (
              <div className="bg-card border border-primary/40 rounded-3xl p-12 text-center shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Message sent!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours. Thanks for reaching out.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border/60 rounded-3xl p-8 shadow-2xl space-y-5">
                <div>
                  <Label htmlFor="name" className="text-foreground text-sm font-medium mb-2 block">Your name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Marie Curie"
                    className="bg-muted border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/60 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground text-sm font-medium mb-2 block">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="bg-muted border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/60 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground text-sm font-medium mb-2 block">Message</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className="bg-muted border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/60 rounded-xl resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="relative overflow-hidden w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-2xl text-base transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                  {sending ? (
                    <><Loader2 className="relative w-4 h-4 animate-spin" /><span className="relative">Sending…</span></>
                  ) : (
                    <><span className="relative">Send message</span><ArrowRight className="relative w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}