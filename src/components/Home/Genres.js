import { Form } from 'react-bootstrap';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { instance } from '../../requests/instance';
import notFound from '../../images/not-found.jpg';

const Genres = () => {
  const [moives, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState('28');

  useEffect(() => {
    const getGenres = async () => {
      try {
        setLoading(true);
        const res = await instance.get(
          `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=1&with_genres=${options}`
        );
        setMovies(res.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, [options]);

  const genreTitles = [
    { id: '28', genre: 'Action' },
    { id: '35', genre: 'Comedy' },
    { id: '27', genre: 'Horror' },
    { id: '878', genre: 'Science Fiction' },
    { id: '10749', genre: 'Romantic' },
    { id: '80', genre: 'Crime' },
  ];

  const genreTitle = genreTitles.find((genre) => genre.id === options);

  return (
    <div className='trending my-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>
          {genreTitle.genre} <span className='color'>Movies</span>
        </h3>
        <Form.Select
          className='my-options'
          aria-label='Default select example'
          onChange={(e) => setOptions(e.target.value)}
        >
          <option value='28'>Action Movies</option>
          <option value='35'>Comedy Movies</option>
          <option value='27'>Horror Movies</option>
          <option value='878'>Science Fiction</option>
          <option value='10749'>Romantic Movies</option>
          <option value='80'>Crime Movies</option>
        </Form.Select>
      </div>
      {loading ? <h4 className='text-center my-3'>Loading...</h4> : null}
      <div className='scrollable-card my-3 d-flex'>
        {moives.map((item) => {
          const img = item?.poster_path
            ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`
            : notFound;

          return (
            <Link to={`/movie/${item?.id}`} key={item?.id}>
              <div className='movie-card'>
                <img src={img} alt={item?.title} />
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

export default Genres;
