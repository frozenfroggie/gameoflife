/*jshint esversion: 6 */
import React from 'react';
import FontAwesome from 'react-fontawesome';

const Logout = function(props) {
    return (
      <div className="logoutCont" >
        <div className="welcome"><span>Welcome <b>{ props.name }</b>!</span></div>
        <div className="logout" onClick={ () => props.logout() }><FontAwesome name='sign-out' style={{ "margin": 10 }} /></div>
      </div>
     );
};

export default Logout;