import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-full p-1.5 border border-transparent hover:border-[var(--accent)] focus:outline-none cursor-pointer transition-all duration-200 hover:bg-[var(--card-hover)]"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-[var(--accent)]" />
      ) : (
        <Moon className="h-5 w-5 text-[var(--text-muted)]" />
      )}
    </button>
  );
};

export default ThemeToggle;
