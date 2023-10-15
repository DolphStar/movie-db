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
        <button className='down-arrow' onClick={toggleMenu}>
          {
            menuOpen === false ? (
              <img src={downArrow} alt="expand menu" />
            ) : (
              <img src={upArrow} alt="minimize menu" />
            )
          }
        </button>
      </div>
      <ul className='sub-menu'>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/favorites'>Favorites</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav;