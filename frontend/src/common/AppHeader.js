/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";
import images from '../constants/images';


const AppHeader = ({ authenticated, onLogout }) => {
  return (
    <>
    <header className="header">
      <nav className="navbar">
        <div className="navbar-left">
            <Link to="/">
            <img src={images.Logo} alt="Logo" className="logo" />
            </Link>
        </div>
        
        <div className="navbar-right">
          {authenticated ? (
            <>
              <Link to="/users" className="navbar-button-A">
                Users
              </Link>
              <Link to="/profile" className="navbar-button-A">
                Profile
              </Link>
              <button className="navbar-button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-buttonl">
                Login
              </Link>
              <Link to="/signup" className="navbar-buttons">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>

      {/* <header aria-label="Page Header" className="bg-green-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
                <Link to="/" className="text-3xl text-white">
                  Fast Food
                </Link>
              </h1>
            </div>
            <div className="flex items-center justify-end gap-4">
              <nav className="app-nav  text-white">
                {authenticated ? (
                  <ul>
                    <li>
                      <NavLink to="/users">Users</NavLink>
                    </li>
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <a onClick={onLogout}>Logout</a>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                      <NavLink to="/signup">Signup</NavLink>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header> */}
    </>
  );
};

export default AppHeader;
