import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './form.css'




const Form = ({onSubmit}) => {
    
    
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, 
        getValues,
        reset
      } = useForm();
    
    
    
    
      const handlePost = () => {
        const userData = getValues()
        axios
          .post('https://jsonplaceholder.typicode.com/users', userData)
          .then((res) => {
            console.log(res.data)
            onSubmit(userData)
            reset();
          })
          .catch((err) => console.log(err));
      };
    


  return (
    <div>

        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit(handlePost)}>
            <label>Title</label> <br />
            <input
              placeholder="Enter Title"
              type="text"
              {...register('name', {
                required: 'Title is required',
                minLength: {
                  value: 10,
                  message: 'Title must be at least 10 letters'
                }
              })}
            />
            {errors.name && <p>{errors.name.message}</p>} 

            <label>Content</label> <br />
            <input
              placeholder="Enter Content"
              type="text"
              {...register('username', {
                required: 'Content is required',
                minLength: {
                  value: 10,
                  message: 'Content must be at least 10 letters'
                }
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}

            <button className="submitBtn" type="submit" disabled={isSubmitting}>
              POST
            </button>
            
          </form>
        </div>
      
    </div>
  )
}

export default Form
