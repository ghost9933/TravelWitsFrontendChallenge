// pages/index.tsx
'use client';

// pages/index.tsx
import React from 'react';
import SearchBox from '../components/SearchBox';
import movieData from '../data/movieData';
import styles from '../styles/Home.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <SearchBox movies={movieData} />
    </div>
  );
};

export default HomePage;
