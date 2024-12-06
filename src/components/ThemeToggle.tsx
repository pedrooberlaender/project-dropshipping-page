import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useMenu } from '../contexts/MenuContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { isNearFooter } = useScrollPosition();
  const { isMenuOpen } = useMenu();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed right-3 sm:right-6 p-2 sm:p-3 
                rounded-xl sm:rounded-2xl
                bg-white/60 dark:bg-slate-800/40
                text-slate-700 dark:text-slate-200
                shadow-sm hover:shadow-lg dark:shadow-slate-900/10
                border border-white/20 dark:border-slate-700/30
                backdrop-blur-[2px] hover:backdrop-blur-[8px]
                transition-all duration-300 ease-in-out
                hover:bg-white/80 dark:hover:bg-slate-800/60
                hover:-translate-y-0.5 hover:scale-105
                active:translate-y-0 active:scale-100
                focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-400/30
                group
                z-[100]
                ${isMenuOpen ? 'bottom-24 sm:bottom-28' : 'bottom-2 sm:bottom-6'}
                ${isNearFooter ? 'sm:opacity-100 opacity-0 pointer-events-none sm:pointer-events-auto' : 'opacity-100 pointer-events-auto'}`}
      aria-label="Toggle theme"
    >
      <div className="relative">
        {theme === 'light' ? (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 
                          text-indigo-600/80 dark:text-indigo-400/80
                          transition-transform duration-500 ease-in-out
                          rotate-0 group-hover:rotate-[360deg]" />
        ) : (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 
                          text-indigo-600/80 dark:text-indigo-400/80
                          transition-transform duration-500 ease-in-out
                          rotate-0 group-hover:rotate-[360deg]" />
        )}
      </div>
    </button>
  );
}
