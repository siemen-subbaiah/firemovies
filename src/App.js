import React, { useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Favourites from './pages/Favourites';
import Account from './pages/Account';
import About from './pages/About';
import Error from './pages/Error';
import MovieDetails from './pages/MovieDetails';
import CelebDetails from './pages/CelebDetails';
import { useDispatch } from 'react-redux';
import { userIsFalse, userIsTrue } from './features/auth/authReducer';
import { auth } from './firebase';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          userIsTrue({
            displayName: authUser.displayName,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
      } else {
        dispatch(userIsFalse());
      }
    });
    return () => unSubscribe();
  }, [dispatch]);

  console.log(process.env.REACT_APP_FIREBASE_API_KEY);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/search' component={Search} />
        <Route path='/favourites' component={Favourites} />
        <Route path='/account' component={Account} />
        <Route path='/about' component={About} />
        <Route path='/movie/:id' component={MovieDetails} />
        <Route path='/celeb/:id' component={CelebDetails} />
        <Route path='*' component={Error} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
