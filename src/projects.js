// Add a new project = add an object here. That's the whole workflow.
// status: "live" | "building" | "idea"
export const projects = [
  {
    name: "ndeals",
    description:
      "Nintendo eShop discount tracker — live deals from Nintendo's public APIs, prices across European stores.",
    status: "live",
    tags: ["react", "daisyui", "cloudflare-workers"],
    url: "https://ndeals.edgarmartinez.workers.dev",
    repo: "https://github.com/edgarmartinez-dev/ndeals",
    color: "#E60012",
  },
  {
    name: "Project One",
    description: "A fun little experiment. Replace me with a real project.",
    status: "live",
    tags: ["react", "vite"],
    url: "#",
    repo: "#",
    color: "#FF5D73",
  },
  {
    name: "Project Two",
    description: "Something with Supabase behind it, probably.",
    status: "building",
    tags: ["react", "supabase"],
    url: "#",
    repo: "#",
    color: "#FFB800",
  },
  {
    name: "Project Three",
    description: "An idea waiting for a rainy weekend.",
    status: "idea",
    tags: ["game"],
    url: "#",
    repo: "#",
    color: "#00C2A8",
  },
  {
    name: "Project Four",
    description: "Placeholder for the next fun thing.",
    status: "idea",
    tags: ["tbd"],
    url: "#",
    repo: "#",
    color: "#7C5CFF",
  },
];
