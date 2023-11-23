import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { BiLike, BiDislike } from "react-icons/bi";


const MovieCard = () => {
  const [movies, setMovies] = useState([]);

  const getAllMovies = async () => {
    try {
      const { data } = await axios.get('http://localhost:2001/api/v1/movie/fetch/movies')
      console.log(data);
      setMovies(data.data.movies);    
    } 
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllMovies();

  }, []);

  return (
    <div>
      <h1 className='text-center'>Movie List</h1>
      <div className='movie-list'>
        {movies.map((movie) => (
          <div key={movie.id} className='movie-card'>
            <div className='movie-details'>
              <h2>{movie.title}</h2>
              <div className='rating-likes-dislikes'>
                <p>Released Year: {movie.released_year}</p>
                <p>Average Rating: {movie.averageRating}</p>
                <div className='likes-dislikes'>
                  <p><BiLike /> {movie.likes}</p>
                  <p><BiDislike /> {movie.dislikes}</p>
                </div>
              </div>     
              <Link to={`/movie/${movie.id}`}>
                <button className='btn btn-primary'>See Details</button>
              </Link>
            </div>
          </div>  
        ))}
      </div>
    </div> 
  )
}

export default MovieCard