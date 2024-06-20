// components/Star.tsx
import React from 'react';

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "black" : "none"} stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15 8.5 22 9 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9 9 8.5 12 2"></polygon>
  </svg>
);

export default Star;
