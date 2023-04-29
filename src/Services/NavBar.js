import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../Images/Logo.png';

const NavBar = () => {

  const navigate = useNavigate();
  const auth = localStorage.getItem('user');

  const mystyle = {
    textDecorationLine: "none",
    color: "white"
  };

  function UserLogout() {
    localStorage.clear();
    navigate('/signUp');
  }

  return (

    <>

       <img src={logo} alt="logo" className='logo'/>

        {auth ? 
          <ul className='nav-link-ul'>
            <li><Link to='/' style={mystyle}>Products</Link></li>
            <li className='li_add'><Link to='/add' style={mystyle}>Add Products</Link> </li>
            <li className='li_logout'><Link to='/profile' style={mystyle}>Profile</Link></li>

            <li><Link to='/login' 
                    onClick={UserLogout} 
                    style={mystyle} 
                    className={'logout'}
                >Logout({JSON.parse(auth).name})</Link></li>

          </ul>
          :
          <ul className='nav-link-ul' style={{textAlign:"right"}}>
            <li style={{textAlign:"right"}}><Link to='/signUp' style={mystyle}>SignUp</Link></li>
            <li><Link to='/login' style={mystyle}>Login</Link></li>
          </ul>
        }

    </>
  )
}
export default NavBar;