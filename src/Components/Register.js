import React, { Component } from 'react';
import '../Styles/Register.css';
import * as actionCreators from '../store/actions'
import { connect } from 'react-redux'
class Register extends Component {
    state = {
        username: '',
        password: ''
    }
    handleKeyPress=e=>{
        const { username,password } = this.state;
        if(e.key==='Enter'){
            this.props.submitRegister(username, password,this.props.history)
        }
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
                    <i className="zmdi zmdi-account-o"></i>
                    <input type="text" value={username} onChange={handleRegister} onKeyPress={this.handleKeyPress} spellCheck="false" />
                </div>
                <div className="password">
                    <span>Password</span>
                    <br />
                    <i className="zmdi zmdi-lock-outline"></i>
                    <input type="password" value={password} onKeyPress={this.handleKeyPress} onChange={handleRegister} />
                </div>
                <button onClick={() => submitRegister(username, password)} className="loginButton">Register</button>
            </div>
        );
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        submitRegister:(username,password)=>dispatch(actionCreators.submitRegister(username,password)),
    }
  }

export default connect(null,mapDispatchToProps)(Register);