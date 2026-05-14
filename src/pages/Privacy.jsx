import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Trash2, Mail } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "What We Collect",
    content: [
      "FineTune Physics is a browser extension. The extension itself runs entirely locally in your browser and does not collect or transmit personal data. Saved universe presets and settings may be stored locally in your browser so they persist between sessions, and this data never leaves your device.",
      "This website does not use tracking cookies, third-party analytics, or advertising scripts.",
      "If you submit a message through our Support contact form, we store your name, email address, and message content solely to respond to your inquiry.",
      "This site is hosted on external platforms (such as GitHub Pages), which may collect limited technical data like IP address or browser type according to their own privacy policies.",
    ],
  },
  {
    icon: Lock,
    title: "How We Use Your Data",
    content: [
      "Contact form submissions are used exclusively to respond to your support inquiry. We do not use your email address for marketing or share it with any third party.",
      "We do not sell, rent, or trade your personal information to anyone, ever.",
      "No user profiling, behavioral tracking, or advertising takes place on this website or within the extension.",
    ],
  },
  {
    icon: Shield,
    title: "Data Storage & Security",
    content: [
      "Contact form messages are stored securely in our application database. Access is restricted to the app administrators only.",
      "We take reasonable technical measures to protect stored data against unauthorized access, alteration, or disclosure.",
      "Local universe presets and settings are stored only in your browser’s local storage. We cannot access or retrieve this data.",
      "We do not store payment information. The extension is free and no purchases are made through this website.",
    ],
  },
  {
    icon: Trash2,
    title: "Data Retention & Deletion",
    content: [
      "Support messages are retained only as long as necessary to resolve your inquiry, after which they may be deleted.",
      "You may request deletion of any personal data you have submitted to us by contacting us via the Support page or at ttonnaagburu@gmail.com.",
      "Because the extension does not collect personal data, there is nothing else to request, correct, or delete beyond support messages you voluntarily submit.",
      "We will honor deletion requests within 30 days.",
    ],
  },
  {
    icon: Mail,
    title: "Contact & Questions",
    content: [
      "If you have any questions about this Privacy Policy or how your data is handled, please use the contact form on our Support page or email us at ttonnaagburu@gmail.com.",
      "We are committed to transparency. If anything in this policy is unclear, we are happy to explain it.",
      "This policy may be updated from time to time. Material changes will be reflected with an updated effective date below.",
    ],
  },
];

export default function Privacy() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-background pt-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <Badge className="bg-primary/15 text-primary border border-primary/30 mb-6 px-4 py-1.5 text-xs tracking-widest uppercase">✦ Privacy Policy</Badge>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground leading-[1.05] mb-6">
              Your privacy,{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                fully respected.
              </span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-4">
              FineTune Physics collects almost nothing. Here's exactly what we do — and don't — do with your data.
            </p>
            <p className="text-muted-foreground/60 text-sm">Effective date: May 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary/8 border-y border-primary/15 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-bold text-base mb-1">The short version</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The extension does not collect or transmit personal data. Local presets and settings may be stored only in your browser and never leave your device. The website only stores data you voluntarily submit through the contact form, used solely to reply to you. No tracking. No ads. No selling your data. Full stop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group bg-card border border-border/60 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-black text-foreground mb-5 tracking-tight">{s.title}</h2>
                    <ul className="space-y-3">
                      {s.content.map((line, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <p className="text-muted-foreground text-sm leading-relaxed">{line}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
