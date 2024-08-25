import React, { useState } from 'react'
import Icon from "../images/LogoWhite.svg"
import Dashboard from '../images/dashboard.svg'
import { useMenu, useMenuUpdate } from '../Contexts/MenuContext'



const Sidebar = ({auth}) => {

  const [closeMenu, setCloseMenu] = useState(false);
  const user = auth?.user;

  const imageUrl = user.user_image ? `/uploads/user_images/${user.user_image}` : '../images/profile.png';
  

  const setMenu = useMenu();
  const updateMenu = useMenuUpdate();
  
  
  return (
    <div className={setMenu === false ? "sidebar": "sidebar active"}>
      <div className={setMenu === false ? "logoContainer": "logoContainer active"}>
        <img src={Icon} alt="icon" className='icon'/>
        <h2 className='title'>Uzivaci</h2>
      </div>
      <div className={setMenu === false ? "burgerContainer": "burgerContainer active"}>
        <div className="burgerTrigger" onClick={updateMenu}></div>
        <div className="burgerMenu"></div> 
      </div>
      <div className="profileContainer">
         {
          user ?
          <>
          <img src={imageUrl} alt="profile" className='profile' />
          <div className="profileContents">
            <p className='name'>{user.name}</p>
            <p className='email'>{user.email}</p>
        </div>
          </>
          :
          <>
          <img src={imageUrl} alt="profile" className='profile' />
          <div className="profileContents">
            <p className='name'>Guest</p>
            <p className='email'>Guest</p>
        </div>
          </>
         }
      </div>
      <div className={setMenu === false ? "contentsContainer": "contentsContainer active"}>
        <ul>
            { 
              user ?
              <>
                <li className={location.pathname === "/galerija" ? "active" : ""}>
                <img src={Dashboard} alt="dashboard" />
                <a href="/galerija">Galerija</a>
                </li>
                <li className="addPost">
                <img src={Dashboard} alt="dashboard" />
                <a href="/addpost">Nova Objava</a>
                </li>
                <li className={location.pathname === "/dashboard" ? "active" : ""}>
                <img src={Dashboard} alt="dashboard" />
                <a href='/dashboard'>Dashboard</a>
                </li>
              </>
              :
            <>
              <li className={location.pathname === "/login"?"active":""}>
              <img src={Dashboard} alt="dashboard" />
              <a href="/login">Login</a>
              </li>
              <li className={location.pathname === "/register" ? "active": ""}>
              <img src={Dashboard} alt="dashboard" />
              <a href="/register">Register</a>
              </li>
            </>
            }      
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
