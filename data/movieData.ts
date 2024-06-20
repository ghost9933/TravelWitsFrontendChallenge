// data/movieData.ts
import { Movie } from '../interfaces/movie';

const movieData: Movie[] = [
  { id: 1, title: "The Matrix", rating: 7.5, category: "Action" },
  { id: 2, title: "Focus", rating: 6.9, category: "Comedy" },
  { id: 3, title: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { id: 4, title: "Everly", rating: 5.0, category: "Action" },
  { id: 5, title: "Maps to the Stars", rating: 7.5, category: "Drama" }
];

export { movieData };
export default movieData;
