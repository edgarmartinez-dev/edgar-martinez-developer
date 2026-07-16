import { useEffect, useState } from "react";
import { projects } from "./projects";

function InstallButton() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!prompt) return null;
  return (
    <button
      className="install-btn"
      onClick={async () => {
        prompt.prompt();
        await prompt.userChoice;
        setPrompt(null);
      }}
    >
      ⬇ Install app
    </button>
  );
}

const STATUS = {
  live: { label: "live", className: "status-live" },
  building: { label: "building", className: "status-building" },
  idea: { label: "idea", className: "status-idea" },
};

function ProjectCard({ project }) {
  const status = STATUS[project.status] ?? STATUS.idea;
  return (
    <article className="card" style={{ "--accent": project.color }}>
      <div className="card-top">
        <span className={`status ${status.className}`}>
          <span className="status-dot" />
          {status.label}
        </span>
        <span className="card-star" aria-hidden="true">
          ✦
        </span>
      </div>
      <h2 className="card-title">{project.name}</h2>
      <p className="card-desc">{project.description}</p>
      <ul className="tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="card-links">
        <a href={project.url}>visit ↗</a>
        <a href={project.repo}>code ↗</a>
      </div>
    </article>
  );
}

function Scenery() {
  return (
    <div className="scenery" aria-hidden="true">
      <div className="sun" />
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      <div className="haze" />
      <svg
        className="hills"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hill-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b5dfa6" />
            <stop offset="60%" stopColor="#8ec983" />
            <stop offset="100%" stopColor="#7ab871" />
          </linearGradient>
          <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84c86f" />
            <stop offset="55%" stopColor="#5fad56" />
            <stop offset="100%" stopColor="#4a9448" />
          </linearGradient>
          <linearGradient id="hill-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#57a955" />
            <stop offset="50%" stopColor="#3e8948" />
            <stop offset="100%" stopColor="#2c6b38" />
          </linearGradient>
          <linearGradient id="hill-shine" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#hill-far)"
          d="M0,192 C240,96 480,96 720,160 C960,224 1200,224 1440,144 L1440,320 L0,320 Z"
        />
        <path
          fill="url(#hill-shine)"
          d="M0,192 C240,96 480,96 720,160 C960,224 1200,224 1440,144 L1440,320 L0,320 Z"
        />
        <path
          fill="url(#hill-mid)"
          d="M0,256 C280,160 520,180 760,232 C1000,284 1240,264 1440,208 L1440,320 L0,320 Z"
        />
        <path
          fill="url(#hill-shine)"
          d="M0,256 C280,160 520,180 760,232 C1000,284 1240,264 1440,208 L1440,320 L0,320 Z"
        />
        <path
          fill="url(#hill-near)"
          d="M0,300 C320,236 640,240 920,280 C1160,312 1320,304 1440,280 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
}

export default function App() {
  const counts = projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="page">
      <Scenery />
      <InstallButton />
      <header className="hero">
        <p className="kicker">hi, i build things for fun</p>
        <h1>
          Edgar Martinez<span className="hero-accent"> / developer</span>
        </h1>
        <p className="hero-sub">
          A little dashboard of my side projects — some live, some cooking,
          some still just ideas.
        </p>
        <div className="stats">
          <span>{counts.live ?? 0} live</span>
          <span>{counts.building ?? 0} building</span>
          <span>{counts.idea ?? 0} ideas</span>
        </div>
      </header>

      <main className="grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Edgar Martinez · made with too much coffee</p>
      </footer>
    </div>
  );
}
