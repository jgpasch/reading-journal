import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="navigation">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
          <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/create">New</Link>
          </li>
        </ul>
      </div>
    )
  }
}
