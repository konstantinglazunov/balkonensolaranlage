import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const GITHUB_REPO_NAME = "BalkonenSolaranlage";
const isGithubActionsBuild = process.env.GITHUB_ACTIONS === "true";

// https://vite.dev/config/
export default defineConfig({
  base: isGithubActionsBuild ? `/${GITHUB_REPO_NAME}/` : '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
