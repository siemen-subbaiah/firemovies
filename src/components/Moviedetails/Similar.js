import React from 'react';
import { Link } from 'react-router-dom';

const Similar = ({ movie }) => {
  return (
    <div className='similar my-5'>
      <h4 className='my-4'>Similar</h4>
      <div className='d-flex flex-column flex-lg-row'>
        {movie?.similar?.results?.slice(0, 6).map((item, i) => {
          return (
            <Link
              to={`/movie/${item.id}`}
              key={i}
              className='me-2 my-2 my-lg-0'
              onClick={window.scrollTo(0, 0)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title}
                className='img-fluid'
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Similar;
