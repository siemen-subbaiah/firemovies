import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { instance } from '../../requests/instance';
import moment from 'moment';

const TrendingBox = ({ title, url }) => {
  const [moives, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrending = async () => {
      try {
        setLoading(true);

        const res = await instance.get(url);
        setMovies(res.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTrending();
  }, [url]);

  return (
    <div className='trending my-5'>
      <h3>
        {title} <span className='color'>Movies</span>
      </h3>
      {loading ? <h4 className='text-center my-3'>Loading...</h4> : null}
      <div className='scrollable-card my-3 d-flex'>
        {moives?.map((item) => {
          return (
            <Link to={`/movie/${item?.id}`} key={item?.id}>
              <div className='movie-card'>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                  alt={item?.title}
                />
                <h5 className='mt-3'>{item?.title}</h5>
                <p>{moment(item?.release_date).format('MMMM Do YYYY')}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingBox;
