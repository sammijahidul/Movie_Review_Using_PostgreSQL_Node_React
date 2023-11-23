import React from 'react'
import MovieCard from '../components/MovieCard';
import AddMovie from '../components/AddMovie';
import AddUser from '../components/AddUser';

const Home = () => {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddUser />
        <AddMovie />
      </div>
      <MovieCard />
    </>
  )
}

export default Home;