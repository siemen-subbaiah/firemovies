import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { instance } from '../../requests/instance';
import notFound from '../../images/not-found.jpg';

const PopularMoives = ({ searchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPopular = async () => {
      try {
        setLoading(true);
        const res = await instance.get(
          `/movie/popular?api_key=7bb9de4c4ddfeae200c8d563ee7c4f3f&language=en-US`
        );
        setMovies(res.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPopular();
  }, []);

  return (
    <div className='popular'>
      {loading ? <h4 className='text-center'>Loading...</h4> : null}
      <Row>
        {searchMovies && searchMovies.length > 0 ? (
          searchMovies.map((item, i) => {
            const img = item.poster_path
              ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
              : notFound;

            return (
              <Col key={i} lg={3} md={6} className='my-3'>
                <Link to={`/movie/${item.id}`} className='card'>
                  <img src={img} alt={item.title} className='img-fluid' />
                  <p className='my-2 text-center'>{item.title}</p>
                </Link>
              </Col>
            );
          })
        ) : (
          <>
            <h4 className='text-center my-4'>Popular Movies</h4>
            {movies.map((item, i) => {
              return (
                <Col key={i} lg={3} md={6} className='my-3'>
                  <Link to={`/movie/${item.id}`} className='card'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      alt={item.title}
                      className='img-fluid'
                    />
                    <p className='my-2 text-center'>{item.title}</p>
                  </Link>
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </div>
  );
};

export default PopularMoives;
