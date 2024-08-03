import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/locations">Locations</Link>
      </li>
    </ul>
  </nav>
  )
}

export default Header