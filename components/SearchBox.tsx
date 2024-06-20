import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchBox.module.css';

interface Movie {
  id: string;
  title: string;
  rating: number;
  category: string;
}

const moviesData: Movie[] = [
  { id: '1', title: "The Matrix", rating: 7.5, category: "Action" },
  { id: '2', title: "Focus", rating: 6.9, category: "Comedy" },
  { id: '3', title: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { id: '4', title: "Everly", rating: 5.0, category: "Action" },
  { id: '5', title: "Maps to the Stars", rating: 7.5, category: "Drama" }
];

const Star = ({ filled }: { filled: boolean }) => (
  <span style={{ color: filled ? 'black' : 'gray' }}>★</span>
);

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [ratingFilters, setRatingFilters] = useState<number[]>([]);
  const [genreFilters, setGenreFilters] = useState<string[]>([]);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  useEffect(() => {
    const results = moviesData.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (ratingFilters.length === 0 || ratingFilters.some(rating => movie.rating >= rating)) &&
      (genreFilters.length === 0 || genreFilters.includes(movie.category))
    );
    setFilteredMovies(results);
  }, [searchTerm, ratingFilters, genreFilters]);

  const handleRatingChange = (rating: number) => {
    setRatingFilters(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleGenreChange = (genre: string) => {
    setGenreFilters(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(<Star key={i} filled={i <= rating}  />);
    }
    return stars;
  };

  const toggleRatingDropdown = () => {
    
    setShowRatingDropdown(prev => !prev);
    setShowGenreDropdown(false); // Ensure only one dropdown is open at a time
  };

  const toggleGenreDropdown = () => {
    setShowGenreDropdown(prev => !prev);
    setShowRatingDropdown(false); // Ensure only one dropdown is open at a time
  };
  const renderArrow = (isOpen: boolean): JSX.Element => {
    return isOpen ? 
      (<svg style={{ marginLeft: 'auto' }} width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 15L12 9L18 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>) : 
      (<svg style={{ marginLeft: 'auto' }} width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  };
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Enter movie name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       {/* <div className={styles.dropdownsContainer}> */}
      <div className={styles.dropdown} onClick={() => toggleRatingDropdown()}>
        Rating {renderArrow(showRatingDropdown)} 
        {showRatingDropdown && (
          <div className={styles.dropdownContent}>
            {Array.from({ length: 10 }, (_, i) => { 
              const rating = i + 1;
              return (
                <label key={rating}>
                  <input
                    type="checkbox"
                    checked={ratingFilters.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {'★'.repeat(rating) + '☆'.repeat(10 - rating)}
                </label>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.dropdown} onClick={() =>toggleGenreDropdown ()}>
        Genre {renderArrow(showRatingDropdown)} 
        {showGenreDropdown && (
          <div className={styles.dropdownContent}>
            {['Action', 'Comedy', 'Drama', 'Thriller'].map(genre => (
              <label key={genre}>
                <input
                  type="checkbox"
                  checked={genreFilters.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
  {searchTerm && (
    <ul className={styles.results}>
      {filteredMovies.length > 0 ? (
        filteredMovies.map(movie => (
          <li key={movie.id} className={styles.resultItem}>
            <div className={styles.movieHeader}>
              <span className={styles.movieTitle}>{movie.title}</span>
              <span className={styles.movieGenre}>{movie.category}</span>
            </div>
            <div className={styles.movieRating}>
              {renderStars(movie.rating)}
            </div>
          </li>
        ))
      ) : (
        <li className={styles.resultItem}>
          <div className={styles.noResults}>No movies found.</div>
        </li>
      )}
    </ul>
  )}
</div>
    </div>
    // </div>
  );
};

export default SearchBox;
