import React, { Component } from 'react';
import '../Styles/Quiz.css'
import Hints from './Hints';
import Answer from './Answer';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
class Quiz extends Component {
    state = {
        turnAnimation:false,
        lvlPassword:'',
        showLvlPasswordAnimation:false,
        gainedPoints:null,
        showGainedPointsAnimation:false
    }

    componentWillMount(){
        this.props.handlePageChange('/quiz')
    }
    handleGainedPoints=(failedAttempts,usedHints)=>{
        this.handleShowGainedPointsAnimation()
        const numberFailedAttempts = Number(failedAttempts)
        const numberUsedHints = Number(usedHints)
        let gainedPoints = 6 - numberUsedHints * 2 - numberFailedAttempts
        if(isNaN(gainedPoints)){
            gainedPoints='Error'
        }
        if(gainedPoints<1){
            gainedPoints = 0
        }
        this.setState({
            gainedPoints
        })
    }
    handleShowLvlPasswordOnSkip=(lvl)=>{
        fetch(`http://localhost:3000/getlvlpassword/${lvl}`).then(res=>{
            return res.json()
        }).then(lvlPassword=>{
            this.setState({
                lvlPassword:lvlPassword.toUpperCase()
            })
        })
    }
    handleShowLvlPasswordAnimation=()=>{
        setTimeout(()=>{
            this.setState({
                showLvlPasswordAnimation:true
            })
        },900)
        setTimeout(()=>{
            this.setState({
                showLvlPasswordAnimation:false
            })
        },2700)
    }
    handleShowGainedPointsAnimation=()=>{
        setTimeout(()=>{
            this.setState({
                showGainedPointsAnimation:true
            })
        },900)
        setTimeout(()=>{
            this.setState({
                showGainedPointsAnimation:false
            })
        },2700)
    }

    animationOnGoodAnswer=()=>{
        this.setState({
                turnAnimation:true
        })
        setTimeout(()=>{
            this.setState({
                turnAnimation:false
            })
        },4100)
    }

    render() {

        const { turnAnimation,showLvlPasswordAnimation,showGainedPointsAnimation} = this.state;
        const { userLvl,doubledouble1,doubledouble2,updateLocalStorage,resetFailedAttempts,updateFailedAttempts } = this.props;
        const { animationOnGoodAnswer }= this;
        if(userLvl==='END'&&this.props.page!=='scoreboard'){
            this.props.handlePageChange('scoreboard')
            this.props.history.push('/scoreboard')
          }
        return (
            <div className="quiz">

                <h1 className="questionNumber">Question number: {turnAnimation?<span className='fadeNumber'>{userLvl.lvlnumber}</span>:<span>{userLvl.lvlnumber}</span>}</h1>
                {turnAnimation?<h2 className="category fadeNumber">{userLvl.category}</h2>:<h2 className="category">{userLvl.category}</h2>}
                {showLvlPasswordAnimation&&<div className="popupAnswer">{this.state.lvlPassword}</div>}
                {showGainedPointsAnimation&&<div className="popupAnswer">+ {this.state.gainedPoints}</div>}
                <Hints turnAnimation={turnAnimation} doubledouble2={doubledouble2} doubledouble1={doubledouble1} updateLocalStorage={updateLocalStorage}/>

                <Answer turnAnimation={turnAnimation} animationOnGoodAnswer={animationOnGoodAnswer} doubledouble1={doubledouble1} updateLocalStorage={updateLocalStorage} resetFailedAttempts={resetFailedAttempts} updateFailedAttempts={updateFailedAttempts} handleShowLvlPasswordOnSkip={this.handleShowLvlPasswordOnSkip} handleShowLvlPasswordAnimation={this.handleShowLvlPasswordAnimation} handleGainedPoints={this.handleGainedPoints} handleShowGainedPointsAnimation={this.handleShowGainedPointsAnimation}/>

            </div>

        );
    }

}

const mapStateToProps=(state)=>{
    return{
        userLvl:state.userLvl,
        page:state.page

    }   
}
const mapDispatchToProps=dispatch=>{
    return{
        handlePageChange:(page)=>dispatch({type:actionTypes.SAVE_PAGE_URL,page}),
        handlePageChange:(page)=>dispatch({type:actionTypes.SAVE_PAGE_URL,page}),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Quiz);