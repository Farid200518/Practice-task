import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res) => setPosts(res.data))
            .catch((err) => {
                console.error('Error fetching posts', err);
            });
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default App;
