"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BedDouble,
  BellRing,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Clock3,
  CreditCard,
  Headset,
  LayoutDashboard,
  LucideIcon,
  Menu,
  MessageCircle,
  MessageSquare,
  Network,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Utensils,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type CounterItem = {
  label: string;
  value: number;
  suffix: string;
};

type ProblemItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  preview: number[];
};

type PlanItem = {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
};

const navLinks = [
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "benefits", label: "Benefits" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const counters: CounterItem[] = [
  { label: "Beds Managed", value: 10000, suffix: "+" },
  { label: "PG Owners", value: 500, suffix: "+" },
  { label: "Rent Collection Success", value: 98, suffix: "%" },
  { label: "Customer Support", value: 24, suffix: "/7" },
];

const problems: ProblemItem[] = [
  {
    title: "Manual rent tracking",
    description: "Due dates, pending rent, and payment confirmations get missed.",
    icon: Wallet,
  },
  {
    title: "Electricity calculation errors",
    description: "Per-room usage and bill splitting create frequent mistakes.",
    icon: Zap,
  },
  {
    title: "Managing multiple PG branches",
    description: "No single view to compare occupancy, revenue, and expenses.",
    icon: Network,
  },
  {
    title: "Food wastage confusion",
    description: "Mess demand is not tracked daily, causing over-preparation.",
    icon: Utensils,
  },
  {
    title: "Complaint management difficulty",
    description: "Issues are raised verbally and get lost without status updates.",
    icon: MessageSquare,
  },
  {
    title: "Excel and notebook dependency",
    description: "Data is fragmented, outdated, and hard to scale with growth.",
    icon: ClipboardList,
  },
];

const solutionHighlights = [
  "Tenant management",
  "Room tracking",
  "Rent automation",
  "Electricity billing",
  "Analytics",
  "WhatsApp reminders",
];

const features: FeatureItem[] = [
  {
    title: "Tenant Management",
    description:
      "Onboard tenants in minutes with identity records, parent details, and digital agreements.",
    icon: Users,
    bullets: [
      "Add tenants and ID proofs",
      "Parent and emergency contacts",
      "Check-in and check-out history",
      "Digital agreements",
    ],
    preview: [92, 78, 64],
  },
  {
    title: "Room and Bed Management",
    description:
      "Track bed availability across floors and rooms with live occupancy status.",
    icon: BedDouble,
    bullets: [
      "Occupancy tracking",
      "Bed availability",
      "Room status",
      "Multi-floor support",
    ],
    preview: [88, 70, 55],
  },
  {
    title: "Rent Management",
    description:
      "Automate reminders, monitor payments, and generate invoices from one panel.",
    icon: CreditCard,
    bullets: [
      "Auto reminders",
      "Online payment tracking",
      "Due alerts",
      "Invoice generation",
    ],
    preview: [94, 80, 71],
  },
  {
    title: "Electricity Billing",
    description:
      "Capture meter readings and auto-calculate accurate split bills for shared rooms.",
    icon: Zap,
    bullets: [
      "Meter readings",
      "Automatic bill calculations",
      "Shared room splitting",
      "Monthly usage summary",
    ],
    preview: [90, 66, 52],
  },
  {
    title: "Complaint Management",
    description:
      "Create trackable tickets and assign staff with transparent status updates.",
    icon: MessageCircle,
    bullets: [
      "Raise tickets",
      "Staff assignment",
      "Status tracking",
      "Resolution timelines",
    ],
    preview: [86, 74, 61],
  },
  {
    title: "Food and Mess Management",
    description:
      "Plan menu operations with meal counts and wastage controls for better margins.",
    icon: Utensils,
    bullets: [
      "Daily menu planning",
      "Meal tracking",
      "Wastage control",
      "Demand forecasting",
    ],
    preview: [84, 72, 60],
  },
  {
    title: "Visitor Management",
    description:
      "Secure every entry and exit with timestamped records and tenant linkage.",
    icon: ShieldCheck,
    bullets: [
      "Entry and exit logs",
      "Visitor records",
      "Host mapping",
      "Searchable history",
    ],
    preview: [82, 68, 57],
  },
  {
    title: "Staff Management",
    description:
      "Control attendance, task assignment, and salary cycles from one workspace.",
    icon: LayoutDashboard,
    bullets: [
      "Attendance",
      "Salary tracking",
      "Task assignment",
      "Daily productivity view",
    ],
    preview: [87, 69, 58],
  },
  {
    title: "Reports and Analytics",
    description:
      "Understand occupancy, revenue, and expenses through ready-to-use insights.",
    icon: BarChart3,
    bullets: [
      "Occupancy analytics",
      "Revenue tracking",
      "Expense reports",
      "Collection trends",
    ],
    preview: [95, 82, 68],
  },
  {
    title: "Multi Branch Management",
    description:
      "Manage multiple PG locations with a centralized dashboard and branch-level analytics.",
    icon: Network,
    bullets: [
      "Multiple PGs",
      "Centralized dashboard",
      "Branch analytics",
      "Role-based access",
    ],
    preview: [91, 76, 63],
  },
  {
    title: "Notifications and Automation",
    description:
      "Keep operations proactive with WhatsApp reminders, SMS alerts, and push notifications.",
    icon: BellRing,
    bullets: [
      "WhatsApp reminders",
      "SMS alerts",
      "Push notifications",
      "Automated follow-ups",
    ],
    preview: [89, 73, 62],
  },
  {
    title: "Mobile Responsive Access",
    description:
      "Run your PG from phone, tablet, or laptop with a clean responsive interface.",
    icon: Smartphone,
    bullets: [
      "Mobile dashboard",
      "Tablet optimized",
      "Works on all devices",
      "Real-time sync",
    ],
    preview: [93, 77, 66],
  },
];

const plans: PlanItem[] = [
  {
    name: "Starter",
    price: "₹1,999/mo",
    description: "Best for single PG properties starting digital operations.",
    features: [
      "Up to 100 beds",
      "Tenant and room management",
      "Rent reminders",
      "Basic reports",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "₹4,999/mo",
    description: "Built for growing PG owners with branch and automation needs.",
    features: [
      "Up to 500 beds",
      "Electricity and mess management",
      "WhatsApp automation",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large operators needing scale, controls, and integrations.",
    features: [
      "Unlimited beds and branches",
      "Custom workflows",
      "Dedicated success manager",
      "API and integrations",
      "SLA-backed support",
    ],
  },
];

const faqs = [
  {
    question: "Is setup easy?",
    answer:
      "Yes. Most PG owners complete setup in one day with guided onboarding and data import help.",
  },
  {
    question: "Can I manage multiple branches?",
    answer:
      "Yes. PG Manager Pro provides a centralized dashboard with branch-level occupancy and revenue visibility.",
  },
  {
    question: "Does it support online payments?",
    answer:
      "Yes. You can track online collections, pending dues, and tenant-wise payment history in one place.",
  },
  {
    question: "Is WhatsApp integration available?",
    answer:
      "Yes. Automated reminders and important tenant notifications can be sent directly through WhatsApp flows.",
  },
  {
    question: "Is mobile supported?",
    answer:
      "Yes. The platform is fully responsive and optimized for mobile, tablet, and desktop usage.",
  },
];

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "PG Owner, Bengaluru",
    quote:
      "Rent follow-ups are now automated. Our collection rate jumped within two months.",
  },
  {
    name: "Neha Saini",
    role: "Hostel Manager, Pune",
    quote:
      "Complaint tracking made operations transparent. Tenants trust us more because updates are instant.",
  },
  {
    name: "Arjun Batra",
    role: "Co-living Operator, Gurgaon",
    quote:
      "Branch-wise dashboards help me decide faster. I can see occupancy and cash flow in minutes.",
  },
  {
    name: "Aman Kulkarni",
    role: "PG Operator, Hyderabad",
    quote:
      "Electricity bills are accurate now. Shared room split calculations are no longer a pain.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
} as const;

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const particles = [
  { left: "8%", top: "18%", size: 10, duration: 5.8, delay: 0.3 },
  { left: "16%", top: "42%", size: 7, duration: 5.2, delay: 0.9 },
  { left: "32%", top: "28%", size: 8, duration: 6, delay: 0.4 },
  { left: "47%", top: "8%", size: 9, duration: 6.2, delay: 1.1 },
  { left: "58%", top: "36%", size: 7, duration: 5.7, delay: 0.8 },
  { left: "72%", top: "16%", size: 10, duration: 5.5, delay: 0.2 },
  { left: "86%", top: "34%", size: 8, duration: 6.4, delay: 0.6 },
  { left: "76%", top: "62%", size: 10, duration: 5.9, delay: 1.2 },
  { left: "62%", top: "76%", size: 7, duration: 5.6, delay: 0.5 },
  { left: "42%", top: "72%", size: 8, duration: 6.1, delay: 0.1 },
  { left: "24%", top: "64%", size: 9, duration: 6.3, delay: 0.9 },
  { left: "10%", top: "78%", size: 8, duration: 5.4, delay: 1.3 },
];

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function AnimatedCounter({ value, suffix, label }: CounterItem) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frame = 0;
    let startTime = 0;

    const animate = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / 1400, 1);
      const next = Math.floor(progress * value);
      setCount(next);

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, value]);

  const formatted = value >= 1000 ? count.toLocaleString("en-IN") : String(count);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="glass-card rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="text-3xl font-semibold tracking-tight text-[#1F2D3D] md:text-4xl">
        {formatted}
        {inView ? suffix : ""}
      </div>
      <p className="mt-2 text-sm text-[#6B7A90] md:text-base">{label}</p>
    </motion.div>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-[#5FA0FF]/45"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.25, 0.7, 0.25],
            scale: [1, 1.16, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="glow-spot left-[-8rem] top-14 h-72 w-72 bg-[#5FA0FF]/35"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-spot right-[-10rem] top-42 h-80 w-80 bg-[#4F8DFD]/35"
        animate={{ x: [0, -35, 0], y: [0, 18, 0] }}
        transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-spot bottom-[-12rem] left-1/4 h-80 w-80 bg-[#3F7EF5]/20"
        animate={{ x: [0, 28, 0], y: [0, -24, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}

function Wave({ className }: { className?: string }) {
  return (
    <div className={cn("wave-separator", className)}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,53.3C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="#F3F8FF"
          fillOpacity="1"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(id);
  }, []);

  const desktopTestimonials = useMemo(
    () => [0, 1, 2].map((offset) => testimonials[(activeTestimonial + offset) % testimonials.length]),
    [activeTestimonial],
  );

  return (
    <main className="bg-white text-[#1F2D3D]">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[#D9E7FF]/70 bg-white/80 shadow-[0_16px_45px_-28px_rgba(63,126,245,0.55)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-8">
          <Link href="#" className="flex items-center gap-3 text-[#1F2D3D]">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F8DFD] to-[#5FA0FF] text-white shadow-[0_15px_30px_-15px_rgba(63,126,245,0.8)]">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">PG Manager Pro</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-[#6B7A90] lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="transition-colors duration-200 hover:text-[#3F7EF5]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#"
              className="secondary-button rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              Login
            </a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="gradient-button rounded-xl px-5 py-2.5 text-sm font-medium"
            >
              Book Demo
            </motion.a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9E7FF] bg-white/90 text-[#1F2D3D] lg:hidden"
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-[#D9E7FF]/70 bg-white/95 px-6 py-5 backdrop-blur-xl lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-medium text-[#6B7A90] transition hover:bg-[#F3F8FF] hover:text-[#3F7EF5]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href="#"
                    className="secondary-button rounded-xl px-4 py-2 text-sm font-medium"
                  >
                    Login
                  </a>
                  <a
                    href="#contact"
                    className="gradient-button rounded-xl px-4 py-2 text-sm font-medium"
                  >
                    Book Demo
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section
        ref={heroRef}
        className="hero-noise relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-[#F3F8FF] via-white to-white pt-28"
      >
        <FloatingParticles />
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ y: heroY }}
        >
          <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#4F8DFD]/20 blur-[110px]" />
          <div className="absolute -left-20 top-48 h-[20rem] w-[20rem] rounded-full bg-[#5FA0FF]/20 blur-[100px]" />
          <div className="absolute -right-24 top-56 h-[22rem] w-[22rem] rounded-full bg-[#3F7EF5]/18 blur-[110px]" />
        </motion.div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-10 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative z-10"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9E7FF] bg-white/85 px-4 py-2 text-sm text-[#3F7EF5] backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Built for modern PG owners
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-semibold tracking-tight text-[#1F2D3D] sm:text-5xl lg:text-[3.45rem] lg:leading-[1.08]"
            >
              Smart PG Management Made Simple
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-[#6B7A90] sm:text-lg"
            >
              Manage rooms, tenants, rent collection, complaints, electricity bills and operations
              from one powerful dashboard.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="gradient-button rounded-xl px-6 py-3 text-sm font-semibold sm:text-base"
              >
                Book Free Demo
              </motion.a>
              <motion.a
                href="#features"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="secondary-button inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold sm:text-base"
              >
                Explore Features
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 text-sm text-[#1F2D3D]">
              <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-[#3F7EF5]" />
                Trusted by PG Owners
              </span>
              <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2">
                <Headset className="h-4 w-4 text-[#3F7EF5]" />
                24/7 Support
              </span>
              <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2">
                <Clock3 className="h-4 w-4 text-[#3F7EF5]" />
                Easy Setup
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
              className="glass-card relative overflow-hidden rounded-[1.9rem] p-6 shadow-[0_40px_90px_-55px_rgba(63,126,245,0.75)]"
            >
              <div className="absolute inset-0 blue-grid opacity-65" />
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#6B7A90]">Overview</p>
                    <p className="mt-1 text-lg font-semibold text-[#1F2D3D]">PG Dashboard</p>
                  </div>
                  <span className="rounded-full bg-[#4F8DFD]/15 px-3 py-1 text-xs font-medium text-[#3F7EF5]">
                    Live
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#D9E7FF] bg-white/90 p-4">
                    <p className="text-xs text-[#6B7A90]">Occupancy</p>
                    <p className="mt-2 text-2xl font-semibold text-[#1F2D3D]">92%</p>
                    <div className="mt-2 h-2 rounded-full bg-[#E8F0FF]">
                      <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#4F8DFD] to-[#5FA0FF]" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#D9E7FF] bg-white/90 p-4">
                    <p className="text-xs text-[#6B7A90]">Rent Collection</p>
                    <p className="mt-2 text-2xl font-semibold text-[#1F2D3D]">98%</p>
                    <div className="mt-2 flex items-end gap-1.5">
                      {[45, 62, 80, 68, 95].map((height, index) => (
                        <span
                          key={`rent-bar-${height}-${index}`}
                          className="w-2 rounded-full bg-[#5FA0FF]/80"
                          style={{ height }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D9E7FF] bg-white/90 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Tenant Snapshot</p>
                      <p className="text-xs text-[#6B7A90]">Room A-204 • Paid</p>
                    </div>
                    <span className="rounded-full bg-[#4F8DFD]/15 px-2.5 py-1 text-xs text-[#3F7EF5]">
                      Active
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-[#F3F8FF] px-2 py-3">
                      Complaints
                      <p className="mt-1 text-base font-semibold text-[#1F2D3D]">04</p>
                    </div>
                    <div className="rounded-xl bg-[#F3F8FF] px-2 py-3">
                      Pending
                      <p className="mt-1 text-base font-semibold text-[#1F2D3D]">12</p>
                    </div>
                    <div className="rounded-xl bg-[#F3F8FF] px-2 py-3">
                      Revenue
                      <p className="mt-1 text-base font-semibold text-[#1F2D3D]">₹4.8L</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="glass-card absolute -left-6 top-[18%] hidden rounded-2xl px-4 py-3 text-xs text-[#3F7EF5] shadow-[0_20px_35px_-30px_rgba(63,126,245,0.8)] sm:block"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                +14% monthly growth
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
              className="glass-card absolute -right-8 bottom-[14%] hidden rounded-2xl px-4 py-3 text-xs text-[#3F7EF5] shadow-[0_20px_35px_-30px_rgba(63,126,245,0.8)] sm:block"
            >
              <div className="flex items-center gap-2">
                <BellRing className="h-4 w-4" />
                23 reminders sent today
              </div>
            </motion.div>
          </motion.div>
        </div>

        <Wave className="bottom-0" />
      </section>

      <section className="relative bg-[#F3F8FF] py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {counters.map((counter) => (
              <AnimatedCounter key={counter.label} {...counter} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="glow-spot left-[-7rem] top-32 h-72 w-72 bg-[#5FA0FF]/18" />
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#3F7EF5]">
              Problem
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 font-semibold">
              The Biggest Problems PG Owners Face
            </motion.h2>

            <motion.div variants={stagger} className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {problems.map((problem, index) => (
                <motion.article
                  key={problem.title}
                  variants={{
                    hidden: { opacity: 0, y: 24, x: index % 2 === 0 ? -12 : 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group glass-card relative overflow-hidden rounded-3xl p-6"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F8DFD] to-[#5FA0FF] text-white shadow-[0_15px_28px_-18px_rgba(63,126,245,0.8)]">
                    <problem.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-[#1F2D3D]">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6B7A90]">{problem.description}</p>
                  <div className="mt-5 flex gap-1.5">
                    {[58, 74, 46].map((h, i) => (
                      <span
                        key={`${problem.title}-mini-${h}-${i}`}
                        className="w-1.5 rounded-full bg-[#5FA0FF]/80"
                        style={{ height: `${h / 2}px` }}
                      />
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-10 top-8 h-32 w-32 rounded-full bg-[#5FA0FF]/20 blur-2xl" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#F3F8FF] py-24" id="features">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#3F7EF5]">
              Solution
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 font-semibold">
              One Smart Platform To Manage Everything
            </motion.h2>
            <motion.p variants={fadeUp} className="section-copy mt-4 text-base">
              As you scroll, the dashboard stays visible while every core capability appears around it.
              This gives a quick visual understanding of how operations fit together.
            </motion.p>

            <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div className="lg:sticky lg:top-28 lg:h-fit">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card relative overflow-hidden rounded-[2rem] p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F7FAFF] to-[#EAF2FF]" />
                  <div className="relative z-10">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-[#6B7A90]">Live Control</p>
                        <p className="mt-1 text-lg font-semibold">Operations Cockpit</p>
                      </div>
                      <span className="rounded-full bg-[#4F8DFD]/15 px-3 py-1 text-xs text-[#3F7EF5]">
                        Unified
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-[#D9E7FF] bg-white p-4">
                        <p className="text-xs text-[#6B7A90]">Collected This Month</p>
                        <p className="mt-2 text-xl font-semibold">₹12.4L</p>
                      </div>
                      <div className="rounded-2xl border border-[#D9E7FF] bg-white p-4">
                        <p className="text-xs text-[#6B7A90]">Open Complaints</p>
                        <p className="mt-2 text-xl font-semibold">7 tickets</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-[#D9E7FF] bg-white p-4">
                      <p className="text-xs text-[#6B7A90]">Branch Health</p>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        {["North", "Central", "South"].map((branch, index) => (
                          <div key={branch} className="rounded-xl bg-[#F3F8FF] p-3 text-center">
                            <p>{branch}</p>
                            <p className="mt-1 text-base font-semibold">{90 - index * 7}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {solutionHighlights.map((item, index) => (
                    <motion.span
                      key={item}
                      className="pointer-events-none absolute hidden rounded-full border border-[#D9E7FF] bg-white/90 px-3 py-1 text-xs text-[#3F7EF5] shadow-md xl:block"
                      style={{
                        top: ["10%", "23%", "37%", "52%", "67%", "82%"][index],
                        left: index % 2 === 0 ? "-8%" : "83%",
                      }}
                      animate={{ y: [0, -9, 0] }}
                      transition={{
                        duration: 4.5 + index * 0.35,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={stagger} className="space-y-5">
                {solutionHighlights.map((item, index) => (
                  <motion.article
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: index % 2 === 0 ? 28 : -28, y: 22 },
                      show: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 0.62, ease: "easeOut" },
                      },
                    }}
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-3xl p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.15em] text-[#6B7A90]">Feature {index + 1}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#1F2D3D]">{item}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#6B7A90]">
                      Connected to your central dashboard so nothing is missed across daily operations.
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#3F7EF5]">
              Feature Suite
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 font-semibold">
              Everything PG Owners Need In One Platform
            </motion.h2>
            <motion.p variants={fadeUp} className="section-copy mt-4 text-base">
              Every card below maps to a real daily PG workflow so your team can understand the
              product immediately.
            </motion.p>

            <div className="mt-12 grid gap-6 xl:grid-cols-2">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  variants={{
                    hidden: { opacity: 0, y: 24, x: index % 2 === 0 ? -14 : 14 },
                    show: {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="glass-card rounded-[1.75rem] p-6"
                >
                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F8DFD] to-[#5FA0FF] text-white shadow-[0_18px_32px_-18px_rgba(63,126,245,0.8)]">
                        <feature.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-xl font-semibold tracking-tight">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#6B7A90]">{feature.description}</p>

                      <ul className="mt-4 space-y-2 text-sm text-[#42546C]">
                        {feature.bullets.map((bullet) => (
                          <li key={`${feature.title}-${bullet}`} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3F7EF5]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-[#D9E7FF] bg-white/95 p-4">
                      <p className="text-xs uppercase tracking-[0.12em] text-[#6B7A90]">Mini Preview</p>
                      <div className="mt-4 space-y-3">
                        {feature.preview.map((width, barIndex) => (
                          <div key={`${feature.title}-bar-${width}-${barIndex}`}>
                            <div className="mb-1 text-[11px] text-[#6B7A90]">
                              {barIndex === 0
                                ? "Performance"
                                : barIndex === 1
                                  ? "Automation"
                                  : "Coverage"}
                            </div>
                            <div className="h-2.5 rounded-full bg-[#E8F1FF]">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${width}%` }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-[#4F8DFD] to-[#5FA0FF]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 rounded-xl bg-[#F3F8FF] p-3 text-xs text-[#3F7EF5]">
                        Real-time updates synced across all devices.
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#F3F8FF] py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#3F7EF5]">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 font-semibold">
              Start in 3 Simple Steps
            </motion.h2>

            <div className="relative mt-12 grid gap-6 md:grid-cols-3">
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#4F8DFD] to-[#D9E7FF] md:hidden" />
              <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-[#4F8DFD] via-[#5FA0FF] to-[#D9E7FF] md:block" />

              {[
                {
                  title: "Add your PG",
                  description: "Create branches, room structures, and initial setup in guided steps.",
                },
                {
                  title: "Manage tenants and operations",
                  description: "Track occupancy, rent, bills, complaints, and daily activities from one dashboard.",
                },
                {
                  title: "Automate and grow your business",
                  description: "Enable reminders, analytics, and workflows to scale without manual overhead.",
                },
              ].map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={fadeUp}
                  className="glass-card relative rounded-3xl p-6 md:pt-12"
                >
                  <span className="absolute left-4 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4F8DFD] to-[#5FA0FF] text-xs font-semibold text-white md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6B7A90]">{step.description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24" id="benefits">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#3F7EF5]">
              Benefits
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 font-semibold">
              Why PG Owners Love PG Manager Pro
            </motion.h2>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="rounded-[1.9rem] border border-[#E6EEFF] bg-white p-7 shadow-[0_24px_55px_-44px_rgba(63,126,245,0.45)]"
              >
                <h3 className="text-xl font-semibold text-[#1F2D3D]">Traditional Management</h3>
                <ul className="mt-5 space-y-3 text-sm text-[#6B7A90]">
                  {["Manual entries and errors", "Delayed rent follow-ups", "No branch visibility", "Slow complaint resolution", "Hard to scale operations"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 text-[#FFB020]" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </motion.article>

              <motion.article
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="glass-card relative overflow-hidden rounded-[1.9rem] p-7"
              >
                <div className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-[#5FA0FF]/25 blur-3xl" />
                <h3 className="text-xl font-semibold text-[#1F2D3D]">Smart PG Management</h3>
                <ul className="relative mt-5 space-y-3 text-sm text-[#42546C]">
                  {[
                    "Save time with automation",
                    "Reduce errors instantly",
                    "Faster rent collection",
                    "Better operations with tracking",
                    "Centralized control for growth",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-[#3F7EF5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#F3F8FF] py-24" id="testimonials">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#3F7EF5]">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 font-semibold">
              Operators Trust PG Manager Pro
            </motion.h2>

            <div className="mt-10">
              <div className="md:hidden">
                <motion.article
                  key={testimonials[activeTestimonial].name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="glass-card rounded-3xl p-6"
                >
                  <div className="mb-4 flex items-center gap-1 text-[#FFB020]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`star-mobile-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-[#42546C]">“{testimonials[activeTestimonial].quote}”</p>
                  <p className="mt-5 font-semibold text-[#1F2D3D]">{testimonials[activeTestimonial].name}</p>
                  <p className="text-xs text-[#6B7A90]">{testimonials[activeTestimonial].role}</p>
                </motion.article>
              </div>

              <div className="hidden grid-cols-3 gap-5 md:grid">
                {desktopTestimonials.map((testimonial, index) => (
                  <motion.article
                    key={`${testimonial.name}-${activeTestimonial}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    whileHover={{ y: -6 }}
                    className="glass-card rounded-3xl p-6"
                  >
                    <div className="mb-4 flex items-center gap-1 text-[#FFB020]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={`${testimonial.name}-${starIndex}`} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm leading-7 text-[#42546C]">“{testimonial.quote}”</p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0FF] text-sm font-semibold text-[#3F7EF5]">
                        {testimonial.name
                          .split(" ")
                          .map((piece) => piece.charAt(0))
                          .join("")}
                      </span>
                      <div>
                        <p className="font-semibold text-[#1F2D3D]">{testimonial.name}</p>
                        <p className="text-xs text-[#6B7A90]">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={`dot-${item.name}`}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      index === activeTestimonial ? "w-7 bg-[#4F8DFD]" : "w-2.5 bg-[#BFD5FF]",
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-white py-24" id="pricing">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-[#3F7EF5]">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 font-semibold">
              Flexible Plans For Every Stage
            </motion.h2>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <motion.article
                  key={plan.name}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className={cn(
                    "relative rounded-[1.8rem] border p-7",
                    plan.popular
                      ? "border-[#4F8DFD]/45 bg-gradient-to-b from-[#F8FBFF] to-white shadow-[0_26px_60px_-34px_rgba(63,126,245,0.5)]"
                      : "border-[#E5EEFF] bg-white shadow-[0_22px_46px_-38px_rgba(63,126,245,0.38)]",
                  )}
                >
                  {plan.popular && (
                    <span className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-[#4F8DFD] to-[#5FA0FF] px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-xl font-semibold text-[#1F2D3D]">{plan.name}</h3>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-[#1F2D3D]">{plan.price}</p>
                  <p className="mt-2 text-sm leading-7 text-[#6B7A90]">{plan.description}</p>

                  <ul className="mt-6 space-y-2 text-sm text-[#42546C]">
                    {plan.features.map((feature) => (
                      <li key={`${plan.name}-${feature}`} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3F7EF5]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 space-y-2">
                    <a
                      href="#contact"
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5",
                        plan.popular ? "gradient-button" : "secondary-button",
                      )}
                    >
                      Start Free Trial
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex w-full items-center justify-center rounded-xl border border-[#D9E7FF] px-4 py-3 text-sm font-medium text-[#3F7EF5]"
                    >
                      Book Demo
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#F3F8FF] py-24" id="faq">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-center text-sm font-medium text-[#3F7EF5]">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mt-3 text-center font-semibold">
              Common Questions
            </motion.h2>

            <motion.div variants={stagger} className="mt-10 space-y-3">
              {faqs.map((faq, index) => {
                const open = faqOpen === index;

                return (
                  <motion.article
                    key={faq.question}
                    variants={fadeUp}
                    className="glass-card overflow-hidden rounded-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => setFaqOpen(open ? null : index)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="font-medium text-[#1F2D3D]">{faq.question}</span>
                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-4 w-4 text-[#3F7EF5]" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <div className="border-t border-[#D9E7FF]/70 px-5 pb-4 pt-3 text-sm leading-7 text-[#6B7A90]">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.3rem] border border-[#D9E7FF] bg-gradient-to-r from-[#4F8DFD] via-[#5FA0FF] to-[#3F7EF5] px-7 py-12 text-white md:px-12 md:py-16"
          >
            <motion.div
              className="absolute -left-14 top-4 h-36 w-36 rounded-full bg-white/20 blur-2xl"
              animate={{ x: [0, 28, 0], y: [0, -14, 0] }}
              transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-10 bottom-4 h-40 w-40 rounded-full bg-white/20 blur-2xl"
              animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready To Transform Your PG Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                Switch from manual chaos to clear control with one modern platform built for PG owners.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#3F7EF5] sm:text-base"
                >
                  Book Free Demo
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl border border-white/65 bg-white/10 px-6 py-3 text-sm font-semibold text-white sm:text-base"
                >
                  Start Free Trial
                </motion.a>
              </div>
            </div>

            <Wave className="-bottom-1 left-0" />
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[#E5EEFF] bg-[#F7FAFF] py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F8DFD] to-[#5FA0FF] text-white">
                <Building2 className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold text-[#1F2D3D]">PG Manager Pro</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#6B7A90]">
              Premium PG operations software for managing tenants, rent, complaints, bills, and
              multi-branch growth with confidence.
            </p>
            <div className="mt-5 flex items-center gap-3 text-[#3F7EF5]">
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9E7FF]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9E7FF]"
                aria-label="Call"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9E7FF]"
                aria-label="Email"
              >
                <CircleHelp className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1F2D3D]">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#6B7A90]">
              {navLinks.map((link) => (
                <li key={`footer-${link.id}`}>
                  <a href={`#${link.id}`} className="transition-colors hover:text-[#3F7EF5]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1F2D3D]">Core Features</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#6B7A90]">
              {["Tenant Management", "Rent Automation", "Electricity Billing", "Analytics"].map((item) => (
                <li key={item}>
                  <a href="#features" className="transition-colors hover:text-[#3F7EF5]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1F2D3D]">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#6B7A90]">
              <li>hello@pgmanagerpro.com</li>
              <li>+91 90000 12345</li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-7xl border-t border-[#E5EEFF] px-6 pt-6 text-xs text-[#7D8BA0] md:px-8">
          © {new Date().getFullYear()} PG Manager Pro. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

