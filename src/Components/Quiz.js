import React, { Component } from 'react';
import '../Styles/Quiz.css'
import Hints from './Hints';
import Answer from './Answer';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
class Quiz extends Component {
    state = {
        turnAnimation: false,
        lvlPassword: '',
        showLvlPasswordAnimation: false,
        gainedPoints: null,
        showGainedPointsAnimation: false
    }

    componentWillMount() {
        this.props.handlePageChange('/quiz')
        const storage = localStorage.getItem('lvl')
        this.props.handleChooseLvl(storage)
    }

    handleGainedPoints = (failedAttempts, usedHints) => {
        this.handleShowGainedPointsAnimation()

        const numberFailedAttempts = Number(failedAttempts)
        const numberUsedHints = Number(usedHints)
        let gainedPoints = 6 - numberUsedHints * 2 - numberFailedAttempts
        if (isNaN(gainedPoints)) {
            gainedPoints = 'Error'
        }
        if (gainedPoints < 1) {
            gainedPoints = 0
        }
        this.setState({
            gainedPoints
        })
    }
    handleShowLvlPasswordOnSkip = (lvl) => {
        if (this.props.lvlDifficulty === 'easy') {
            fetch(`https://pure-dawn-32038.herokuapp.com/getlvlpassword/${lvl}`).then(res => {
                return res.json()
            }).then(lvlPassword => {
                this.setState({
                    lvlPassword: lvlPassword.toUpperCase()
                })
            })
        } else if (this.props.lvlDifficulty === 'hard') {
            fetch(`https://pure-dawn-32038.herokuapp.com/getlvlpasswordhard/${lvl}`).then(res => {
                return res.json()
            }).then(lvlPassword => {
                this.setState({
                    lvlPassword: lvlPassword.toUpperCase()
                })
            })
        }

    }
    handleShowLvlPasswordAnimation = () => {
        setTimeout(() => {
            this.setState({
                showLvlPasswordAnimation: true
            })
        }, 900)
        setTimeout(() => {
            this.setState({
                showLvlPasswordAnimation: false
            })
        }, 2700)
    }
    handleShowGainedPointsAnimation = () => {
        setTimeout(() => {
            this.setState({
                showGainedPointsAnimation: true
            })
        }, 900)
        setTimeout(() => {
            this.setState({
                showGainedPointsAnimation: false
            })
        }, 2700)
    }

    animationOnGoodAnswer = () => {
        this.setState({
            turnAnimation: true
        })
        setTimeout(() => {
            this.setState({
                turnAnimation: false
            })
        }, 4100)
    }

    render() {
        const { turnAnimation, showLvlPasswordAnimation, showGainedPointsAnimation } = this.state;
        const { userLvl, doubledouble1, doubledouble2, updateLocalStorage, resetFailedAttempts, updateFailedAttempts } = this.props;
        const { animationOnGoodAnswer } = this;
        if (this.props.easyLvlDone && this.props.page !== 'scoreboard' && this.props.lvlDifficulty === 'easy') {
            this.props.handlePageChange('scoreboard')
            this.props.history.push('/scoreboard')
        } else if (this.props.hardLvlDone && this.props.page !== 'scoreboard' && this.props.lvlDifficulty === 'hard') {
            this.props.handlePageChange('scoreboard')
            this.props.history.push('/scoreboard')
        }
        return (
            <div className="quiz">
                <h1 className="questionNumber">Question number: {turnAnimation ? <span className='fadeNumber'>{userLvl.lvlnumber}</span> : <span>{userLvl.lvlnumber}</span>}</h1>
                {turnAnimation ? <h2 className="category fadeNumber">{userLvl.category}</h2> : <h2 className="category">{userLvl.category}</h2>}
                {showLvlPasswordAnimation && <div className="popupAnswer">{this.state.lvlPassword}</div>}
                {showGainedPointsAnimation && <div className="popupAnswer">+ {this.state.gainedPoints}</div>}
                <Hints turnAnimation={turnAnimation} doubledouble2={doubledouble2} doubledouble1={doubledouble1} updateLocalStorage={updateLocalStorage} />
                <Answer turnAnimation={turnAnimation} animationOnGoodAnswer={animationOnGoodAnswer} doubledouble1={doubledouble1} updateLocalStorage={updateLocalStorage} resetFailedAttempts={resetFailedAttempts} updateFailedAttempts={updateFailedAttempts} handleShowLvlPasswordOnSkip={this.handleShowLvlPasswordOnSkip} handleShowLvlPasswordAnimation={this.handleShowLvlPasswordAnimation} handleGainedPoints={this.handleGainedPoints} handleShowGainedPointsAnimation={this.handleShowGainedPointsAnimation} />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLvl: state.userLvl,
        page: state.page,
        lvlDifficulty: state.lvlDifficulty,
        easyLvlDone: state.easyLvlDone,
        hardLvlDone: state.hardLvlDone
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handlePageChange: (page) => dispatch({ type: actionTypes.SAVE_PAGE_URL, page }),
        handleChooseLvl: (lvl) => dispatch({ type: actionTypes.SAVE_CHOOSE_LVL, lvl })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);