import React, { Component } from 'react';
import '../Styles/Quiz.css'
import Hints from './Hints';
import Answer from './Answer';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
class Quiz extends Component {
    state = {
        turnAnimation:false
    }

    componentWillMount(){
        this.props.handlePageChange('/quiz')
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

        const { turnAnimation} = this.state;
        const { userLvl,doubledouble1,doubledouble2,updateLocalStorage,resetFailedAttempts,updateFailedAttempts } = this.props;
        const { animationOnGoodAnswer, }= this;
       console.log('eee')
        if(userLvl==='END'&&this.props.page!=='scoreboard'){
            console.log('jestem')
            this.props.handlePageChange('scoreboard')
            this.props.history.push('/scoreboard')
          }
        return (
            <div className="quiz">

                <h1 className="questionNumber">Question number: {turnAnimation?<span className='fadeNumber'>{userLvl.lvlnumber}</span>:<span>{userLvl.lvlnumber}</span>}</h1>
                {turnAnimation?<h2 className="category fadeNumber">{userLvl.category}</h2>:<h2 className="category">{userLvl.category}</h2>}

                <Hints turnAnimation={turnAnimation} doubledouble2={doubledouble2} doubledouble1={doubledouble1} updateLocalStorage={updateLocalStorage}/>

                <Answer turnAnimation={turnAnimation} animationOnGoodAnswer={animationOnGoodAnswer} doubledouble1={doubledouble1} updateLocalStorage={updateLocalStorage} resetFailedAttempts={resetFailedAttempts} updateFailedAttempts={updateFailedAttempts}/>

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