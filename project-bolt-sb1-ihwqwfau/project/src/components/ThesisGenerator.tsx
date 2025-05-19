import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Download, Save, Clock, Trash } from 'lucide-react';
import { generateTitles } from '../services/titleGenerator';
import { TitleList } from './TitleList';
import { TitleHistoryItem } from '../types';

export const ThesisGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<TitleHistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTitles');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedHistory = localStorage.getItem('titleHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteTitles', JSON.stringify(favorites));
  }, [favorites]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('titleHistory', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const titles = await generateTitles(topic);
      setGeneratedTitles(titles);
      
      // Add to history
      const historyItem: TitleHistoryItem = {
        id: Date.now().toString(),
        topic,
        titles,
        timestamp: new Date().toISOString()
      };
      
      setHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep only the 10 most recent
    } catch (error) {
      console.error('Error generating titles:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFavorite = (title: string) => {
    setFavorites(prev => {
      if (prev.includes(title)) {
        return prev.filter(t => t !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  const handleDownload = () => {
    if (generatedTitles.length === 0) return;
    
    const content = `
      # Thesis Title Ideas for: ${topic}
      
      Generated on: ${new Date().toLocaleString()}
      
      ${generatedTitles.map((title, index) => `${index + 1}. ${title}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thesis-titles-${topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadFromHistory = (historyItem: TitleHistoryItem) => {
    setTopic(historyItem.topic);
    setGeneratedTitles(historyItem.titles);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">
          Generate Your Perfect Thesis Title
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your research topic below and our AI will generate creative, 
          academically-appropriate thesis titles to inspire your work.
        </p>
      </div>
      
      {/* Input section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Your Research Topic
        </label>
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Artificial Intelligence in Healthcare"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 text-gray-400"
              onClick={() => setShowHistory(!showHistory)}
            >
              <Clock className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className={`
              px-4 py-2 rounded-r-md flex items-center text-white
              ${isGenerating || !topic.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {isGenerating ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5 mr-1" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
        
        {/* History dropdown */}
        {showHistory && (
          <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto w-full max-w-lg">
            <div className="p-2 border-b flex justify-between items-center">
              <h3 className="font-medium text-sm">Recent Searches</h3>
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-red-500 hover:text-red-600 text-xs flex items-center"
                >
                  <Trash className="h-3 w-3 mr-1" />
                  Clear All
                </button>
              )}
            </div>
            {history.length > 0 ? (
              <ul>
                {history.map((item) => (
                  <li 
                    key={item.id} 
                    className="hover:bg-gray-50 cursor-pointer px-3 py-2 border-b text-sm"
                    onClick={() => loadFromHistory(item)}
                  >
                    <p className="font-medium">{item.topic}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 text-sm text-gray-500">No recent searches</div>
            )}
          </div>
        )}
      </div>
      
      {/* Results section */}
      {generatedTitles.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-serif font-semibold text-gray-800">
              Generated Thesis Titles
            </h3>
            <button
              onClick={handleDownload}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>
          
          <TitleList
            titles={generatedTitles}
            favorites={favorites}
            onFavorite={handleFavorite}
          />
        </div>
      )}
      
      {/* Favorites section */}
      {favorites.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Save className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-xl font-serif font-semibold text-gray-800">
              Saved Favorites
            </h3>
          </div>
          
          <TitleList
            titles={favorites}
            favorites={favorites}
            onFavorite={handleFavorite}
          />
        </div>
      )}
    </div>
  );
};