import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

const Info = ({ movie }) => {
  const [validateMovie, setValidateMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [loginAlert, setloginAlert] = useState(false);

  const img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
    : 'https://www.omao.noaa.gov/sites/all/themes/noaa_omao/images/video-placeholder-640.jpg';

  const ratingColor = () => {
    if (movie.vote_average > 7) {
      return 'green';
    } else if (movie.vote_average >= 4 && movie.vote_average <= 7) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  // NEW JS METHOD 😎
  function moneyFormatter(num) {
    const formatter = Intl.NumberFormat('en', {
      notation: 'compact',
      style: 'currency',
      currency: 'usd',
    });
    return formatter.format(num);
  }

  const user = useSelector(({ auth }) => auth.user);

  const handleLikes = async () => {
    if (user) {
      try {
        setSuccess(true);
        await db.collection('likes').add({
          id: movie.id,
          image: img,
          name: movie.original_title,
          overview: movie.overview,
          uid: user.uid,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
        setSuccess(false);
      }
    } else {
      setloginAlert(true);
    }
  };

  const uid = user?.uid ? user?.uid : '';

  useEffect(() => {
    const validate = async () => {
      try {
        await db
          .collection('likes')
          .where('id', '==', movie.id)
          .where('uid', '==', uid)
          .onSnapshot((snapshot) => {
            let mv = [];
            snapshot.forEach((item) => mv.push(item.data()));
            setValidateMovie(mv);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    validate();
  }, [movie.id, uid]);

  return (
    <div className='info'>
      <div className='banner ps-0 my-3 ps-lg-2 d-flex align-items-center flex-column flex-lg-row'>
        <img
          src={img}
          alt={movie.original_title}
          height={280}
          width={550}
          loading='lazy'
          className='my-0 mb-0 my-lg-3 img-fluid'
        />
        <div className='add-det text-center'>
          <div
            className='vote d-none d-lg-block'
            style={{ border: `2px solid ${ratingColor()}` }}
          >
            <span className='fw-bold'>{movie.vote_average.toFixed(1)}</span>
          </div>
          <p className='my-2 d-none d-lg-block'>User Score</p>
          <div className='more-det d-flex justify-content-center mt-4 flex-column flex-lg-row'>
            <div className='me-0 my-2 my-lg-0 me-lg-5'>
              <h6>IMDB Link:</h6>
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                target='_blank'
                rel='noreferrer'
                className='text-decoration-none'
              >
                visit
              </a>
            </div>
            <div className='me-0 my-2 my-lg-0 me-lg-5'>
              <h6>Revenue:</h6>
              <p>{moneyFormatter(movie.revenue)}</p>
            </div>
            <div>
              <h6>Status:</h6>
              <p>{movie.status}</p>
            </div>
          </div>
        </div>
      </div>
      <h4 className='my-2'>{movie.original_title}</h4>
      <div className='facts my-3'>
        <span className='certification'>{movie.adult ? 'A' : 'UA'}</span>
        <span className='release'>
          {moment(movie.release_date).format('DD/MM/YYYY')} &#8226;{' '}
        </span>
        {movie?.genres?.map((genre, i) => (
          <span className='genres' key={i}>
            {genre.name}
            {i < movie.genres.length - 1 ? ', ' : ''}
          </span>
        ))}
        <span>&#8226;</span>
        <span className='runtime'>{movie.runtime}m</span>
      </div>

      {validateMovie.length === 1 ? (
        loading ? (
          <p>loading...</p>
        ) : (
          <Link to='/favourites'>Vist Favourites</Link>
        )
      ) : (
        <button
          className='btn my-btn my-2'
          style={{ cursor: `${user ? 'pointer' : 'not-allowed'}` }}
          onClick={handleLikes}
        >
          <AiOutlineHeart className='like' /> Like
        </button>
      )}
      <Toast
        className='d-none d-lg-block'
        onClose={() => setSuccess(false)}
        show={success}
        delay={3000}
        autohide
      >
        <Toast.Body>Woohoo, movie added to favourites!!</Toast.Body>
      </Toast>

      <Toast
        className='d-none d-lg-block'
        onClose={() => setloginAlert(false)}
        show={loginAlert}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <Link to='/account'>
            <strong className='me-auto'>Login</strong>
          </Link>
        </Toast.Header>
        <Toast.Body>Login to add favourite movies!</Toast.Body>
      </Toast>
      {loginAlert && (
        <Link className='d-lg-none d-block' to='/account'>
          Login to add favourite movies!
        </Link>
      )}
      <p className='my-2'>{movie.overview}</p>
    </div>
  );
};

export default Info;
