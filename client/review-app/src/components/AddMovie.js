import React, {useState, useEffect} from 'react';
import { FcClapperboard } from "react-icons/fc";
import axios from 'axios';

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [released_year, setReleased_Year] = useState("");
  
  const onSubmit = async (e)=> {
    e.preventDefault();

    try {
        const newMovie = {
            title,
            released_year
        };
        const response = await axios.post('http://localhost:2001/api/v1/movie/create', newMovie)
        console.log(response.data);

        setTitle("");
        setReleased_Year("");        
    } 
    catch (error) {
        console.error(error)
    }
  } 

  return (
    <>
        <button 
          type="button" 
          className="btn btn-outline-info" 
          data-bs-toggle="modal" 
          data-bs-target="#addMovieModal"
        >
            <div className='d-flex align-items-center'>
                <FcClapperboard className='icon' />
                <div>Add Movie</div>
            </div>
        </button>

        <div 
            className="modal fade" 
            id="addMovieModal" 
            aria-labelledby="addMovieModalLabel" 
            aria-hidden="true"
        >
                    
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id="addMovieModalLabel">
                          Add Movie
                        </h5>
                        <button 
                          type="button" 
                          className="btn-close" 
                          data-bs-dismiss="modal" 
                          aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Title</label>
                                <input 
                                  type='text' 
                                  className='form-control' 
                                  id='name'
                                  value={title} 
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Released Year</label>
                                <input 
                                  className='form-control' 
                                  id='year'
                                  value={released_year} 
                                  onChange={(e) => setReleased_Year(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit" 
                                data-bs-dismiss="modal" 
                                className='btn btn-primary'
                                >
                                    Submit
                            </button>
                          </form>
                    </div>          
                    </div>
                </div>
                </div>

    </>
  )
}

export default AddMovie