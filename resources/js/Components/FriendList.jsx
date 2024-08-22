import React, { useEffect } from 'react'
import Logo from '../images/support.svg'
import { useState } from 'react'
import axios from 'axios'

const FriendList = ({auth}) => {
  console.log(auth.user);
  const [users,setUsers] = useState([]);
/*
  useEffect(()=>{
    (async () => {
        let i;
        const dummyArr = []
        for(i = 0; i < Math.floor(Math.random() * 5); i++){
            const response = await axios.get('https://randomuser.me/api/');
            dummyArr.push({
                name: response.data.results[0].name.first,
                slika: response.data.results[0].picture.medium
            });
        }
        setUsers(dummyArr);
    })();
},[]);
*/

useEffect(()=>{
  (async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(response.data);
  })();
},[]);

  return (
<div className='friendList'>
      <div className='logoContainer'>
        <img src={Logo} alt="logo"/>
        <h2 className='kontakti'>Kontakti</h2>
      </div>
    <div className='friendsContainer'>
        <ul>
          {
            users?.map((user,index)=>{
              return(
                <li key={index}>
                  <img src={user.slika} alt="" />
                  <a href="">{user.name}</a>
                </li>
              )
            })
          }
        </ul>
    </div>
</div>
)
}

export default FriendList
