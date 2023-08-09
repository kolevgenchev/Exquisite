import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../assets/Exquisite logo.png';
import './Header.css';

function Header({ categories, onCategoryChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="custom-header">
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <img src={Logo} alt="Your Logo" />
          </div>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {categories.map((category, index) => (
            <button key={index} onClick={() => onCategoryChange(category)} className="nav-link">{category}</button>
          ))}
        </nav>
        <div className="icons-container">
          <ShoppingCartIcon className="nav-icon" />
          <AccountCircleIcon className="nav-icon" />
        </div>
      </header>
    </div>
  );
}

export default Header;

