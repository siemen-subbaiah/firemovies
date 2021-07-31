import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

const FavMovies = ({ loading }) => {
  const movies = useSelector(({ liked }) => liked.movies);

  const handleDelete = (id) => {
    db.collection('likes').doc(id).delete();
  };

  return (
    <>
      {loading ? (
        <h3 className='text-center'>Loading...</h3>
      ) : movies.length === 0 ? (
        <h4 className='text-center'>
          No Favourite movies in your list! Add em now.
        </h4>
      ) : (
        movies.map((movie, i) => {
          return (
            <div className='my-4 favs' key={i}>
              <div className='d-flex justify-content-center align-items-center flex-column flex-lg-row'>
                <img src={movie.image} alt={movie.name} className='img-fluid' />
                <div className='favs-details p-3'>
                  <h5>{movie.name}</h5>
                  <p className='my-3'>{movie.overview}</p>
                  <div className='d-l'>
                    <Link to={`/movie/${movie.movieId}`}>
                      <button className='btn btn-outline-success me-3'>
                        Details
                      </button>
                    </Link>
                    <button
                      className='btn my-btn'
                      onClick={() => handleDelete(movie.firebaseId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default FavMovies;
