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
    try {
      const response = await fetch('http://localhost:8000/api/addpost', {
        method: 'POST',
        headers:{
          /*"Content-Type":"application/json",
          "Accept":"application/json"*/
        },
        body: formData
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
