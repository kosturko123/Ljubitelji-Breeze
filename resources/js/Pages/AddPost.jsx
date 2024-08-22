/*import React, { useState } from 'react';
import { useMenu } from '../Contexts/MenuContext';

const AddPost = () => {
  const setMenu = useMenu();
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  let user_id = localStorage.getItem('user_id');

  async function addPost(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('photo', photo);
    formData.append('user_id', user_id); 
    try {
      let result = await fetch('http://127.0.0.1:8000/api/addpost', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` // Include this if using token-based authentication
        },
        body: formData
      });
      if (result.ok) {
        alert("Post je sačuvan!");
      } else {
        alert("Post nije sačuvan!"+ result.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Došlo je do greške :(");
    }
  }

  return (
    <div className={setMenu === false ? "dashboard" : "dashboard active"}>
      <h3>Nova objava</h3>
      <div className='wrapper'>
        <form onSubmit={addPost} action="" method="POST" >
          <div className='inputBox'>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Text' required />
          </div>
          <div className=''>
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} placeholder='Photo' required />
          </div>
          <br/>
          <button type='submit'>Objavi</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;*/

/*
<div>
            <h3>Create a New Post</h3>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
                <button type="submit">Post</button>
            </form>
        </div>

*/

import React, { useState } from 'react';
import { useMenu } from '../Contexts/MenuContext';
import Sidebar from '@/Components/Sidebar';
import { MenuProvider } from '@/Contexts/MenuContext';
import "../styles/main.scss"
import "../styles/variables.scss"
import SearchBar from '@/Components/SearchBar';
import FriendList from '@/Components/FriendList';

const AddPost = () => {

  const setMenu = useMenu();
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('photo', photo);
    const token = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).token : null;
    alert(token + "KURCINELA");
    try {
      const response = await fetch('http://localhost:8000/api/addpost', {
        method: 'POST',
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        //body: formData
      });
      if (!response.ok) {
        throw new Error('Greška pri kreiranju objave.');
      }
      const data = await response.json();
      alert('Objava uspešno kreirana.');
    } catch (error) {
      console.error('Greškica:', error);
      alert('Greška pri kreiranju objave.');
    }
  };

  return (

    <div className={setMenu === false ? "dashboard" : "dashboard active"}>
      <h3>Nova objava</h3>
      <div className="wrapper">
        <form onSubmit={handlePostSubmit}>
          <div className="inputBox">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Text"
              required
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              placeholder="Photo"
              required
            />
          </div>
          <br />
          <button type="submit">Objavi</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
