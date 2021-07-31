const requests = {
  fetchTrending: `/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  fetchBoxOffice: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=revenue.desc&page=1`,
  fetchPopular: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
};

export default requests;
