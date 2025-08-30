import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../api/movies-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from '../HomePage/HomePage.module.css';


export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getTrendingMovies();
        setTrending(response);
      } catch  {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList films={trending} />
    </div>
  );
}
