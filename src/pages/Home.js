import React from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../components/Home/Banner';
import Genres from '../components/Home/Genres';
import TrendingBox from '../components/Home/TrendingBox';
import requests from '../requests';

const Home = () => {
  return (
    <Container className='my-3'>
      <Banner url={requests.fetchTrending} />
      <TrendingBox title='Trending' url={requests.fetchTrending} />
      <TrendingBox title='Box Office #1' url={requests.fetchBoxOffice} />
      <Genres />
    </Container>
  );
};

export default Home;
