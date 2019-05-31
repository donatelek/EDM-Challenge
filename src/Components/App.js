import React, { Component } from 'react';
import '../App.css';
import Introduction from './Introduction';
import Quiz from './Quiz';
import ChooseLvl from './ChooseLvl';
import Authentication from './Authentication';
import Footer from './Footer';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Scoreboard from './Scoreboard';
import Contact from './Contact';


class App extends Component {
  state = {
    sound: '0.3',
    page: '/',
    downloadLvl: false,
    lvl: null,
    userLvl: '',
    lvlPointsCalculator: 6,
    secondHintClicked: false,
    thirdHintClicked: false,
    user: '',
    kej:'123',
    userLogged:false,
    showWrongLogin:false,
    showLogInBugs:false,
    showFooter:false,
    showSuccessRegister:false,
    showUserExist:false,
    showLoader:false
  }

  componentWillMount() {
    const storage = localStorage.getItem('currentUser')
    if (!this.state.user && storage) {
      fetch('https://pure-dawn-32038.herokuapp.com/getLocalStorage', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hash: storage
        })
      })
        .then(response => response.json())
        .then(user => {
        
          const array = user.split(",");
          const arrayToObject = {
            id: Number(array[0]),
            easymode: array[1],
            hardmode: array[2],
            username: array[3],
            lvl: array[4],
            easylvl: array[5],
            usedhints: Number(array[6]),
            failedAttempts: Number(array[7])
          }
          const userId = arrayToObject.id;
          this.setState({
            user: arrayToObject
          })
          fetch(`https://pure-dawn-32038.herokuapp.com/getlvl/${userId}`, {
            headers: { 'Content-Type': 'application/json' }
          }).then(res => res.json()).then(res => {
            this.setState({
              userLvl: res
            })
          }).catch(err => console.log(err))
        })
    }
  }
  changingKej=(kej)=>{
    this.setState({
      kej
    })
  }

setUserIfUserLogged=()=>{
  this.setState({
    userLogged:true
  })
}

  resetUsers = () => {
  
    localStorage.clear()
    this.setState({
      user: '',
      userLvl: '',
      page:'/'
    })
  }

  lvlPointsCalculator = () => {
    this.setState({
      lvlPointsCalculator: this.state.lvlPointsCalculator - 2
    })

  }
  handleBadAnswerPoints = () => {
    this.setState({
      lvlPointsCalculator: this.state.lvlPointsCalculator - 1
    })
  }
  mainmain = () => {
    this.setState({
      lvlPointsCalculator: 6,
      thirdHintClicked: false,
      secondHintClicked: false
    })
  }

    hideWrongLogin=()=>{
      this.setState({
        showWrongLogin:false
      })
    }

  resetUsedHints = () => {
    fetch('https://pure-dawn-32038.herokuapp.com/resethints', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        user: res
      })
    }).catch(err => console.log(err))
  }

  resetFailedAttempts = () => {
    fetch('https://pure-dawn-32038.herokuapp.com/resetattempts', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        user: res
      })
    }).catch(err => console.log(err))
  }

  updateFailedAttempts = () => {
    fetch('https://pure-dawn-32038.herokuapp.com/updatefailedattempts', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        user: res
      })
    }).catch(err => console.log(err))
  }

  updateUsedHints = () => {
    fetch('https://pure-dawn-32038.herokuapp.com/updatehints', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        user: res
      })
    }).catch(err => console.log(err))
  }

  doubledouble1 = () => {
    if (this.state.user.usedhints === 0 || this.state.user.usedhints === "0") {
      this.updateUsedHints()
      this.setState({
        secondHintClicked: true
      })
    } 
  }
  doubledouble2 = () => {
    if (this.state.user.usedhints === 0 || this.state.user.usedhints === 1 || this.state.user.usedhints === "0") {
      this.lvlPointsCalculator()
      this.updateUsedHints()
      this.setState({
        thirdHintClicked: true
      })
    }
  }

  anonymousLogin = () => {
    this.setState({
      showLoader:true
    })
    fetch('https://pure-dawn-32038.herokuapp.com/anonymous', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          this.setState({
            showLoader:false
          })
          fetch('https://pure-dawn-32038.herokuapp.com/saveLocalStorage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          }).then(res => res.json())
            .then(res => {
              localStorage.setItem('currentUser', JSON.stringify(res))
            })
          this.setState({
            user
          })
        }
      })
  }

  updateLocalStorage = () => {
    fetch('https://pure-dawn-32038.herokuapp.com/saveLocalStorage', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(res => res.json())
      .then(res => {
        localStorage.setItem('currentUser', JSON.stringify(res))
      })
  }

  setUserLvl = (user) => {
    this.setState({
      userLvl: user
    })
  }

  handleUserPoints = () => {
    fetch('https://pure-dawn-32038.herokuapp.com/easymodePoints', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(user => {
        this.setState({
          user
        })
      })
  }

  handleUsedHints = (points) => {
    this.setState({
      usedHints: points
    })
  }

  submitRegister = (username, password) => {
    fetch('https://pure-dawn-32038.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(res => {
        if(res==='success'){
          this.setState({
            showSuccessRegister:true
          })
          setTimeout(()=>{
            this.setState({
              showSuccessRegister:false
            })
          },3000)
        }else if(res==='user exist'){
          this.setState({
            showUserExist:true
          })
          setTimeout(()=>{
            this.setState({
              showUserExist:false
            })
          },3000)
        }
      })
  }

  submitLogin = (username, password) => {
    
    fetch('https://pure-dawn-32038.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user!=='wrong password'&&user) {
        
         this.setState({
           user,
          userLogged:true,
          page:'/introduction',
          showWrongLogin:false
         })
          fetch('https://pure-dawn-32038.herokuapp.com/saveLocalStorage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          }).then(res => res.json())
            .then(res => {
              localStorage.setItem('currentUser', JSON.stringify(res))
            }) }else{
         this.setState({
           showWrongLogin:true
         })
         setTimeout(()=>{
          this.setState({
            showWrongLogin:false
          })
         },2000)
        }
      })
  }

  handleNextLvl = () => {
    fetch('https://pure-dawn-32038.herokuapp.com/lvl', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        user: res
      })
      console.log(res)
    }).catch(err => console.log(err))
    setTimeout(() => {
      const userLvlNumber = parseInt(this.state.user.id)
      fetch(`https://pure-dawn-32038.herokuapp.com/getlvl/${userLvlNumber}`, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json()).then(res => {
        this.setState({
          userLvl: res
        })
      }).catch(err => console.log(err))
    }, 2000)
  }

  changeDownloadLvl = () => {
    this.setState({
      downloadLvl: true
    })
  }

  handleSound = (e) => {
    this.setState({
      sound: e.target.value
    })
  }

  pageChange = (page) => {
    this.setState({
      page
    })
  }

  handleLogOut = () => {
    localStorage.clear()
    this.setState({
      user: '',
      userLvl: '',
      userLogged:false,
      page:'/'
    })
  }

showLogInBugs=()=>{
  this.setState({
    showLogInBugs:true
  })
}

showFooter=()=>{
  this.setState({
    showFooter:!this.state.showFooter
  })
}

  render() {
    const { page,user,userLogged,showUserExist,showSuccessRegister,showWrongLogin,userLvl,secondHintClicked,thirdHintClicked,lvl,showFooter }=this.state;
    const { handleLogOut,pageChange,setUserLvl,submitRegister,hideWrongLogin,anonymousLogin,setUserIfUserLogged,resetUsers,changingKej,submitLogin,changeDownloadLvl,mainmain,doubledouble1,doubledouble2,handleUsedHints,handleNextLvl,handleUserPoints,handleAnonymousNextLvl,updateLocalStorage,resetUsedHints,resetFailedAttempts,updateFailedAttempts,showLogInBugs }=this;
    return (
        <Router>
          <Route render={({location})=>(
 <div id="wrapper">
 <div className="background1"></div>
 <h1 className='mainTitle'><span>EDM CHALLENGE</span></h1>
 

 {page!=='/'&&<div className="userInfo">
 <div className="face"></div>
 {user.username && localStorage.getItem('currentUser') && user.username !== 'null' && <div className='userName'>{user.username}</div>}
 {(user.username==='null'||user.username===null)&&user.id?<div className='userName'>Anonymous{user.id}</div>:null}
 {user&&<Link className='logOut' to='/' exact onClick={handleLogOut}>LOG OUT</Link>}
 <br/>
 {page==='contact'&&!user?<Link to='/' className='backToLogIn' >Back to log in</Link>:null}
 {page==='contact'&&user?<Link to='/lvl' className='goBack'>Back to levels</Link>:null}
 {page==='/quiz'||page==='scoreboard'?<Link className='goBack' to='/lvl'>GO BACK</Link>:null}
 </div>}

<Switch location={location}>
 <Route path='/lvl' render={(props) => {
   return (
     <ChooseLvl {...props} pageChange={pageChange} setUserLvl={setUserLvl} />
   )
 }} />

 {!userLogged&&<Route path='/' exact render={(props) => (
   <Authentication {...props}  showUserExist={showUserExist} showSuccessRegister={showSuccessRegister} pageChange={pageChange} submitLogin={submitLogin} submitRegister={submitRegister} anonymousLogin={anonymousLogin} resetUsers={resetUsers} changingKej={changingKej} showWrongLogin={showWrongLogin} hideWrongLogin={hideWrongLogin} setUserIfUserLogged={setUserIfUserLogged} userLogged={userLogged} />
 )} />}

{userLogged&&<Route path='/' exact render={(props) => (
  <Introduction {...props} page={page} pageChange={pageChange} changeDownloadLvl={changeDownloadLvl} setUserLvl={setUserLvl} userId={user.id} changingKej={changingKej}/>
 )} />}


{user && <Route path='/introduction' render={(props) => (<Introduction {...props} pageChange={pageChange} changeDownloadLvl={changeDownloadLvl} setUserLvl={setUserLvl} userId={user.id} changingKej={changingKej}/>)} />}


{userLvl!=='END'&&<Route path='/quiz' render={(props) => (
   <Quiz {...props} mainmain={mainmain} doubledouble1={doubledouble1} doubledouble2={doubledouble2} handleUsedHints={handleUsedHints} lvl={lvl} handleNextLvl={handleNextLvl} userLvl={userLvl} handleUserPoints={handleUserPoints} user={user} handleAnonymousNextLvl={handleAnonymousNextLvl} updateLocalStorage={updateLocalStorage} setUserLvl={setUserLvl} resetUsedHints={resetUsedHints} resetFailedAttempts={resetFailedAttempts} updateFailedAttempts={updateFailedAttempts} secondHintClicked={secondHintClicked} thirdHintClicked={thirdHintClicked} pageChange={pageChange}/>
 )} />}
<Route path='/contact' exact render={(props)=>(
   <Contact {...props} pageChange={pageChange} showLogInBugs={showLogInBugs}/>
 )}/>
 {submitLogin}
 </Switch>

 {userLvl==='END' && page!=='contact'&&page!=='chooselvl'&&page!=='/'&&page!=='introduction'&&<Scoreboard pageChange={pageChange}/>}
 

 {this.state.showFooter?<div className="hamburger" onClick={this.showFooter}><i class="fas fa-bars"></i></div>:<div className="hamburger" style={{bottom:'10px'}} onClick={this.showFooter}><i class="fas fa-bars"></i></div>}

 {this.state.showFooter?<div className="navInFooter" style={{bottom:'80px'}}>
{page==='contact'&&user&&<Link to='/lvl' className='goBackFooter' >Back to levels</Link>}          
 {page==='/quiz'||page==='scoreboard'?<Link className='goBackFooter' to='/lvl'>GO BACK</Link>:null}
 {this.state.user&&<Link className='logOutFooter' to='/' exact onClick={handleLogOut}>LOG OUT</Link>}
 </div>:<div className="navInFooter" >
{page==='contact'&&user&&<Link to='/lvl' className='goBackFooter'>Back to levels</Link>}          
 {page==='/quiz'||page==='scoreboard'?<Link className='goBackFooter' to='/lvl'>GO BACK</Link>:null}
 {this.state.user&&<Link className='logOutFooter' to='/' exact onClick={handleLogOut}>LOG OUT</Link>}
 </div>}

 {this.state.showLoader&&this.state.page==='introduction'?<div className="loader"></div>:null}
 <Footer showLogInBugs={showLogInBugs} showFooter={showFooter} />
</div>
          )}/>
        </Router>
    );
  }
}
export default App;
