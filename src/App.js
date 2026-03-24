import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ExternalLink, Mail, Linkedin, Github, ChevronDown, Code2, BarChart2, Palette, Cpu, ArrowUp, Check, Copy } from "lucide-react";

// ─── Inline Logo ────────────────────────────────────────────────────────────
function Logo() {
  return (
    <span className="logo-mark">
      RR<span className="logo-dot">.</span>
    </span>
  );
}

// ─── Typing Animation ────────────────────────────────────────────────────────
function TypedText({ strings, typeSpeed = 60, backSpeed = 35, pauseTime = 1800 }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("typing");
  const charRef = useRef(0);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (phase === "typing") {
      if (charRef.current < current.length) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, charRef.current + 1));
          charRef.current += 1;
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseTime);
      }
    } else if (phase === "deleting") {
      if (charRef.current > 0) {
        timeout = setTimeout(() => {
          charRef.current -= 1;
          setDisplay(current.slice(0, charRef.current));
        }, backSpeed);
      } else {
        setIdx((i) => (i + 1) % strings.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, idx, strings, typeSpeed, backSpeed, pauseTime]);

  return (
    <span>
      {display}
      <span className="cursor-blink">|</span>
    </span>
  );
}

// ─── Scroll-reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  const started = useRef(false);

  useEffect(() => {
    if (visible && !started.current) {
      started.current = true;
      const duration = 1800;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }
  }, [visible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Projects Data ───────────────────────────────────────────────────────────
const projects = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio built with React and Tailwind CSS showcasing work and skills.",
    image: "/images/prftlio.png",
    link: "#",
    tag: "Web Dev",
    longDesc: "A fully responsive personal portfolio site built with React. Features smooth scroll animations, a dynamic typing header, and a clean dark aesthetic with lime green accents.",
    tech: ["React", "CSS", "Tailwind"],
  },
  {
    title: "Eggscape",
    description: "Fun interactive game built with Scratch for kids, blending creativity with logic.",
    image: "/images/egghome.png",
    link: "https://scratch.mit.edu/projects/1104720161/fullscreen/",
    linkLabel: "Play Game →",
    tag: "Game",
    longDesc: "An interactive platformer game built in Scratch, designed for younger audiences. Features multiple levels, collision logic, and animated sprites.",
    tech: ["Scratch", "Game Design", "Animation"],
  },
  {
    title: "Budget Tracker",
    description: "A web app to manage personal expenses and income with clean data visualization.",
    image: "/images/budgettrack.png",
    link: "#",
    tag: "Web App",
    longDesc: "A personal finance web app that lets users log income and expenses, categorize transactions, and visualize spending habits through interactive charts.",
    tech: ["JavaScript", "Chart.js", "HTML/CSS"],
  },
  {
    title: "BikeBlitz UI/UX",
    description: "Interactive Figma prototype for motorcycle enthusiasts to share and explore rides.",
    image: "/images/bikeblitz.png",
    link: "https://www.figma.com/proto/ciyDOIzZWGZNqfqxT7BXhn/bikeblitz-sample-prototype?node-id=19-170&t=ZWv3LjH2mr5yKawy-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=19%3A170",
    linkLabel: "Open in Figma →",
    tag: "Design",
    longDesc: "A high-fidelity Figma prototype for a motorcycle community app. Designed user flows for ride sharing, route exploration, and community features with a bold, sport-inspired visual language.",
    tech: ["Figma", "UI/UX", "Prototyping"],
  },
];

const skills = [
  { icon: <Code2 size={22} />, label: "Software Development", desc: "React, Python, Java, C++" },
  { icon: <BarChart2 size={22} />, label: "Data Analysis", desc: "SQL, Excel, Tableau, MongoDB" },
  { icon: <Palette size={22} />, label: "UI/UX Design", desc: "Figma, Wireframing, Prototyping" },
  { icon: <Cpu size={22} />, label: "Systems Thinking", desc: "Architecture, Problem Solving" },
];

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "🟨" },
  { name: "Java", icon: "☕" },
  { name: "SQL", icon: "🗄️" },
  { name: "Figma", icon: "🎨" },
  { name: "Git", icon: "📦" },
  { name: "HTML/CSS", icon: "🌐" },
  { name: "C++", icon: "⚙️" },
  { name: "Tailwind", icon: "💨" },
];

// ─── Project Modal ───────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        <div className="modal-img-wrap">
          <img src={project.image} alt={project.title} className="modal-img" />
          <span className="card-tag">{project.tag}</span>
        </div>
        <div className="modal-body">
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-desc">{project.longDesc}</p>
          <div className="modal-tech">
            {project.tech.map((t) => (
              <span key={t} className="modal-tech-chip">{t}</span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="modal-cta btn btn-primary"
          >
            {project.linkLabel || "View Project"} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({ project, delay, onOpen }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`project-card ${visible ? "reveal-in" : "reveal-hidden"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onOpen(project)}
    >
      <div className="card-img-wrap">
        <img src={project.image} alt={project.title} className="card-img" />
        <span className="card-tag">{project.tag}</span>
        <div className="card-hover-overlay">
          <span className="card-hover-label">View Details</span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <button className="card-link">
          {project.linkLabel || "View Project"} <ExternalLink size={13} />
        </button>
      </div>
    </div>
  );
}



// ─── Custom Cursor ───────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const addHover = () => {
      dotRef.current?.classList.add("hovered");
      ringRef.current?.classList.add("hovered");
    };
    const removeHover = () => {
      dotRef.current?.classList.remove("hovered");
      ringRef.current?.classList.remove("hovered");
    };

    const interactables = document.querySelectorAll("a, button");
    interactables.forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─── Loading Screen ──────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onDone(), 900);
          return 100;
        }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-content">
        <div className="loading-logo">RR<span>.</span></div>
        <div className="loading-bar-wrap">
          <div className="loading-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-pct">{progress}%</div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 40);
      setShowTop(sy > 400);
      setScrollY(sy);

      const sections = ["home", "about", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ronyraphelm@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = ["Home", "About", "Projects", "Contact"];

  // Parallax: bg moves at 40% of scroll speed
  const parallaxOffset = scrollY * 0.4;

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}

      {/* ── Grain overlay (fixed, sits on top of everything at low opacity) ── */}
      <div className="grain-overlay" aria-hidden="true" />

      <style>{`
        :root {
          --bg: #09090b;
          --surface: #111113;
          --surface2: #18181b;
          --border: #27272a;
          --accent: #84cc16;
          --accent-dim: #4d7c0f;
          --accent-glow: rgba(132,204,22,0.18);
          --text: #f4f4f5;
          --text-muted: #a1a1aa;
          --text-dim: #52525b;
          --radius: 12px;
          --nav-h: 64px;
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg); color: var(--text);
          font-family: var(--font-body); line-height: 1.65;
          -webkit-font-smoothing: antialiased; cursor: auto;
        }
        a { text-decoration: none; color: inherit; cursor: pointer; }
        img { display: block; max-width: 100%; }
        button { cursor: pointer; }

        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Grain Overlay ── */
        .grain-overlay {
          position: fixed; inset: 0; z-index: 9990;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
        }

        /* ── Custom Cursor ── */
        .cursor-dot {
          position: fixed; z-index: 9999;
          width: 8px; height: 8px;
          background: var(--accent); border-radius: 50%;
          pointer-events: none; transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s;
        }
        .cursor-ring {
          position: fixed; z-index: 9998;
          width: 32px; height: 32px;
          border: 1.5px solid rgba(132,204,22,0.5);
          border-radius: 50%; pointer-events: none;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .cursor-dot.hovered { width: 12px; height: 12px; }
        .cursor-ring.hovered { width: 48px; height: 48px; border-color: var(--accent); }

        /* ── Loading Screen ── */
        .loading-screen {
          position: fixed; inset: 0; z-index: 10000;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.6s ease;
        }
        .loading-screen.fade-out { opacity: 0; pointer-events: none; }
        .loading-content { text-align: center; }
        .loading-logo {
          font-family: var(--font-display);
          font-size: 3.5rem; font-weight: 800;
          color: var(--text); margin-bottom: 32px;
          letter-spacing: -0.04em;
          animation: logo-pulse 1s ease-in-out infinite alternate;
        }
        .loading-logo span { color: var(--accent); }
        @keyframes logo-pulse {
          from { opacity: 0.6; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .loading-bar-wrap {
          width: 200px; height: 2px;
          background: var(--border); border-radius: 2px;
          overflow: hidden; margin: 0 auto 12px;
        }
        .loading-bar {
          height: 100%; background: var(--accent); border-radius: 2px;
          transition: width 0.04s linear;
          box-shadow: 0 0 8px var(--accent);
        }
        .loading-pct { font-size: 0.75rem; color: var(--text-dim); letter-spacing: 0.1em; }

        /* ── Logo ── */
        .logo-mark {
          font-family: var(--font-display); font-size: 1.5rem;
          font-weight: 800; letter-spacing: -0.02em; color: var(--text);
        }
        .logo-dot { color: var(--accent); }

        /* ── Navbar ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: var(--nav-h); display: flex; align-items: center;
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(9,9,11,0.85);
          backdrop-filter: blur(16px); border-bottom-color: var(--border);
        }
        .navbar-inner {
          width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-links { display: flex; gap: 4px; list-style: none; }
        .nav-links a {
          font-family: var(--font-body); font-size: 0.875rem; font-weight: 500;
          color: var(--text-muted); padding: 6px 14px; border-radius: 6px;
          transition: color 0.2s, background 0.2s; position: relative;
        }
        .nav-links a:hover { color: var(--text); background: var(--surface2); }
        .nav-links a.active { color: var(--accent); }
        .nav-links a.active::after {
          content: ''; position: absolute; bottom: 2px; left: 50%;
          transform: translateX(-50%); width: 4px; height: 4px;
          border-radius: 50%; background: var(--accent);
        }
        .nav-cta {
          font-size: 0.8rem; font-weight: 600; padding: 7px 18px;
          border-radius: 8px; background: var(--accent); color: #000;
          transition: opacity 0.2s; border: none;
        }
        .nav-cta:hover { opacity: 0.85; }
        .hamburger {
          display: none; background: none; border: none; color: var(--text); padding: 4px;
        }

        /* ── Mobile Menu ── */
        .mobile-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 99;
          background: rgba(9,9,11,0.97); border-bottom: 1px solid var(--border);
          padding: 20px 24px; display: flex; flex-direction: column; gap: 4px;
          backdrop-filter: blur(12px);
        }
        .mobile-menu a {
          font-size: 1rem; font-weight: 500; color: var(--text-muted);
          padding: 12px 0; border-bottom: 1px solid var(--border); transition: color 0.2s;
        }
        .mobile-menu a:hover { color: var(--text); }

        /* ── Hero ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          text-align: center; overflow: hidden;
          padding: calc(var(--nav-h) + 40px) 24px 80px;
        }
        /* Parallax bg is moved via inline style from JS */
        .hero-bg {
          position: absolute; inset: -20%; /* extra space for parallax movement */
          background-image: url('/images/landcruiserlimegreen.png');
          background-size: cover; background-position: center;
          filter: brightness(0.28) saturate(0.6);
          will-change: transform;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(9,9,11,0.3) 0%, rgba(9,9,11,0.7) 60%, var(--bg) 100%);
        }
        .hero-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(132,204,22,0.12) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -55%); pointer-events: none;
        }
        .hero-content { position: relative; z-index: 2; max-width: 840px; }
        .hero-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent);
          border: 1px solid var(--accent-dim); background: rgba(132,204,22,0.08);
          padding: 5px 14px; border-radius: 999px; margin-bottom: 28px;
        }
        .hero-label::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-h1 {
          font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 800; line-height: 1.1; letter-spacing: -0.03em;
          color: var(--text); margin-bottom: 20px;
        }
        .hero-bio {
          font-size: clamp(0.95rem, 2vw, 1.1rem); color: var(--text-muted);
          max-width: 640px; margin: 0 auto 36px; font-weight: 300;
        }
        .hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 12px 26px; border-radius: 10px; font-family: var(--font-body);
          font-size: 0.9rem; font-weight: 600; transition: all 0.2s; border: none;
        }
        .btn-primary { background: var(--accent); color: #000; }
        .btn-primary:hover { background: #a3e635; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(132,204,22,0.25); }
        .btn-outline { background: transparent; border: 1.5px solid var(--border); color: var(--text-muted); }
        .btn-outline:hover { border-color: var(--text-muted); color: var(--text); transform: translateY(-1px); }
        .hero-scroll {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          z-index: 2; color: var(--text-dim);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          animation: bounce-down 2.5s ease-in-out infinite;
        }
        @keyframes bounce-down {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .cursor-blink {
          display: inline-block; color: var(--accent);
          animation: blink 1s step-end infinite; margin-left: 2px;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        /* ── Section base ── */
        .section { padding: 100px 24px; }
        .section-label {
          font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--accent); font-weight: 700; margin-bottom: 12px;
        }
        .section-title {
          font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800; letter-spacing: -0.02em; color: var(--text); margin-bottom: 20px;
        }
        .section-inner { max-width: 1180px; margin: 0 auto; }
        .divider { width: 40px; height: 3px; border-radius: 2px; background: var(--accent); margin: 16px 0 40px; }

        /* ── About ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .about-text p { color: var(--text-muted); font-size: 1rem; font-weight: 300; line-height: 1.8; margin-bottom: 16px; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .skill-pill {
          display: flex; flex-direction: column; gap: 4px;
          padding: 16px; background: var(--surface2); border: 1px solid var(--border);
          border-radius: 10px; transition: border-color 0.2s; position: relative; overflow: hidden;
        }
        .skill-pill::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--accent); transform: scaleX(0);
          transition: transform 0.3s; transform-origin: left;
        }
        .skill-pill:hover::before { transform: scaleX(1); }
        .skill-pill:hover { border-color: var(--accent-dim); }
        .skill-pill-header { display: flex; align-items: center; gap: 10px; }
        .skill-pill svg { color: var(--accent); flex-shrink: 0; }
        .skill-pill-name { font-size: 0.875rem; font-weight: 500; color: var(--text); }
        .skill-pill-desc { font-size: 0.75rem; color: var(--text-dim); padding-left: 32px; }

        /* ── Tech Stack ── */
        .tech-stack { margin-top: 60px; padding-top: 60px; border-top: 1px solid var(--border); }
        .tech-label {
          text-align: center; font-size: 0.7rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 28px;
        }
        .tech-scroll-wrap { overflow: hidden; position: relative; }
        .tech-scroll-wrap::before, .tech-scroll-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2;
        }
        .tech-scroll-wrap::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
        .tech-scroll-wrap::after { right: 0; background: linear-gradient(to left, var(--bg), transparent); }
        .tech-track {
          display: flex; gap: 12px;
          animation: scroll-left 20s linear infinite; width: max-content;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tech-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 999px;
          background: var(--surface2); border: 1px solid var(--border);
          font-size: 0.85rem; font-weight: 500; color: var(--text-muted);
          white-space: nowrap; flex-shrink: 0; transition: border-color 0.2s, color 0.2s;
        }
        .tech-chip:hover { border-color: var(--accent-dim); color: var(--text); }
        .tech-emoji { font-size: 1rem; }

        /* ── Projects ── */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
        .project-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s, opacity 0.6s, translate 0.6s;
          cursor: none;
        }
        .project-card:hover {
          transform: translateY(-4px); border-color: var(--accent-dim);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px var(--accent-dim);
        }
        .card-img-wrap { position: relative; overflow: hidden; height: 190px; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .project-card:hover .card-img { transform: scale(1.06); }

        /* Hover overlay on card image */
        .card-hover-overlay {
          position: absolute; inset: 0;
          background: rgba(9,9,11,0.6);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s;
          backdrop-filter: blur(2px);
        }
        .project-card:hover .card-hover-overlay { opacity: 1; }
        .card-hover-label {
          font-family: var(--font-display);
          font-size: 0.85rem; font-weight: 700;
          color: var(--accent); letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid var(--accent-dim);
          padding: 8px 18px; border-radius: 999px;
          background: rgba(132,204,22,0.1);
        }

        .card-tag {
          position: absolute; top: 12px; right: 12px;
          background: rgba(9,9,11,0.85); border: 1px solid var(--border);
          color: var(--accent); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 999px; backdrop-filter: blur(8px);
        }
        .card-body { padding: 22px; }
        .card-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .card-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 18px; font-weight: 300; }
        .card-link {
          display: inline-flex; align-items: center; gap: 5px; font-size: 0.82rem;
          font-weight: 600; color: var(--accent); transition: gap 0.2s;
          background: none; border: none; padding: 0;
        }
        .card-link:hover { gap: 8px; }

        /* ── Reveal animations ── */
        .reveal-hidden { opacity: 0; translate: 0 24px; }
        .reveal-in { opacity: 1; translate: 0 0; transition: opacity 0.6s ease, translate 0.6s ease; }

        /* ── Project Modal ── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fade-in 0.2s ease;
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .modal-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden;
          max-width: 560px; width: 100%;
          position: relative;
          animation: slide-up 0.25s ease;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          background: rgba(9,9,11,0.7); border: 1px solid var(--border);
          color: var(--text-muted); border-radius: 8px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s, border-color 0.2s;
          backdrop-filter: blur(8px);
        }
        .modal-close:hover { color: var(--text); border-color: var(--text-muted); }
        .modal-img-wrap { position: relative; height: 240px; overflow: hidden; }
        .modal-img { width: 100%; height: 100%; object-fit: cover; }
        .modal-body { padding: 28px; }
        .modal-title {
          font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
          color: var(--text); margin-bottom: 12px; letter-spacing: -0.02em;
        }
        .modal-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.75; font-weight: 300; margin-bottom: 20px; }
        .modal-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .modal-tech-chip {
          font-size: 0.75rem; font-weight: 600;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(132,204,22,0.1);
          border: 1px solid var(--accent-dim);
          color: var(--accent); letter-spacing: 0.04em;
        }
        .modal-cta { width: 100%; justify-content: center; }

        /* ── Contact ── */
        .contact-box {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 60px 48px; text-align: center;
          max-width: 640px; margin: 0 auto; position: relative; overflow: hidden;
        }
        .contact-box::before {
          content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%); pointer-events: none;
        }
        .contact-box p { color: var(--text-muted); font-size: 1rem; font-weight: 300; max-width: 420px; margin: 0 auto 36px; }
        .contact-btns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        .contact-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border-radius: 9px; font-size: 0.875rem; font-weight: 600; transition: all 0.2s; border: none; }
        .btn-email { background: var(--accent); color: #000; }
        .btn-email:hover { background: #a3e635; transform: translateY(-2px); }
        .btn-linkedin { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
        .btn-linkedin:hover { border-color: #0a66c2; color: #0a66c2; transform: translateY(-2px); }
        .btn-github { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
        .btn-github:hover { border-color: var(--text-muted); transform: translateY(-2px); }
        .copy-email-row {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 12px 20px; border-radius: 8px;
          background: var(--surface2); border: 1px solid var(--border);
          margin: 0 auto; width: fit-content;
        }
        .copy-email-addr { font-size: 0.85rem; color: var(--text-muted); }
        .copy-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 0.78rem; font-weight: 600; color: var(--accent); background: none; border: none; transition: opacity 0.2s; }
        .copy-btn:hover { opacity: 0.8; }
        .copy-success { color: #22c55e !important; }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid var(--border); padding: 28px 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; max-width: 1180px; margin: 0 auto;
        }
        .footer-copy { font-size: 0.8rem; color: var(--text-dim); }
        .footer-accent { color: var(--accent); }
        .footer-links { display: flex; gap: 20px; }
        .footer-links a { font-size: 0.8rem; color: var(--text-dim); transition: color 0.2s; }
        .footer-links a:hover { color: var(--text); }

        /* ── Back to Top ── */
        .back-to-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 90;
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--accent); color: #000;
          display: flex; align-items: center; justify-content: center;
          border: none; box-shadow: 0 4px 20px rgba(132,204,22,0.3);
          opacity: 0; pointer-events: none; transform: translateY(10px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .back-to-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .back-to-top:hover { background: #a3e635; transform: translateY(-2px) !important; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .contact-box { padding: 40px 24px; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <Logo />
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={activeSection === l.toLowerCase() ? "active" : ""}>{l}</a>
              </li>
            ))}
          </ul>
          <a href="mailto:ronyraphelm@gmail.com" className="nav-cta btn">Hire Me</a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
        </div>
      )}

      {/* ── Hero ── */}
      <section id="home" className="hero">
        {/* Parallax bg — translateY driven by scroll */}
        <div
          className="hero-bg"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-label">Available for opportunities</div>
          <h1 className="hero-h1">
            <TypedText strings={["Hi, I'm Rony Raphel.", "I Build for the Web.", "I Analyse & Design.", "I'm a Foodie & Car Nerd."]} />
          </h1>
          <p className="hero-bio">
            CS grad from Trent University · Software enthusiast turned developer · passionate about building clean, functional things that create real value.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">View Resume</a>
          </div>
        </div>
        <div className="hero-scroll">
          <ChevronDown size={16} />
          <span>scroll</span>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text">
              <p className="section-label">About Me</p>
              <h2 className="section-title">Turning ideas<br />into reality.</h2>
              <div className="divider" />
              <p>I recently graduated with a degree in Computer Science, gaining experience in programming, software development, and database management.</p>
              <p>I enjoy solving problems, learning new technologies, and building projects that create value. When I'm not coding, I'm travelling, cooking, or geeking out over cars!</p>
            </div>
            <div className="skills-grid">
              {skills.map((s) => (
                <div key={s.label} className="skill-pill">
                  <div className="skill-pill-header">
                    {s.icon}
                    <span className="skill-pill-name">{s.label}</span>
                  </div>
                  <span className="skill-pill-desc">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tech Stack Marquee ── */}
          <div className="tech-stack">
            <p className="tech-label">Technologies I work with</p>
            <div className="tech-scroll-wrap">
              <div className="tech-track">
                {[...techStack, ...techStack].map((t, i) => (
                  <div className="tech-chip" key={i}>
                    <span className="tech-emoji">{t.icon}</span>
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Selected Projects</h2>
          <div className="divider" />
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={i * 80} onOpen={setModalProject} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="contact-box">
            <p className="section-label" style={{ marginBottom: 12 }}>Get In Touch</p>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Let's work together.</h2>
            <p>Open to collaborations, freelance work, or a good conversation. Feel free to reach out anytime 😊</p>
            <div className="contact-btns">
              <a href="mailto:ronyraphelm@gmail.com" className="contact-btn btn-email">
                <Mail size={15} /> Email Me
              </a>
              <a href="https://www.linkedin.com/in/ronyraphel/" target="_blank" rel="noreferrer" className="contact-btn btn-linkedin">
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="https://github.com/ronyraphel" target="_blank" rel="noreferrer" className="contact-btn btn-github">
                <Github size={15} /> GitHub
              </a>
            </div>
            <div className="copy-email-row">
              <span className="copy-email-addr">ronyraphelm@gmail.com</span>
              <button className={`copy-btn ${copied ? "copy-success" : ""}`} onClick={handleCopyEmail}>
                {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer">
          <p className="footer-copy">© {new Date().getFullYear()} <span className="footer-accent">Rony Raphel.</span> All rights reserved.</p>
          <div className="footer-links">
            <a href="#home">Top</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── Back to Top ── */}
      <button
        className={`back-to-top ${showTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}