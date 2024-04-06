import React, { useState, useEffect } from 'react';
import Form from './Components/Form/form'
import axios from 'axios';
import './App.css';

const App = () => {
  

  
  const [getData, setGetData] = useState([]);


  function handleSubmit(data){
    setGetData(prevData => {
        return [...prevData, data]
    })
  }
  
  


  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(id) {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setGetData((prevData) => prevData.filter((user) => user.id !== id)))
      .catch((err) => console.log(err));
  }

  function handleEdit(id) {
    const formData = {
        name: 'Farid'
    }
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, formData)
      .then((res) => {
        setGetData((prevData) => {
          return prevData.map((user) => {
            if (user.id === id) {
              return { ...res.data };
            }
            return user;
          });
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="container">
        <div className="content">
          {getData.map((user, i) => (
            <div className="post" key={i}>
              <h1>{user.name}</h1>
              <p>{user.username}</p>
              <div className="buttons">
                <button onClick={() => handleEdit(user.id)}>EDIT</button>
                <button onClick={() => handleDelete(user.id)}>DELETE</button>
              </div>
            </div>
          ))}
        </div>

        <Form onSubmit={handleSubmit} />
        
      </div>
    </>
  );
};

export default App;
