import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Nav() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='main-nav'>
        <ul>
            <li className='trailr-nav'><NavLink to='/trailr'>Trailr</NavLink></li>
            <ul className='sub-menu'>
              <li><NavLink to='/about'>About</NavLink></li>
              <li><NavLink to='/favorites'>Favorites</NavLink></li>
            </ul>
        </ul>
    </nav>
  )
}

export default Nav;