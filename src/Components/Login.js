import React, { Component } from 'react';
import '../Styles/Login.css';
class Login extends Component {
    state = {
        username: '',
        password: ''
        
    }
    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
 
    render() {

        const { username,password } = this.state;
        const { handleUsername,handlePassword }=this;
        const { submitLogin }= this.props;

        return (
            <div className="login">
                <h1>Login</h1>
                <div className="username">
                    <span>Username</span>
                    <br />
                    <i class="zmdi zmdi-account-o"></i>
                    <input value={username} onChange={handleUsername} type="text" spellcheck="false" />

                </div>
                <div className="password">
                    <span>Password</span>
                    <br />
                    <i class="zmdi zmdi-lock-outline"></i>
                    <input value={password} onChange={handlePassword} type="password" />

                </div>

                <button className='loginButton' onClick={() =>submitLogin(username, password)} >Login</button>
            </div>
        );
    }
}

export default Login;