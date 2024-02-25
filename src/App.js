import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

    const [getData, setGetData] = useState({})



    const dataToPost = {
        id: 1,
        title: 'Hello World',
        body: 'Something.....'
    }

    const dataToPut = {
        id: 2,
        title: 'Smth...',
        body: 'Lorem'
    }


    const dataToPatch = {
        title: 'Smth...'
    }




    
    
    
    
    useEffect(() => {

        axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then((res) => setGetData(res.data))
        .catch((err) => {
            console.error('Error fetching posts', err);
        });

        axios.post('https://jsonplaceholder.typicode.com/posts', dataToPost)
            .then(response => {
                console.log('Data created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating data:', error);
            });

        axios.delete('https://jsonplaceholder.typicode.com/posts/1')
            .then((res) => console.log('Successfully deleted data', res.data))
            .catch((err) => console.log('Error', err))
    
    
        axios.put('https://jsonplaceholder.typicode.com/posts/2', dataToPut)
            .then((res) => console.log('Successfully updated data', res.data))
            .catch((err) => console.log('Error', err))
    
    
    
        axios.patch('https://jsonplaceholder.typicode.com/posts/3', dataToPatch)
            .then((res) => console.log('Successfully patched data', res.data))
            .catch((err) => console.log('Error', err))
            
    }, []);







    return (
        <>
            <div>
                <div>
                    <h3>{getData.title}</h3>
                    <p>{getData.body}</p>
                </div>
            </div>


        </>
    );
};

export default App;
