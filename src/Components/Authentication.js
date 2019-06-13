import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import '../Styles/Authentication.css';
import { Link , withRouter} from 'react-router-dom';
class Authentication extends Component {
    state = {
        render: 'login',
        isWrongLogin:false,
        allUsers:null
    }
    UNSAFE_componentWillMount() {
        fetch('https://pure-dawn-32038.herokuapp.com/scoreboard', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(res => {
            this.setState({
                allUsers: res.length
            })
        }).catch(err => console.log(err))
        const { resetUsers,pageChange}=this.props;
        localStorage.clear()
        resetUsers()
        pageChange('/')
    }

    handleAuthChange = (page) => {
        const { hideWrongLogin }=this.props;
        hideWrongLogin()
        this.setState({
            render: page
        })
    }

    handleChangeUserLoginRoute=()=>{
        this.props.history.push('/introduction')
    }

    render() {

        const { render }=this.state;
        const { showWrongLogin,submitLogin,submitRegister,showUserExist,showSuccessRegister,pageChange,anonymousLogin,user,showWrongLength } = this.props;
        const { handleAuthChange } = this;

        return (
            <div className="authentication">
                <div className="accounts">Users: {this.state.allUsers}</div>
                <nav>
                    <div onClick={() => handleAuthChange('login')}>Sign In</div>
                    <div onClick={() => handleAuthChange('register')}>Sign Up</div>
                </nav>

                {render === 'login' && <Login handleChangeUserLoginRoute={this.handleChangeUserLoginRoute} showWrongLogin={showWrongLogin} submitLogin={submitLogin} pageChange={pageChange} user={user}/>}
                {render === 'register' && <Register submitRegister={submitRegister} handleAuthChange={handleAuthChange} />}
                {showWrongLength&&render==='register'&&<div className="wrongPassword">Your password should be at least 6 characters</div>}
                {showUserExist&&render==='register'&&<div className="wrongPassword">User with this username already exist</div>}
                {showSuccessRegister&&render==='register'&&<div className="wrongPassword">Successfull register. Now log in</div>}
                {showWrongLogin&&render==='login'&&<div className="wrongPassword">Wrong username or password. Try Again!</div>}

                <Link className="anonymous" onClick={() => {
                    return (
                        pageChange('introduction'),
                        anonymousLogin()
                    )
                }} to='/introduction'>Anonymous</Link>
            </div>
        );
    }
}

export default withRouter(Authentication);