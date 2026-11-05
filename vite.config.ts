import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Hosts allowed to reach the dev/preview server (a leading dot allows all subdomains)
const allowedHosts = ["localhost", ".onrender.com"];

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // Hosting platforms often set NODE_ENV=production globally. If the dev server
  // (`vite`) runs with it, React's production runtime is loaded while JSX is
  // compiled for development → "_jsxDEV is not a function". Keep them in sync.
  process.env.NODE_ENV = command === "build" && mode === "production" ? "production" : "development";

  return {
  base: "/",
  server: {
    host: "::",
    port: 8080,
    allowedHosts,
    hmr: {
      overlay: false,
    },
  },
  // `vite preview` (serves the production build) — Render provides the port in $PORT
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4173,
    allowedHosts,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
