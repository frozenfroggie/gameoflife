/*jshint esversion: 6 */
import React from 'react';

const Login = function(props) {
    return (
      <div className="login" >
        <a href='/auth/github'>
          <div className="social git"><div><span className="fa fa-github"></span></div><div>Sign in with Github</div></div>  
        </a> 
        <a href='/auth/facebook'>            
          <div  className="social fb"><div><span className="fa fa-facebook"></span></div><div>Sign in with Facebook</div></div>
        </a> 
        <a href='/auth/google'>            
          <div  className="social gg"><div><span className="fa fa-google-plus"></span></div><div>Sign in with Google</div></div>
        </a> 
      </div>
     );
};

export default Login;