import React from 'react';
import { Github, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} AI Thesis Title Generator</p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors flex items-center"
            >
              <Github className="h-4 w-4 mr-1" />
              <span className="text-sm">GitHub</span>
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors flex items-center"
            >
              <Code className="h-4 w-4 mr-1" />
              <span className="text-sm">API</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};