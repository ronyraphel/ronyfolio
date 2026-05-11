import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ExternalLink, Mail, Linkedin, Github, ChevronDown, Code2, BarChart2, Palette, Cpu, ArrowUp, Check, Copy } from "lucide-react";

// ─── Logo ────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <span className="logo-mark">
      RR<span className="logo-dot">.</span>
    </span>
  );
}

// ─── Typing Animation ────────────────────────────────────────────────────────
function TypedText({ strings, typeSpeed = 65, backSpeed = 38, pauseTime = 2000 }) {
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
    } else {
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
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
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
  { icon: <Code2 size={20} />, label: "Software Development", desc: "React, Python, Java, C++" },
  { icon: <BarChart2 size={20} />, label: "Data Analysis", desc: "SQL, Excel, Tableau, MongoDB" },
  { icon: <Palette size={20} />, label: "UI/UX Design", desc: "Figma, Wireframing, Prototyping" },
  { icon: <Cpu size={20} />, label: "Systems Thinking", desc: "Architecture, Problem Solving" },
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
        <button className="modal-close" onClick={onClose}><X size={16} /></button>
        <div className="modal-img-wrap">
          <img src={project.image} alt={project.title} className="modal-img" loading="lazy" />
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
          <a href={project.link} target="_blank" rel="noreferrer" className="modal-cta btn btn-primary">
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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      <div className="card-img-wrap">
        <img src={project.image} alt={project.title} className="card-img" loading="lazy" />
        <span className="card-tag">{project.tag}</span>
        <div className="card-hover-overlay">
          <span className="card-hover-label">View Details</span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <span className="card-link">
          {project.linkLabel || "View Project"} <ExternalLink size={12} />
        </span>
      </div>
    </div>
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
          setTimeout(() => setFadeOut(true), 400);
          setTimeout(() => onDone(), 1000);
          return 100;
        }
        return p + 3;
      });
    }, 35);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`} aria-hidden="true">
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
  const rafRef = useRef(null);

  // rAF-throttled scroll listener for performance
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const sy = window.scrollY;
        setScrolled(sy > 40);
        setShowTop(sy > 500);
        setScrollY(sy);
        const sections = ["home", "about", "projects", "contact"];
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 80 && rect.bottom > 80) { setActiveSection(id); break; }
          }
        }
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ronyraphelm@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = ["Home", "About", "Projects", "Contact"];
  const parallaxOffset = scrollY * 0.35;

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}

      <div className="grain-overlay" aria-hidden="true" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,300;1,9..40,400&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --bg: #08080a;
          --surface: #0f0f11;
          --surface2: #161618;
          --surface3: #1c1c1f;
          --border: #242427;
          --border-subtle: #1a1a1d;
          --accent: #84cc16;
          --accent-dim: #4d7c0f;
          --accent-muted: rgba(132,204,22,0.08);
          --accent-glow: rgba(132,204,22,0.15);
          --text: #f0f0f2;
          --text-muted: #8e8e96;
          --text-dim: #45454d;
          --radius: 14px;
          --radius-sm: 8px;
          --nav-h: 66px;
          --font-display: 'DM Sans', sans-serif;
          --font-body: 'Inter', sans-serif;
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
          --shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.25);
          --shadow-hover: 0 4px 6px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(132,204,22,0.2);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body {
          background: var(--bg); color: var(--text);
          font-family: var(--font-body); line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }
        button { font-family: var(--font-body); }

        /* ── Grain ── */
        .grain-overlay {
          position: fixed; inset: 0; z-index: 9;
          pointer-events: none; opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        /* ── Loading Screen ── */
        .loading-screen {
          position: fixed; inset: 0; z-index: 10000;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.7s var(--ease-out);
        }
        .loading-screen.fade-out { opacity: 0; pointer-events: none; }
        .loading-content { text-align: center; }
        .loading-logo {
          font-family: var(--font-display); font-size: 3rem; font-weight: 800;
          color: var(--text); margin-bottom: 36px; letter-spacing: -0.022em;
          animation: logo-pulse 1.2s ease-in-out infinite alternate;
        }
        .loading-logo span { color: var(--accent); }
        @keyframes logo-pulse {
          from { opacity: 0.5; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .loading-bar-wrap {
          width: 160px; height: 1.5px; background: var(--border);
          border-radius: 2px; overflow: hidden; margin: 0 auto 14px;
        }
        .loading-bar {
          height: 100%; background: var(--accent); border-radius: 2px;
          transition: width 0.035s linear; box-shadow: 0 0 10px rgba(132,204,22,0.5);
        }
        .loading-pct { font-size: 0.7rem; color: var(--text-dim); letter-spacing: 0.14em; font-weight: 500; }

        /* ── Logo ── */
        .logo-mark {
          font-family: var(--font-display); font-size: 1.45rem;
          font-weight: 800; letter-spacing: -0.022em; color: var(--text);
          transition: opacity 0.2s;
        }
        .logo-mark:hover { opacity: 0.75; }
        .logo-dot { color: var(--accent); }

        /* ── Navbar ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: var(--nav-h); display: flex; align-items: center;
          transition: background 0.4s var(--ease-in-out), border-color 0.4s, box-shadow 0.4s;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(8,8,10,0.88);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          border-bottom-color: var(--border-subtle);
        }
        .navbar-inner {
          width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 28px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-links { display: flex; gap: 2px; list-style: none; }
        .nav-links a {
          font-size: 0.85rem; font-weight: 500; color: var(--text-muted);
          padding: 7px 15px; border-radius: var(--radius-sm);
          transition: color 0.2s, background 0.2s; position: relative; letter-spacing: 0.01em;
        }
        .nav-links a:hover { color: var(--text); background: var(--surface2); }
        .nav-links a.active { color: var(--text); }
        .nav-links a.active::after {
          content: ''; position: absolute; bottom: 4px; left: 50%;
          transform: translateX(-50%); width: 4px; height: 4px;
          border-radius: 50%; background: var(--accent);
        }
        .nav-cta {
          font-size: 0.8rem; font-weight: 600; padding: 8px 20px;
          border-radius: var(--radius-sm); background: var(--accent); color: #000;
          border: none; letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(132,204,22,0.2);
          display: inline-flex; align-items: center;
        }
        .nav-cta:hover { background: #96d926; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(132,204,22,0.3); }
        .nav-cta:active { transform: translateY(0); }
        .hamburger {
          display: none; background: none; border: 1px solid var(--border);
          color: var(--text-muted); padding: 7px; border-radius: var(--radius-sm);
          transition: color 0.2s, border-color 0.2s;
        }
        .hamburger:hover { color: var(--text); border-color: var(--text-dim); }

        /* ── Mobile Menu ── */
        .mobile-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 99;
          background: rgba(8,8,10,0.97);
          border-bottom: 1px solid var(--border-subtle);
          padding: 16px 28px 20px;
          display: flex; flex-direction: column; gap: 2px;
          backdrop-filter: blur(20px);
          animation: menu-slide 0.2s var(--ease-out);
        }
        @keyframes menu-slide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .mobile-menu a {
          font-size: 0.95rem; font-weight: 500; color: var(--text-muted);
          padding: 13px 0; border-bottom: 1px solid var(--border-subtle); transition: color 0.2s;
        }
        .mobile-menu a:last-child { border-bottom: none; }
        .mobile-menu a:hover { color: var(--text); }

        /* ── Hero ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          text-align: center; overflow: hidden;
          padding: calc(var(--nav-h) + 60px) 28px 100px;
        }
        .hero-bg {
          position: absolute; inset: -25%;
          background-image: url('/images/landcruiserlimegreen.png');
          background-size: cover; background-position: center;
          filter: brightness(0.22) saturate(0.5);
          will-change: transform;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(8,8,10,0.2) 0%, rgba(8,8,10,0.55) 55%, var(--bg) 100%);
        }
        .hero-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(8,8,10,0.6) 100%);
          pointer-events: none;
        }
        .hero-glow {
          position: absolute; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(132,204,22,0.09) 0%, transparent 65%);
          top: 50%; left: 50%; transform: translate(-50%, -58%); pointer-events: none;
        }
        .hero-content { position: relative; z-index: 2; max-width: 860px; }
        .hero-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.13em;
          text-transform: uppercase; color: var(--accent);
          border: 1px solid rgba(132,204,22,0.25);
          background: var(--accent-muted);
          padding: 6px 16px; border-radius: 999px; margin-bottom: 32px;
        }
        .hero-label-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
          animation: pulse-dot 2.2s ease-in-out infinite; flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
        .hero-h1 {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 6.5vw, 4.4rem);
          font-weight: 800; line-height: 1.08; letter-spacing: -0.022em;
          color: var(--text); margin-bottom: 22px;
        }
        .hero-bio {
          font-size: clamp(0.95rem, 2vw, 1.08rem); color: var(--text-muted);
          max-width: 580px; margin: 0 auto 44px; font-weight: 300; line-height: 1.75;
        }
        .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        /* ── Buttons ── */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 10px;
          font-size: 0.875rem; font-weight: 600; letter-spacing: 0.01em;
          transition: all 0.22s var(--ease-out); border: none;
        }
        .btn-primary { background: var(--accent); color: #000; box-shadow: 0 2px 12px rgba(132,204,22,0.2); }
        .btn-primary:hover { background: #96d926; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(132,204,22,0.3); }
        .btn-primary:active { transform: translateY(0); }
        .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text-muted); }
        .btn-outline:hover { border-color: rgba(240,240,242,0.25); color: var(--text); transform: translateY(-2px); background: var(--surface2); }
        .btn-outline:active { transform: translateY(0); }

        .hero-scroll {
          position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
          z-index: 2; color: var(--text-dim);
          display: flex; flex-direction: column; align-items: center; gap: 7px;
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          animation: bounce-down 2.8s ease-in-out infinite;
        }
        @keyframes bounce-down {
          0%,100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(7px); opacity: 0.5; }
        }
        .cursor-blink {
          display: inline-block; color: var(--accent);
          animation: blink 1.1s step-end infinite; margin-left: 1px;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        /* ── Sections ── */
        .section { padding: 110px 28px; }
        .section-label {
          font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--accent); font-weight: 700; margin-bottom: 14px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 4.5vw, 2.8rem);
          font-weight: 800; letter-spacing: -0.018em;
          color: var(--text); margin-bottom: 20px; line-height: 1.1;
        }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .divider { width: 36px; height: 2px; border-radius: 2px; background: var(--accent); margin: 14px 0 44px; }

        /* ── About ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .about-text p { color: var(--text-muted); font-size: 0.975rem; font-weight: 300; line-height: 1.85; margin-bottom: 18px; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .skill-pill {
          display: flex; flex-direction: column; gap: 5px;
          padding: 18px; background: var(--surface2);
          border: 1px solid var(--border-subtle); border-radius: 12px;
          transition: border-color 0.25s, background 0.25s, transform 0.25s var(--ease-out);
          position: relative; overflow: hidden;
        }
        .skill-pill::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, var(--accent), rgba(132,204,22,0.2));
          transform: scaleX(0); transition: transform 0.35s var(--ease-out); transform-origin: left;
        }
        .skill-pill:hover { border-color: rgba(132,204,22,0.18); background: var(--surface3); transform: translateY(-2px); }
        .skill-pill:hover::before { transform: scaleX(1); }
        .skill-pill-header { display: flex; align-items: center; gap: 10px; }
        .skill-pill svg { color: var(--accent); flex-shrink: 0; opacity: 0.9; }
        .skill-pill-name { font-size: 0.845rem; font-weight: 500; color: var(--text); }
        .skill-pill-desc { font-size: 0.72rem; color: var(--text-dim); padding-left: 30px; }

        /* ── Tech Stack ── */
        .tech-stack { margin-top: 72px; padding-top: 60px; border-top: 1px solid var(--border-subtle); }
        .tech-label {
          text-align: center; font-size: 0.67rem; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--text-dim); margin-bottom: 28px; font-weight: 600;
        }
        .tech-scroll-wrap { overflow: hidden; position: relative; }
        .tech-scroll-wrap::before, .tech-scroll-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 100px; z-index: 2; pointer-events: none;
        }
        .tech-scroll-wrap::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
        .tech-scroll-wrap::after { right: 0; background: linear-gradient(to left, var(--bg), transparent); }
        .tech-track {
          display: flex; gap: 10px;
          animation: scroll-left 22s linear infinite; width: max-content;
        }
        .tech-track:hover { animation-play-state: paused; }
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .tech-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 999px;
          background: var(--surface2); border: 1px solid var(--border-subtle);
          font-size: 0.82rem; font-weight: 500; color: var(--text-muted);
          white-space: nowrap; flex-shrink: 0;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .tech-chip:hover { border-color: rgba(132,204,22,0.25); color: var(--text); background: var(--surface3); }

        /* ── Projects ── */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
        .project-card {
          background: var(--surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius); overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: transform 0.35s var(--ease-out), border-color 0.35s, box-shadow 0.35s, opacity 0.55s, translate 0.55s;
          cursor: pointer;
        }
        .project-card:hover { transform: translateY(-5px); border-color: rgba(132,204,22,0.2); box-shadow: var(--shadow-hover); }
        .project-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .card-img-wrap { position: relative; overflow: hidden; height: 196px; background: var(--surface2); }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s var(--ease-out); }
        .project-card:hover .card-img { transform: scale(1.05); }
        .card-hover-overlay {
          position: absolute; inset: 0; background: rgba(8,8,10,0.65);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s var(--ease-out); backdrop-filter: blur(3px);
        }
        .project-card:hover .card-hover-overlay { opacity: 1; }
        .card-hover-label {
          font-family: var(--font-display); font-size: 0.8rem; font-weight: 700;
          color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid rgba(132,204,22,0.35); padding: 9px 20px; border-radius: 999px;
          background: rgba(132,204,22,0.08);
        }
        .card-tag {
          position: absolute; top: 14px; right: 14px;
          background: rgba(8,8,10,0.88); border: 1px solid var(--border);
          color: var(--accent); font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 11px; border-radius: 999px; backdrop-filter: blur(8px);
        }
        .card-body { padding: 24px; }
        .card-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; letter-spacing: -0.01em; }
        .card-desc { font-size: 0.845rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 20px; font-weight: 300; }
        .card-link { display: inline-flex; align-items: center; gap: 5px; font-size: 0.8rem; font-weight: 600; color: var(--accent); transition: gap 0.2s, opacity 0.2s; }
        .card-link:hover { gap: 8px; opacity: 0.8; }

        /* ── Reveal animations ── */
        .reveal-hidden { opacity: 0; translate: 0 28px; }
        .reveal-in { opacity: 1; translate: 0 0; transition: opacity 0.65s var(--ease-out), translate 0.65s var(--ease-out); }

        /* ── Modal ── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.82); backdrop-filter: blur(12px) saturate(0.8);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: fade-in 0.2s ease;
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .modal-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 18px; overflow: hidden;
          max-width: 560px; width: 100%; position: relative;
          animation: slide-up 0.28s var(--ease-out);
          box-shadow: 0 40px 100px rgba(0,0,0,0.7);
        }
        @keyframes slide-up { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          background: rgba(8,8,10,0.82); border: 1px solid var(--border);
          color: var(--text-muted); border-radius: var(--radius-sm);
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s, border-color 0.2s; backdrop-filter: blur(8px);
        }
        .modal-close:hover { color: var(--text); border-color: var(--text-dim); }
        .modal-img-wrap { position: relative; height: 240px; overflow: hidden; background: var(--surface2); }
        .modal-img { width: 100%; height: 100%; object-fit: cover; }
        .modal-body { padding: 30px; }
        .modal-title { font-family: var(--font-display); font-size: 1.35rem; font-weight: 800; color: var(--text); margin-bottom: 12px; letter-spacing: -0.018em; }
        .modal-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.8; font-weight: 300; margin-bottom: 22px; }
        .modal-tech { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 26px; }
        .modal-tech-chip {
          font-size: 0.72rem; font-weight: 600; padding: 4px 12px; border-radius: 999px;
          background: var(--accent-muted); border: 1px solid rgba(132,204,22,0.18);
          color: var(--accent); letter-spacing: 0.05em;
        }
        .modal-cta { width: 100%; justify-content: center; }

        /* ── Contact ── */
        .contact-box {
          background: var(--surface); border: 1px solid var(--border-subtle);
          border-radius: 20px; padding: 64px 52px; text-align: center;
          max-width: 660px; margin: 0 auto; position: relative; overflow: hidden;
          box-shadow: var(--shadow-card);
        }
        .contact-box::before {
          content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%); pointer-events: none;
        }
        .contact-box p { color: var(--text-muted); font-size: 0.975rem; font-weight: 300; max-width: 440px; margin: 0 auto 40px; line-height: 1.75; }
        .contact-btns { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
        .contact-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border-radius: 10px; font-size: 0.845rem; font-weight: 600; transition: all 0.22s var(--ease-out); border: none; }
        .btn-email { background: var(--accent); color: #000; box-shadow: 0 2px 10px rgba(132,204,22,0.18); }
        .btn-email:hover { background: #96d926; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(132,204,22,0.28); }
        .btn-linkedin { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
        .btn-linkedin:hover { border-color: #1d6fa4; color: #4d9fd4; transform: translateY(-2px); }
        .btn-github { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
        .btn-github:hover { border-color: rgba(240,240,242,0.2); transform: translateY(-2px); }
        .copy-email-row {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 12px 22px; border-radius: 10px;
          background: var(--surface2); border: 1px solid var(--border-subtle);
          margin: 0 auto; width: fit-content;
        }
        .copy-email-addr { font-size: 0.83rem; color: var(--text-muted); }
        .copy-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; font-weight: 600; color: var(--accent); background: none; border: none; transition: opacity 0.2s; }
        .copy-btn:hover { opacity: 0.75; }
        .copy-success { color: #4ade80 !important; }

        /* ── Footer ── */
        .footer-wrap { border-top: 1px solid var(--border-subtle); }
        .footer {
          padding: 28px 28px; max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-copy { font-size: 0.78rem; color: var(--text-dim); }
        .footer-accent { color: var(--accent); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 0.78rem; color: var(--text-dim); transition: color 0.2s; }
        .footer-links a:hover { color: var(--text-muted); }

        /* ── Back to Top ── */
        .back-to-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 90;
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--surface2); color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--border);
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
          opacity: 0; pointer-events: none; transform: translateY(12px);
          transition: opacity 0.3s, transform 0.3s var(--ease-out), background 0.2s, border-color 0.2s;
        }
        .back-to-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .back-to-top:hover { background: var(--surface3); border-color: rgba(132,204,22,0.3); transform: translateY(-2px) !important; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .about-grid { grid-template-columns: 1fr; gap: 44px; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .contact-box { padding: 44px 28px; }
          .section { padding: 80px 20px; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; align-items: center; }
          .contact-box { padding: 36px 20px; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#home"><Logo /></a>
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={activeSection === l.toLowerCase() ? "active" : ""}>{l}</a>
              </li>
            ))}
          </ul>
          <a href="mailto:ronyraphelm@gmail.com" className="nav-cta">Hire Me</a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" role="navigation">
          {navLinks.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
        </div>
      )}

      {/* ── Hero ── */}
      <section id="home" className="hero">
        <div className="hero-bg" style={{ transform: `translateY(${parallaxOffset}px)` }} />
        <div className="hero-overlay" />
        <div className="hero-vignette" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-label">
            <span className="hero-label-dot" />
            Available for opportunities
          </div>
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
        <div className="hero-scroll" aria-hidden="true">
          <ChevronDown size={15} />
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
              <p>I enjoy solving problems, learning new technologies, and building projects that create real value. When I'm not coding, I'm travelling, cooking, or geeking out over cars!</p>
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
          <div className="tech-stack">
            <p className="tech-label">Technologies I work with</p>
            <div className="tech-scroll-wrap">
              <div className="tech-track">
                {[...techStack, ...techStack].map((t, i) => (
                  <div className="tech-chip" key={i}><span>{t.icon}</span>{t.name}</div>
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
              <ProjectCard key={p.title} project={p} delay={i * 90} onOpen={setModalProject} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="contact-box">
            <p className="section-label" style={{ marginBottom: 14 }}>Get In Touch</p>
            <h2 className="section-title" style={{ marginBottom: 18 }}>Let's work together.</h2>
            <p>Open to collaborations, freelance work, or a good conversation. Feel free to reach out anytime 😊</p>
            <div className="contact-btns">
              <a href="mailto:ronyraphelm@gmail.com" className="contact-btn btn-email"><Mail size={14} /> Email Me</a>
              <a href="https://www.linkedin.com/in/ronyraphel/" target="_blank" rel="noreferrer" className="contact-btn btn-linkedin"><Linkedin size={14} /> LinkedIn</a>
              <a href="https://github.com/ronyraphel" target="_blank" rel="noreferrer" className="contact-btn btn-github"><Github size={14} /> GitHub</a>
            </div>
            <div className="copy-email-row">
              <span className="copy-email-addr">ronyraphelm@gmail.com</span>
              <button className={`copy-btn ${copied ? "copy-success" : ""}`} onClick={handleCopyEmail}>
                {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-wrap">
        <div className="footer">
          <p className="footer-copy">© {new Date().getFullYear()} <span className="footer-accent">Rony Raphel.</span> All rights reserved.</p>
          <div className="footer-links">
            <a href="#home">Top</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      <button className={`back-to-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        <ArrowUp size={16} />
      </button>
    </>
  );
}