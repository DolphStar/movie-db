import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import downArrow from '../icons/downArrow.svg';
import upArrow from '../icons/upArrow.svg';

function Nav() {

  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu(){
    setMenuOpen(!menuOpen)
  }


  return (
    <nav className='main-nav'>
      <div className='dropdown'>
        <button className='trailr-btn'>
          <NavLink className="trailr-navlink" to='/trailr'>Trailr</NavLink>
        </button>
        <button className='arrow' onClick={toggleMenu}>
          {
            menuOpen === false ? (
              <img src={downArrow} alt="expand menu" />
            ) : (
              <img src={upArrow} alt="minimize menu" />
            )
          }
        </button>
        { 
          menuOpen === true ? (
            <ul className='sub-menu'>
              <li><NavLink to='/favorites'>Favorites</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
            </ul>
          ) : (
            null
          )
        } 
      </div>   
    </nav>
  )
}

export default Nav;