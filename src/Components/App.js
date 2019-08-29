import React, { Component } from 'react';
import '../Styles/App.css';
import Introduction from './Introduction';
import Quiz from './Quiz';
import ChooseLvl from './ChooseLvl';
import Authentication from './Authentication';
import Footer from './Footer';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Scoreboard from './Scoreboard';
import Contact from './Contact';
import Error404 from './Error404';

import * as actionTypes from '../store/actions'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions'
import { url } from '../store/actions'

class App extends Component {
  state = {
    sound: '0.3',
    w: '',
    h: ''
  }

  componentWillMount() {
    const storage = localStorage.getItem('lvl')
    if (storage) {
      this.props.handleChooseLvl(storage)
    }
    if (window.innerWidth < 933) {
      this.setState({
        h: window.innerHeight + 100,
        overflow: 'hidden'
      })
    }
  }
  componentDidMount() {
    const lvl = localStorage.getItem('lvl')
    if (lvl) {
      this.props.fetchLocalStorage(this.props.user, this.state.page, lvl)
    } else {
      this.props.fetchLocalStorage(this.props.user, this.state.page)
    }
  }


  setUserIfUserLogged = () => {
    this.props.saveUserLogged(true)
  }

  resetUsers = () => {
    this.props.resetUsers()
  }

  hideWrongLogin = () => {
    this.props.saveShowWrongLogin(false)
  }

  resetUsedHints = () => {
    this.props.resetUsedHints(this.props.user.id, this.props.lvlDifficulty)
  }

  resetFailedAttempts = () => {
    this.props.resetFailedAttempts(this.props.user.id, this.props.lvlDifficulty)
  }

  updateFailedAttempts = () => {
    this.props.updateFailedAttempts(this.props.user.id, this.props.lvlDifficulty)
  }

  updateUsedHints = () => {
    this.props.updateUsedHints(this.props.user.id, this.props.lvlDifficulty)
  }

  handleShowHint1 = () => {
    if (this.props.lvlDifficulty === 'easy') {
      if (this.props.user.usedhints === 0 || this.props.user.usedhints === "0") {
        this.updateUsedHints()
      }
    } else if (this.props.lvlDifficulty === 'hard') {
      if (this.props.user.usedhintshard === 0 || this.props.user.usedhintshard === "0") {
        this.updateUsedHints()
      }
    }

  }
  handleShowHint2 = () => {
    if (this.props.lvlDifficulty === 'easy') {
      if (this.props.user.usedhints === 0 || this.props.user.usedhints === 1 || this.props.user.usedhints === "0") {
        this.updateUsedHints()
      }
    } else if (this.props.lvlDifficulty === 'hard') {
      if (this.props.user.usedhintshard === 0 || this.props.user.usedhintshard === 1 || this.props.user.usedhintshard === "0") {
        this.updateUsedHints()
      }
    }

  }


  updateLocalStorage = () => {
    fetch(`${url}saveLocalStorage`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.props.user.id
      })
    }).then(res => res.json())
      .then(res => {
        localStorage.setItem('currentUser', JSON.stringify(res))
      })
  }

  setUserLvl = (user) => {
    this.props.setUserLvl(user)
  }

  handleUserPoints = () => {
    this.props.handleUserPoints(this.props.user.id, this.props.lvlDifficulty)
  }


  submitRegister = (username, password) => {
    this.props.submitRegister(username, password)
  }

  submitLogin = (username, password) => {
    this.props.submitLogin(username, password)
  }

  handleNextLvl = () => {
    this.props.handleNextLvl(this.props.user.id)
  }

  handleSound = (e) => {
    this.setState({
      sound: e.target.value
    })
  }

  pageChange = (page) => {
    this.props.handlePageChange(page)

  }
  handleLogOut = () => {
    this.props.resetUsers()
  }

  render() {

    const { handleLogOut, pageChange, setUserLvl, submitLogin, handleShowHint1, handleShowHint2, updateLocalStorage, resetFailedAttempts, updateFailedAttempts, } = this;
    const { user, page, userLogged } = this.props;

    return (
      <>
        <Route render={({ location }) => (
          <div id="wrapper"
            style={{ width: this.state.w, height: this.state.h }}>
            <h1 className='mainTitle'><span>EDM CHALLENGE</span></h1>

            {page !== '/' && <div className="userInfo">
              <div className="face"></div>
              {user.username && user.username !== 'null' ? <div className='userName'>{user.username}</div> : null}
              {(user.username === 'null' || user.username === null) && user.id ? <div className='userName'>Anonymous{user.id}</div> : null}
              {user && <Link className='logOut' exact='true' to='/' onClick={handleLogOut}>LOG OUT</Link>}
              <br />
              {page === 'contact' && !user ? <Link to='/' onClick={() => this.pageChange('/')} className='backToLogIn' >Back to log in</Link> : null}
              {page === 'contact' && user ? <Link to='/lvl' className='goBack'>Back to levels</Link> : null}
              {page === '/quiz' || page === 'scoreboard' ? <Link className='goBack' to='/lvl'>GO BACK</Link> : null}
            </div>}

            <Switch location={location}>
              <Route path='/lvl' render={(props) => {
                return (
                  <ChooseLvl {...props} />
                )
              }} />
              {!userLogged && <Route path='/' exact={true} render={(props) => (
                <Authentication {...props} />
              )} />}

              {user && <Route path='/introduction' render={(props) => (<Introduction {...props} pageChange={pageChange} setUserLvl={setUserLvl} userId={user.id} />)} />}

              {user && <Route path='/quiz' render={(props) => (
                <Quiz {...props} handleShowHint1={handleShowHint1} handleShowHint2={handleShowHint2} updateLocalStorage={updateLocalStorage} resetFailedAttempts={resetFailedAttempts} updateFailedAttempts={updateFailedAttempts} />
              )} />}
              <Route path='/contact' exact={true} render={(props) => (
                <Contact {...props} />
              )} />
              {user && (this.props.easyLvlDone || this.props.hardLvlDone) ? <Route path='/scoreboard' exact={true} render={(props) => (
                <Scoreboard {...props} pageChange={pageChange} />
              )} /> : null}
              {this.props.page !== 'introduction' && user ? <Route component={Error404} /> : null}
              {submitLogin}
            </Switch>

            {this.props.showFooter ? <div className="hamburger" onClick={this.props.handleShowFooter}><i className="fas fa-bars"></i></div> : <div className="hamburger" style={{ bottom: '10px' }} onClick={this.props.handleShowFooter}><i className="fas fa-bars"></i></div>}

            {this.props.showFooter ? <div className="navInFooter" style={{ bottom: '80px' }}>
              {(page === 'contact' && user) && <Link to='/lvl' className='goBackFooter' >Back to levels</Link>}
              {(page === 'contact' && !user) && <Link onClick={() => this.pageChange('/')} to='/' className='goBackFooter'>Log In</Link>}
              {page === '/quiz' || page === 'scoreboard' ? <Link className='goBackFooter' to='/lvl'>GO Back</Link> : null}
              {this.props.user && <Link className='logOutFooter' to='/' exact='true' onClick={handleLogOut}>LOG OUT</Link>}
            </div> : <div className="navInFooter" >
                {(page === 'contact' && user) && <Link to='/lvl' className='goBackFooter'>Back To levels</Link>}
                {(page === 'contact' && !user) && <Link onClick={() => this.pageChange('/')} to='/' className='goBackFooter'>Log In</Link>}
                {page === '/quiz' || page === 'scoreboard' ? <Link className='goBackFooter' to='/lvl'>Go Back</Link> : null}
                {this.props.user && <Link className='logOutFooter' to='/' exact='true' onClick={handleLogOut}>LOG OUT</Link>}
              </div>}

            {this.props.showLoaderIntroduction && this.props.page === 'introduction' ? <div className="loader"></div> : null}
            <Footer />
          </div>
        )} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    showFooter: state.showFooter,
    soundplayerPlaying: state.soundplayerPlaying,
    showLoaderIntroduction: state.showLoaderIntroduction,
    user: state.user,
    page: state.page,
    showWrongLength: state.showWrongLength,
    showSuccessRegister: state.showSuccessRegister,
    showUserExist: state.showUserExist,
    showWrongLogin: state.showWrongLogin,
    userLogged: state.userLogged,
    userLvl: state.userLvl,
    lvlDifficulty: state.lvlDifficulty,
    easyLvlDone: state.easyLvlDone,
    hardLvlDone: state.hardLvlDone
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleShowFooter: () => dispatch({ type: actionTypes.SHOW_FOOTER }),
    handlePageChange: (page) => dispatch({ type: actionTypes.SAVE_PAGE_URL, page }),
    anonymousLogin: () => dispatch(actionCreators.fetchAnonymousLogin()),
    fetchLocalStorage: (user, page, lvl) => dispatch(actionCreators.fetchLocalStorage(user, page, lvl)),
    resetUsedHints: (id, lvl) => dispatch(actionCreators.resetUsedHints(id, lvl)),
    resetFailedAttempts: (id, lvl) => dispatch(actionCreators.resetFailedAttempts(id, lvl)),
    updateFailedAttempts: (id, lvl) => dispatch(actionCreators.updateFailedAttempts(id, lvl)),
    updateUsedHints: (id, lvl) => dispatch(actionCreators.updateUsedHints(id, lvl)),
    handleUserPoints: (id, lvl) => dispatch(actionCreators.handleUserPoints(id, lvl)),
    handleNextLvl: (id) => dispatch(actionCreators.handleNextLvl(id)),
    resetUsers: () => dispatch(actionCreators.resetUsers()),
    setUserLvl: (user) => dispatch(actionCreators.setUserLvl(user)),
    submitLogin: (username, password) => dispatch(actionCreators.submitLogin(username, password)),
    submitRegister: (username, password) => dispatch(actionCreators.submitRegister(username, password)),
    saveUserLogged: (userLogged) => dispatch({ type: actionTypes.SAVE_USER_LOGGED, userLogged }),
    saveShowWrongLogin: (showWrongLogin) => dispatch({ type: actionTypes.SAVE_SHOW_WRONG_LOGIN, showWrongLogin }),
    handleChooseLvl: (lvl) => dispatch({ type: actionTypes.SAVE_CHOOSE_LVL, lvl })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));