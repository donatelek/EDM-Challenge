import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import '../Styles/Authentication.css';
import { Link , withRouter} from 'react-router-dom';
import * as actionCreators from '../store/actions'
import * as actionTypes from '../store/actions'
import { connect } from 'react-redux'
class Authentication extends Component {
    state = {
        render: 'login',
        isWrongLogin:false,
        allUsers:null
    }
    UNSAFE_componentWillMount() {
        fetch('http://localhost:3000/scoreboard', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(res => {
            this.setState({
                allUsers: res.length
            })
        }).catch(err => console.log(err))
        const { resetUsers,handlePageChange}=this.props;
        localStorage.clear()
        resetUsers()
        handlePageChange('/')
    }

    handleAuthChange = (page) => {
        const { saveShowWrongLogin }=this.props;
        saveShowWrongLogin(false)
        this.setState({
            render: page
        })
    }

    handleChangeUserLoginRoute=()=>{
        this.props.history.push('/introduction')
    }

    render() {

        const { render }=this.state;
        const { showWrongLogin,submitLogin,submitRegister,showUserExist,showSuccessRegister,handlePageChange,anonymousLogin,user,showWrongLength } = this.props;
        const { handleAuthChange } = this;

        return (
            <div className="authentication">
                <div className="accounts">Users: {this.state.allUsers}</div>
                <nav>
                    <div onClick={() => handleAuthChange('login')}>Sign In</div>
                    <div onClick={() => handleAuthChange('register')}>Sign Up</div>
                </nav>

                {render === 'login' && <Login handleChangeUserLoginRoute={this.handleChangeUserLoginRoute}/>}

                {render === 'register' && <Register handleAuthChange={handleAuthChange} />}

                {showWrongLength&&render==='register'&&<div className="wrongPassword">Your password should be at least 6 characters</div>}
                {showUserExist&&render==='register'&&<div className="wrongPassword">User with this username already exist</div>}
                {showSuccessRegister&&render==='register'&&<div className="wrongPassword">Successfull register. Now log in</div>}
                {showWrongLogin&&render==='login'&&<div className="wrongPassword">Wrong username or password. Try Again!</div>}

                <Link className="anonymous" onClick={() => {
                    return (
                        handlePageChange('introduction'),
                        anonymousLogin()
                    )
                }} to='/introduction'>Anonymous</Link>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        showWrongLogin:state.showWrongLogin,
        showUserExist:state.showUserExist,
        showSuccessRegister:state.showSuccessRegister,
        user:state.user,
        showWrongLength:state.showWrongLength,
    }
  }

const mapDispatchToProps=dispatch=>{
    return{
        handlePageChange:(page)=>dispatch({type:actionTypes.SAVE_PAGE_URL,page}),
        resetUsers:()=>dispatch(actionCreators.resetUsers()),
        submitLogin:(username,password)=>dispatch(actionCreators.submitLogin(username,password)),
        submitRegister:(username,password)=>dispatch(actionCreators.submitRegister(username,password)),
        anonymousLogin:()=>dispatch(actionCreators.fetchAnonymousLogin()),
        saveShowWrongLogin:(showWrongLogin)=>dispatch({type:actionTypes.SAVE_SHOW_WRONG_LOGIN,showWrongLogin})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Authentication));