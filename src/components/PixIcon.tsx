import React from 'react';

const PixIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 48L48 256l208 208 208-208L256 48zm0 40l168 168-168 168-168-168L256 88z"/>
    <path d="M256 128L128 256l128 128 128-128L256 128zm0 40l88 88-88 88-88-88L256 168z"/>
  </svg>
);

export default PixIcon;
