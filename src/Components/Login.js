import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions'
import * as actionCreators from '../store/actions'
import '../Styles/Login.css';
class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    handleKeyPress = e => {
        const { username, password } = this.state;
        if (e.key === 'Enter') {
            this.props.submitLogin(username, password, this.props.history)
        }
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
        const { username, password } = this.state;
        const { handleUsername, handlePassword } = this;


        return (
            <div className="login">
                <h1>Login</h1>
                <div className="username">
                    <span>Username</span>
                    <br />
                    <i className="zmdi zmdi-account-o"></i>
                    <input value={username} onChange={handleUsername} type="text" onKeyPress={this.handleKeyPress} spellCheck="false" />
                </div>
                <div className="password">
                    <span>Password</span>
                    <br />
                    <i className="zmdi zmdi-lock-outline"></i>
                    <input value={password} onChange={handlePassword} type="password" onKeyPress={this.handleKeyPress} />
                </div>
                <button className='loginButton' onClick={() => {
                    this.props.submitLogin(username, password, this.props.history)
                }} >Login</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        page: state.page,
        userLvl: state.userLvl
    }
}


const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (username, password, historyPush) => dispatch(actionCreators.submitLogin(username, password, historyPush)),
        handlePageChange: (page) => dispatch({ type: actionTypes.SAVE_PAGE_URL, page }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));