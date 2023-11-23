import React, { useState } from 'react';
import {FaUser} from 'react-icons/fa'

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    try {
        
    } 
    catch (error) {
        
    }
  }
  return (
    <>
    <button 
      type="button" 
      className="btn btn-outline-primary" 
      data-bs-toggle="modal" 
      data-bs-target="#addUserModal"
    >
        <div className='d-flex align-items-center'>
            <FaUser className='icon' />
            <div>Add User</div>
        </div>
    </button>

    <div 
        className="modal fade" 
        id="addUserModal" 
        aria-labelledby="addUserModalLabel" 
        aria-hidden="true"
    >
                
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title fs-5" id="addUserModalLabel">
                      Add User
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
                            <label className='form-label'>Name</label>
                            <input 
                              type='text' 
                              className='form-control' 
                              id='name'
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input 
                              className='form-control' 
                              type='email'
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Role</label>
                            <select 
                              className='form-control' 
                              type='user-type'
                              value={role} 
                              onChange={(e) => setRole(e.target.value)}
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

export default AddUser