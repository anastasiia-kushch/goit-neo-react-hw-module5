import { Link, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';
import StarRating from '../StarRating/StarRating';
import ScrollToTop from 'react-scroll-to-top';

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <div>
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
      <ul className={css.list}>
        {films.map((film) => {
          return (
            <li key={film.id} className={css.item}>
              <Link
                to={`/movies/${film.id}`}
                state={location}
                className={css.link}
              >
                {
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      film.backdrop_path || film.poster_path
                    }`}
                    alt={film.title}
                    className={css.image}
                  />
                }

                {film.title}
                {<StarRating rating={film.vote_average} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
