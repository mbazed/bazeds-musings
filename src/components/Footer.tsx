import React from "react";
import { siGithub, siX } from "simple-icons/icons";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-950 text-center py-3 z-50 border-t border-gray-700 px-6 items-center justify-center">
      <div className="max-w-5xl mx-auto flex flex-row items-center justify-between">
        <p className="text-sm text-gray-900 dark:text-gray-300">🖊️ Mohammed Bazed Ali</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/mbazed"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-gray-600 transition-colors dark:text-gray-300"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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
            className="text-gray-900 hover:text-gray-600 transition-colors dark:text-gray-300"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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
