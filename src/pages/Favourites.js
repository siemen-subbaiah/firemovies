import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AccountIntro from '../components/Account/AccountIntro';
import FavMovies from '../components/Favourites/FavMovies';
import { addMovies } from '../features/likedmovies/likedMoviesReducer';
import { db } from '../firebase';

const Favourites = () => {
  const user = useSelector(({ auth }) => auth.user);

  const [loading, setLoading] = useState(true);

  const uid = user?.uid ? user?.uid : '';
  const dispatch = useDispatch();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        await db
          .collection('likes')
          .orderBy('timeStamp', 'desc')
          .where('uid', '==', uid)
          .onSnapshot((snapshot) => {
            let info = [];
            snapshot.forEach((item) => {
              info.push({
                firebaseId: item.id,
                movieId: item.data().id,
                image: item.data().image,
                name: item.data().name,
                overview: item.data().overview,
                uid: item.data().uid,
              });
            });
            dispatch(addMovies(info));
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    loadMovies();
    return () => loadMovies();
  }, [dispatch, uid]);

  return (
    <Container className='my-4'>
      {user ? <FavMovies loading={loading} /> : <AccountIntro />}
    </Container>
  );
};

export default Favourites;
