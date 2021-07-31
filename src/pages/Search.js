import PopularMoives from '../components/Search/PopularMoives';
import {
  Container,
  Button,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { instance } from '../requests/instance';

const Search = () => {
  const [movies, setMovies] = useState();
  const [text, setText] = useState(
    localStorage.getItem('search') === null
      ? ''
      : localStorage.getItem('search')
  );

  useEffect(() => {
    localStorage.setItem('search', text);
  }, [text]);

  const handleHistory = async () => {
    try {
      const res = await instance.get(
        `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${text}&page=1&include_adult=true`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleHistory();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      handleHistory();
    } else {
      alert('enter search term!');
    }
  };

  return (
    <Container className='my-3'>
      <Form className='my-4' onSubmit={handleSubmit}>
        <InputGroup className='mb-3'>
          <FormControl
            placeholder='search movies..'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type='submit' className='my-btn'>
            search
          </Button>
        </InputGroup>
      </Form>
      {movies && movies.length === 0 ? (
        <h4 className='text-center'>No movies found!</h4>
      ) : (
        ''
      )}
      <PopularMoives searchMovies={movies} />
    </Container>
  );
};

export default Search;
