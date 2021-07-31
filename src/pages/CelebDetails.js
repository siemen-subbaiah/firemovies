import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import { instance } from '../requests/instance';
import notFound from '../images/not-found.jpg';

const CelebDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPerson = async () => {
      try {
        const res = await instance.get(
          `/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=images,external_ids`
        );
        setPerson(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadPerson();
  }, [id]);

  const img = person?.profile_path
    ? `https://image.tmdb.org/t/p/w500/${person?.profile_path}`
    : notFound;

  return (
    <Container className='celeb my-3'>
      {loading ? (
        <h3 className='text-center'>Loading...</h3>
      ) : (
        <>
          <Row className='align-items-center'>
            <Col lg={6}>
              <img src={img} alt={person.name} className='img-fluid' />
              <div className='social my-3'>
                {person.external_ids.facebook_id && (
                  <a
                    href={`https://www.facebook.com/${person.external_ids.facebook_id}`}
                    className='text-dark h3 me-3'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <FaFacebookSquare />
                  </a>
                )}
                {person.external_ids.instagram_id && (
                  <a
                    href={`https://www.instagram.com/${person?.external_ids?.instagram_id}`}
                    className='text-dark h3 me-3'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <FaInstagram />
                  </a>
                )}
                {person.external_ids.twitter_id && (
                  <a
                    href={`https://twitter.com/${person?.external_ids?.twitter_id}`}
                    className='text-dark h3 me-3'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <FaTwitter />
                  </a>
                )}
              </div>
            </Col>
            <Col lg={6} className='celeb-det '>
              <h4 className='my-3'>Name : {person.name}</h4>
              <p>
                {' '}
                <strong>Birth place :</strong>{' '}
                {person.place_of_birth ? person.place_of_birth : '-'}
              </p>
              <p>
                {' '}
                <strong> Profession :</strong> {person.known_for_department}
              </p>
              <p>
                {' '}
                <strong> DOB :</strong>{' '}
                {person.birthday ? person.birthday : '-'}
              </p>
              <p className='bio'>
                {' '}
                <strong> Biography :</strong> {person.biography.substr(0, 500)}
                ...
              </p>
              <a
                href={`https://www.imdb.com/name/${person.imdb_id}/`}
                className='btn my-btn'
                target='_blank'
                rel='noreferrer'
              >
                IMDB Profile
              </a>
            </Col>
          </Row>

          <div className='celeb-gallery my-5'>
            <h3 className='text-center my-5'>Gallery</h3>
            <Row>
              {person.images?.profiles?.map((profile, i) => {
                const img = profile.file_path
                  ? `https://image.tmdb.org/t/p/w500/${profile?.file_path}`
                  : notFound;
                return (
                  <Col lg={3} key={i}>
                    <img
                      src={img}
                      alt={person.name}
                      className='gallery-img my-2 my-lg-0'
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default CelebDetails;
