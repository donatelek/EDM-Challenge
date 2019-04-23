import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import '../Authentication.css';
import { Link , withRouter} from 'react-router-dom';
class Authentication extends Component {
    state = {
        render: 'login',
        isWrongLogin:false,
    }
    UNSAFE_componentWillMount() {
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
    render() {

        const { render }=this.state;
        const { showWrongLogin,submitLogin,submitRegister,showUserExist,showSuccessRegister,pageChange,anonymousLogin } = this.props;
        const { handleAuthChange } = this;
        return (

            <div className="authentication">
                
                <nav>
                    <div onClick={() => handleAuthChange('login')}>Login</div>
                    <div onClick={() => handleAuthChange('register')}>Register</div>
                </nav>

                {render === 'login' && <Login showWrongLogin={showWrongLogin} submitLogin={submitLogin} />}

                {render === 'register' && <Register submitRegister={submitRegister} handleAuthChange={handleAuthChange} />}

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