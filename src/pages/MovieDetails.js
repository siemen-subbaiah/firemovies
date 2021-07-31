import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CastCrew from '../components/Moviedetails/CastCrew';
import Info from '../components/Moviedetails/Info';
import Similar from '../components/Moviedetails/Similar';
import { instance } from '../requests/instance';

const MovieDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movie = await instance.get(
          `/movie/${id}?&append_to_response=similar,credits&api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setMovie(movie.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieDetails();
  }, [id]);

  return (
    <Container className='my-3'>
      {loading ? (
        <div className='text-center'>
          <h4>Loading...</h4>
        </div>
      ) : (
        <>
          <Info movie={movie} />
          <CastCrew movie={movie} />
          <Similar movie={movie} />
        </>
      )}
    </Container>
  );
};

export default MovieDetails;
