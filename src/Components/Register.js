import React, { Component } from 'react';
import '../Styles/Register.css';
class Register extends Component {
    state = {
        username: '',
        password: ''
    }
    handleRegister = (e) => {
        const type = e.target.type
        if (type === 'text') {
            this.setState({
                username: e.target.value
            })
        } else {
            this.setState({
                password: e.target.value
            })
        }
    }
    render() {
        const { password, username } = this.state;
        const { handleRegister } = this;
        const { submitRegister } = this.props;
        
        return (
            <div className="register">
                <h1>Register</h1>
                <div className="username">
                    <span>Username</span>
                    <br />
                    <i class="zmdi zmdi-account-o"></i>
                    <input type="text" value={username} onChange={handleRegister} spellcheck="false" />
                </div>
                <div className="password">
                    <span>Password</span>
                    <br />
                    <i class="zmdi zmdi-lock-outline"></i>
                    <input type="password" value={password} onChange={handleRegister} />
                </div>
                <button onClick={() => submitRegister(username, password)} className="loginButton">Register</button>
            </div>
        );
    }
}

export default Register;