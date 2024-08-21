import React, { useEffect, useLayoutEffect, useState } from 'react'
import Icon from '../images/Logo.svg'
import { useMenu } from '../Contexts/MenuContext'
import axios from 'axios'

const SearchBar = () => {
  const setMenu = useMenu();
  const[users,setUsers] = useState([]);
  const[text,setText] = useState('');
  const[suggestions, setSuggestions]= useState([]);

  useEffect(()=>{
    const loadUsers = async()=>{
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
    }
    loadUsers();

  },[]);

  const onChangeHandler = (text)=>{
    let matches = [];
    if(text.length>0){
      matches = users.filter(user=>{
        const regex = new RegExp(`${text}`,"gi");
        return user.username.match(regex);
      })
    }
    
    setSuggestions(matches);
    console.log(JSON.stringify(suggestions))
    setText(text)
  }

  

  return (
    <div className={setMenu === false?"searchBar":"searchBar active"}>
        <div className='logoContainer'>
            <img src={Icon} alt="logo" />
        </div>
        <div className='searchForm'>
            <div className='searchContainer'>
                <div className='searchLogoContainer'>   
                </div>
                <input type="text" placeholder='Search' className='inputBox' onChange={e=>onChangeHandler(e.target.value)} value={text}/>
            </div>
         <div className='suggestionBox'>
         {
                  suggestions && suggestions.map((suggestion,i)=>{
                    return <div className='suggestions' key={i}>{suggestion.username}</div>
                  })
                }
         </div>
        </div> 
    </div>
  )
}

export default SearchBar
