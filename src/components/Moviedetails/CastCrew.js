import React from 'react';
import { Link } from 'react-router-dom';

const CastCrew = ({ movie }) => {
  return (
    <div className='cast-crew my-5'>
      <h4>CAST</h4>
      <div className='scrollable-card my-3 d-flex'>
        {movie?.credits?.cast?.slice(0, 10).map((item, i) => {
          const img = item.profile_path
            ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
            : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

          return (
            <Link to={`/celeb/${item.id}`} key={i}>
              <div className='movie-card'>
                <img src={img} alt={item.name} />
                <h5 className='mt-3'>{item.name}</h5>
                <p>{item.character}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <h4 className='my-5'>CREW</h4>
      <div className='scrollable-card my-3 d-flex'>
        {movie?.credits?.crew?.slice(0, 10).map((item, i) => {
          const img = item.profile_path
            ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
            : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

          return (
            <Link to={`/celeb/${item.id}`} key={i}>
              <div className='movie-card'>
                <img src={img} alt={item.name} />
                <h5 className='mt-3'>{item.name}</h5>
                <p>{item.job}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CastCrew;
