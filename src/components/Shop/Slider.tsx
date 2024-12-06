import React from 'react';
import ReactSlider from 'react-slider';

interface SliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

export function Slider({ min, max, value, onChange, formatValue }: SliderProps) {
  return (
    <ReactSlider
      className="h-3 w-full"
      thumbClassName="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 -mt-1.5 transition-colors duration-300 hover:scale-110"
      trackClassName="h-3 bg-slate-200 dark:bg-slate-700 rounded-full [&.slider-track-1]:bg-indigo-600 dark:[&.slider-track-1]:bg-indigo-500 transition-colors duration-300"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      minDistance={10}
      pearling
    />
  );
}