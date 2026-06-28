import React from "react";
import { siGithub, siX } from "simple-icons/icons";
import ThemeToggle from "./ThemeToggle";

const Footer: React.FC = () => {
  return (
    <footer
      className="w-full border-t px-6 py-4 mt-16"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-subtle)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-row items-center justify-between">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          ♥
        </p>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <a
            href="https://github.com/mbazed"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1.5 rounded-full border border-transparent transition-all duration-200 hover:border-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
            >
              <title>GitHub</title>
              <path d={siGithub.path} />
            </svg>
          </a>
          <a
            href="https://twitter.com/mbazedali"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="p-1.5 rounded-full border border-transparent transition-all duration-200 hover:border-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
            >
              <title>Twitter</title>
              <path d={siX.path} />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
