import React from 'react';
import { Lightbulb, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-serif font-semibold text-gray-800">
            AI Thesis Title Generator
          </h1>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Lightbulb className="h-5 w-5 text-amber-500 mr-1" />
          <span>Inspire your research</span>
        </div>
      </div>
    </header>
  );
};