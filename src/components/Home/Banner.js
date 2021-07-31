import { Carousel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { instance } from '../../requests/instance';
import { Link } from 'react-router-dom';

const Banner = ({ url }) => {
  const [moives, setMovies] = useState([]);
  const [shuffled, setShuffled] = useState([]);
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

  useEffect(() => {
    setShuffled(moives.sort(() => 0.5 - Math.random()).slice(0, 3));
  }, [moives]);

  return (
    <>
      {loading ? <h4 className='text-center my-3'>Loading...</h4> : null}
      <Carousel fade>
        {shuffled.map((item) => {
          return (
            <Carousel.Item key={item.id}>
              <div className='banner p-lg-3 px-2'>
                <Row className='justify-content-center align-items-center'>
                  <Col
                    lg={6}
                    className='banner-det order-2 order-lg-1 py-2 py-lg-0'
                  >
                    <h2 className='my-3'>{item.title}</h2>
                    <p className='my-3'>{item.overview.substr(0, 150)}...</p>
                    <Link to={`/movie/${item.id}`}>
                      <button className='btn my-btn'>Read More</button>
                    </Link>
                  </Col>
                  <Col lg={6} className='my-flex order-1 order-lg-2'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                      alt={item.title}
                    />
                  </Col>
                </Row>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default Banner;
