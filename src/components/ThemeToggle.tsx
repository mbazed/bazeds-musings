import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    console.log("Resolved theme:", resolvedTheme);
  }, [resolvedTheme]);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-1 rounded-4xl border-2 border-transparent hover:border-gray-500 dark:hover:border-yellow-500 focus:outline-none cursor-pointer"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-500" />
      ) : (
        <Moon className="h-6 w-6 text-gray-900" />
      )}
    </button>
  );
};

export default ThemeToggle;
