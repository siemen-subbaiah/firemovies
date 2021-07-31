import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../images/logo.png';

const About = () => {
  return (
    <Container className='my-5 about'>
      <div className='text-center'>
        <img src={logo} alt='logo' />
      </div>
      <Row className='justify-content-center align-items-center about-stuff'>
        <Col lg={6} className='my-4 my-lg-5'>
          <img
            src='https://miro.medium.com/max/1200/1*yjH3SiDaVWtpBX0g_2q68g.png'
            alt='react'
            className='img-fluid'
          />
        </Col>
        <Col lg={6} className='my-2 my-lg-5'>
          <h4>Used React in the frontend.</h4>
          <p className='my-3'>
            React JS is a JavaScript library for building user interfaces
          </p>
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center about-stuff'>
        <Col lg={6} className='my-3 my-lg-5 order-2 order-lg-1'>
          <h4>Used Firebase for storing movies,authentication.</h4>
          <p className='my-3'>
            Firebase is a platform developed by Google for creating mobile and
            web apps.
          </p>
        </Col>
        <Col
          lg={6}
          className='my-2 my-lg-5 d-flex justify-content-end order-1 order-lg-2'
        >
          <img
            src='https://firebase.google.com/images/social.png'
            alt='firebase'
            className='img-fluid'
          />
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center about-stuff'>
        <Col lg={6} className='my-3 my-lg-5'>
          <img
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
            alt='tmdbImg'
            className='img-fluid'
          />
        </Col>
        <Col lg={6} className='my-3 my-lg-5'>
          <h4>Used TMDB For Fetching all the movies.</h4>
          <p className='my-3'>
            The Movie Database (TMDb) is a popular, user editable database for
            movies and TV shows.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
