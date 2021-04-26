import React, { useState, useContext } from 'react';
import { Toggle, SideBarCont, Header, Options, Feature } from '../styles/SideBarStyles.js';
import { AuthContext } from '../context.js';

const SideBar = ({ setPage }) => {
  const [isToggled, setToggle] = useState(false);
  const user = useContext(AuthContext);

  return (
    <>
      <Toggle
        onClick={() => setToggle(!isToggled)}
        className="far fa-user-circle"
        isToggled={isToggled}>
      </Toggle>
      <SideBarCont isToggled={isToggled}>
        <Header>{ user ? 'Profile' : 'No user' }</Header>
        <Options>
          { user && <Feature>Info</Feature> }
          <Feature id='register' onClick={(e) => setPage(e.target.id)}>
            Sign Up
          </Feature>
          <Feature>
            {!user ? (
                <form action='/login'>
                  <button type='submit'> Login </button>
                </form>
              ) : (
                <form method='post' action='/logout'>
                  <button type='submit'> Logout </button>
                </form>
              )
            }
          </Feature>
          { user && (
            <Feature id='favorites' onClick={(e) => setPage(e.target.id)}>
              Favorites
            </Feature>
          )}
        </Options>
      </SideBarCont>
    </>
  )
};

export default SideBar;