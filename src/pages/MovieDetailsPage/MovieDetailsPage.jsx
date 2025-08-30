import { useEffect, useState, useRef, Suspense } from 'react';
import {
  useLocation,
  useParams,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { getMovieById } from '../../api/movies-api';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { GoArrowLeft } from 'react-icons/go';
import StarRating from '../../components/StarRating/StarRating';
import ScrollToTop from 'react-scroll-to-top';

export default function MovieDetailsPage() {
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getMovieById(movieId);
        setDetails(response);

        const img = `https://image.tmdb.org/t/p/w500${response.backdrop_path}`;
        setImage(img);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  let genres = null;
  if (details.genres) {
    genres = details.genres.map((genre) => {
      return <span key={genre.id}>{genre.name}</span>;
    });
  }

  return (
    <div className={css.div}>
      <Link to={goBackRef.current} className={css.link}>
        <GoArrowLeft />
        <span>Go back</span>
      </Link>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <div className={css.divInfo}>
        <img src={image} alt={details.title} className={css.img} />
        <div className={css.divText}>
          <div className={css.text}>
            <h1>
              {details.title} (
              {details.release_date && details.release_date.slice(0, 4)})
            </h1>
            <p>User Score: {<StarRating rating={details.vote_average} />}</p>
          </div>

          <div className={css.text}>
            <h2>Overview</h2>
            <p>{details.overview}</p>
          </div>

          <div className={css.text}>
            <h3>Genres</h3>
            <p className={css.span}>{genres}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className={css.addInfo}>
        <h3 className={css.h3}>Additional info</h3>

        <div className={css.text}>
          <NavLink to="cast" className={css.navLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={css.navLink}>
            Reviews
          </NavLink>
        </div>
      </div>

      <ScrollToTop
        smooth
        style={{
          backgroundColor: '#ffb300cd',
          color: '#2a2724ca',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          lineHeight: '50px',
          textAlign: 'center',
          margin: '0px',
          bottom: '14px',
          right: '14px',
          fontSize: '16px',
        }}
        component={<span>UP</span>}
      />
      <hr />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
