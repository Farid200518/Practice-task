import React, { useState, useEffect, useSyncExternalStore } from 'react';
import axios from 'axios';

const App = () => {

    const [getData, setGetData] = useState([])


    const dataToPost = {
        id: 15,
        name: "afdnjasfd",
        username: 'asdasdm'
    }

    const dataToEdit = {
        name: "afdnjasfd",
    }

    const dataToPatch = {
        name: 'Smth...'
    }


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => setGetData(res.data))
            .catch((err) => console.log(err))
    }, [])


    function handleDelete(id) {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => setGetData(prevData => prevData.filter(user => user.id !== id)))
            .catch((err) => console.log(err))
    }

    function handlePost() {
        axios.post('https://jsonplaceholder.typicode.com/users', dataToPost)
            .then((res) => setGetData(prevData => [...prevData, res.data]))
            .catch((err) => console.log(err))
    }


    function handleEdit(id) {
        axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, dataToEdit)
            .then(res => {
                setGetData(prevData => {
                    return prevData.map(user => {
                        if (user.id === id) {
                            return { ...res.data }
                        }
                        return user
                    })
                })
            })
            .catch((err) => console.log(err))

    }


    function handlePatch(id) {
        axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, dataToPatch)
            .then(res => {
                setGetData(prevData => {
                    return prevData.map((user) => {
                        if (user.id === id) {
                            return { ...res.data }
                        }
                        return user
                    })
                })
            })
            .catch((err) => console.log(err))

    }



    return (
        <>
            <div>
                <button onClick={handlePost} style={{
                    marginTop: '20px'
                }}>POST</button>
                {
                    getData.map((user) => (
                        <div key={user.id}>
                            <h1>{user.name}</h1>
                            <p>{user.username}</p>
                            <button onClick={() => handleEdit(user.id)}>EDIT</button>
                            <button onClick={() => handleDelete(user.id)}>DELETE</button>
                            <button onClick={() => handlePatch(user.id)}>PATCH</button>
                        </div>
                    ))
                }
                <div>


                </div>
            </div>


        </>
    );
};

export default App;
