import Nav from './Nav';
import SearchBar from './SearchBar';
import logo from "../icons/logo.svg";
import { NavLink } from 'react-router-dom';

function Header() {

  return (
    <>
    <header className='main-header'>
      <div className='header-wrapper'>
        <div className='logo'>
          <NavLink to='/'><img src={logo} alt="logo" /></NavLink>
        </div>
        <SearchBar />
        <Nav />
      </div>
    </header>
    </>
  )
}

export default Header