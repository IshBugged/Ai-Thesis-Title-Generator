import React from 'react';
import { Heart } from 'lucide-react';

interface TitleListProps {
  titles: string[];
  favorites: string[];
  onFavorite: (title: string) => void;
}

export const TitleList: React.FC<TitleListProps> = ({ titles, favorites, onFavorite }) => {
  return (
    <ul className="space-y-3">
      {titles.map((title, index) => (
        <li
          key={index}
          className="p-3 border border-gray-100 rounded-md hover:border-gray-200 transition-colors bg-gray-50"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-serif text-lg text-gray-800">{title}</p>
            </div>
            <button
              onClick={() => onFavorite(title)}
              className="flex-shrink-0 ml-2"
              aria-label={favorites.includes(title) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-5 w-5 ${
                  favorites.includes(title)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};