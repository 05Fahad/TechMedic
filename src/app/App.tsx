import { useState } from "react";
import { Monitor, Camera, Cpu, Phone, Mail, ChevronRight, Menu, X, Check, ArrowRight, Shield, Clock, Award, Wrench, Wifi, TerminalSquare, Armchair } from "lucide-react";
import techMedicLogo from "../imports/TechMedic.png";



const NAV_LINKS = ["Services", "Why Us", "How It Works", "Contact"];

const SERVICES = [
  {
    id: "01",
    icon: Monitor,
    title: "Home Tech Installations",
    desc: "We handle all your home tech needs — from mounting your TV to setting up security cameras and smart home devices. Clean installs, no mess, done right.",
    includes: ["TV Mounting — $80 per TV", "Camera Installation", "Smart Home Setup", "Office & Workstation Setup"],
    price: "Get a Quote",
    img: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600&h=400&fit=crop&auto=format",
    imgAlt: "Flat screen TV mounted on wall",
  },
  {
    id: "02",
    icon: Cpu,
    title: "PC Builds",
    desc: "Tell us your budget and what you need — gaming, editing, or everyday use. We source the parts, build it, and hand it over ready to go.",
    includes: ["Custom gaming & workstation builds", "Budget-optimized part selection", "Full setup & Windows install"],
    price: "Starting at $200",
    img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=400&fit=crop&auto=format",
    imgAlt: "Custom built gaming PC with RGB lighting",
  },
  {
    id: "03",
    icon: TerminalSquare,
    title: "PC & Laptop Repair",
    desc: "Slow, crashing, or full of viruses? We diagnose the issue, tell you exactly what's wrong and what it'll cost to fix — then you decide.",
    includes: ["$50 diagnostic fee", "Virus & malware removal", "Software troubleshooting & recovery"],
    price: "$50 Diagnostic",
    img: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=600&h=400&fit=crop&auto=format",
    imgAlt: "Laptop open for repair and diagnosis",
  },
];

const WHY_US = [
  { icon: Shield, label: "We Stand Behind It", desc: "If something isn't right, we come back and fix it. No runaround, no excuses." },
  { icon: Clock, label: "Fast Turnaround", desc: "We work around your schedule and get it done quickly — usually within the same week." },
  { icon: Award, label: "Our Reputation Matters", desc: "This is our business and our name on the line. Every job gets our full attention." },
  { icon: Wrench, label: "Clean Work, Always", desc: "We treat your home like our own — cables hidden, walls clean, zero mess left behind." },
];

const STEPS = [
  { n: "01", title: "Reach Out", desc: "Text, call, or fill out the form. You'll hear back from us directly — not a call center." },
  { n: "02", title: "Free Estimate", desc: "We'll give you a straight, honest price before any work starts. No surprises." },
  { n: "03", title: "We Show Up", desc: "We arrive on time, work clean, and don't leave until the job is done right." },
  { n: "04", title: "You're All Set", desc: "We walk you through everything, make sure you're happy, and that's it." },
];


// Replace YOUR_FORM_ID below with the ID from formspree.io after signing up
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgyzvzn";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _replyto: formData.email,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        setFormError("Something went wrong. Please text or email us directly.");
      }
    } catch {
      setFormError("Something went wrong. Please text or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Left: nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Center: logo */}
          <a href="#" className="absolute left-1/2 -translate-x-1/2">
            <img src={techMedicLogo} alt="TechMedic logo" className="h-16 w-auto" style={{ mixBlendMode: "screen" }} />
          </a>

          {/* Right: CTA + mobile menu */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Get a Quote <ArrowRight size={14} />
            </a>
            <button
              className="md:hidden text-foreground p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded w-fit"
            >
              Get a Quote <ArrowRight size={14} />
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Dark background with subtle blue grid */}
        <div className="absolute inset-0 bg-background">
          {/* Blue radial glow top-right */}
          <div
            className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
          />
          {/* Blue radial glow bottom-left */}
          <div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #1D4ED8 0%, transparent 70%)" }}
          />
          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/30 bg-primary/10 px-3 py-1 rounded-full mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Now Booking — Same-Week Slots Available
              </div>

              <h1
                className="text-5xl md:text-7xl font-black leading-none uppercase text-foreground mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Your Tech,
                <br />
                <span className="text-primary">Fixed Fast.</span>
                <br />
                Installed Right.
              </h1>

              <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
                Two guys who know their stuff. We handle TV mounting, camera installation, and custom PC builds — and we take pride in every single job we do.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-blue-600 transition-colors"
                >
                  Book a Service <ArrowRight size={16} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded hover:border-primary/60 hover:text-primary transition-colors"
                >
                  View Services <ChevronRight size={16} />
                </a>
              </div>

            </div>

            {/* Right: PC + TV stacked images with blue glow frames */}
            <div className="hidden lg:grid grid-cols-2 gap-4 items-end">
              {/* PC image — taller, left column */}
              <div className="relative flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden border border-primary/25 shadow-[0_0_40px_rgba(37,99,235,0.25)]">
                  <img
                    src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=560&fit=crop&auto=format"
                    alt="Custom built gaming PC with RGB lighting"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div
                      className="inline-flex items-center gap-1.5 bg-background/80 backdrop-blur border border-primary/30 rounded px-2 py-1 text-xs font-medium text-primary"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <Cpu size={10} /> PC Building
                    </div>
                  </div>
                </div>

                {/* Workstation setup image */}
                <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
                  <img
                    src="https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=500&h=320&fit=crop&auto=format"
                    alt="Professional workstation office desk setup"
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div
                      className="inline-flex items-center gap-1.5 bg-background/80 backdrop-blur border border-primary/30 rounded px-2 py-1 text-xs font-medium text-primary"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <Armchair size={10} /> Workstation Setup
                    </div>
                  </div>
                </div>
              </div>

              {/* TV image — right column, offset up */}
              <div className="relative mt-8">
                <div className="relative rounded-xl overflow-hidden border border-primary/25 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                  <img
                    src="https://images.unsplash.com/photo-1612965607446-25e1332775ae?w=500&h=560&fit=crop&auto=format"
                    alt="Flat screen TV wall mounted"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div
                      className="inline-flex items-center gap-1.5 bg-background/80 backdrop-blur border border-primary/30 rounded px-2 py-1 text-xs font-medium text-primary"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <Monitor size={10} /> TV Mounting
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div
            className="text-xs font-medium text-primary mb-3 tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            What We Do
          </div>
          <h2
            className="text-4xl md:text-6xl font-black uppercase text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_32px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <img
                  src={s.img}
                  alt={s.imgAlt}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <s.icon size={18} className="text-primary" />
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-foreground leading-tight"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {s.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>

                {/* Includes */}
                <ul className="flex flex-col gap-2.5 mb-6">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <Check size={13} className="text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-border">
                  <span
                    className="text-primary font-black text-lg"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {s.price}
                  </span>
                  <a
                    href="#contact"
                    className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="bg-card border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div
              className="text-xs font-medium text-primary mb-3 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Why Choose Us
            </div>
            <h2
              className="text-4xl md:text-6xl font-black uppercase text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Just the Two of Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div
                key={item.label}
                className="p-6 border border-border rounded-xl hover:border-primary/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-primary" />
                </div>
                <h4
                  className="text-lg font-black uppercase text-foreground mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {item.label}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div
            className="text-xs font-medium text-primary mb-3 tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            The Process
          </div>
          <h2
            className="text-4xl md:text-6xl font-black uppercase text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="absolute hidden lg:block top-7 left-[12.5%] right-[12.5%] h-px bg-primary/20 z-0" />
          {STEPS.map((step) => (
            <div key={step.n} className="relative flex flex-col gap-4 z-10">
              <div
                className="w-14 h-14 rounded-full bg-primary border border-primary/50 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {step.n}
              </div>
              <h4
                className="text-lg font-black uppercase text-foreground"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {step.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div
              className="text-xs font-medium text-primary mb-3 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Get In Touch
            </div>
            <h2
              className="text-4xl md:text-6xl font-black uppercase text-foreground mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ready to Book?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              You'll hear back from one of us directly — no middleman. We'll sort out the details and give you a free estimate before anything starts.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Text Preferred</div>
                  <a
                    href="tel:+18504968101"
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    (850) 496-8101
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Email</div>
                  <a
                    href="mailto:techm3dic@gmail.com"
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    techm3dic@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                We prefer a text or email — it's the fastest way to reach us and we'll get back to you as soon as we can.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-[0_0_40px_rgba(37,99,235,0.08)]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Check size={24} className="text-primary" />
                </div>
                <h3
                  className="text-2xl font-black uppercase text-foreground"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Request Sent!
                </h3>
                <p className="text-muted-foreground text-sm">
                  We'll reach out within a few hours to confirm your booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Service Needed</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="home-tech">Home Tech Installations</option>
                    <option value="pc-build">PC Builds — starting at $200</option>
                    <option value="pc-repair">PC & Laptop Repair — $50 diagnostic</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your project..."
                    className="bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                {formError && (
                  <p className="text-sm text-red-400 text-center">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : <> Send Request <ArrowRight size={16} /> </>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={techMedicLogo} alt="TechMedic logo" className="h-14 w-auto" style={{ mixBlendMode: "screen" }} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} TechMedic. Crestview, FL.
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Home Tech Installations · PC Builds · PC & Laptop Repair
            </p>
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 3).map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
