import React, { Component } from 'react';
import '../Styles/Answer.css';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions'
import * as actionTypes from '../store/actions'
class Answer extends Component {
    state = {
        passwordInput: '',
        user: '',
        answerInput: '',
        arrayOfWrongAnswers: ['Nope, thats not him!', 'Not this time!', 'Try again!', 'Bad answer!', 'You are so close!', 'Nah, dont give up!'],
        wrongAnswer: 'Bad answer!',
        isWrongAnswer: false,
    }

    handlePasswordChange = (e) => {
        this.setState({
            passwordInput: e.target.value
        })
    }
    changeWrongAnswer = () => {
        const index = Math.floor(Math.random() * this.state.arrayOfWrongAnswers.length);
        this.setState({
            isWrongAnswer: true,
            wrongAnswer: this.state.arrayOfWrongAnswers[index]
        })
        setTimeout(() => {
            this.setState({
                isWrongAnswer: false
            })
        }, 2500)
    }

    checkAnswer = () => {
        if (this.state.answerInput.trim() === '') {
            return
        }
        fetch('https://pure-dawn-32038.herokuapp.com/password', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lvl: this.props.userLvl.lvlnumber,
                password: this.state.answerInput.toLowerCase(),
                lvlDifficulty: this.props.lvlDifficulty
            })
        }).then(res => res.json()).then(res => {
            const { handleNextLvl, animationOnGoodAnswer, handleUserPoints, resetUsedHints, resetFailedAttempts, updateLocalStorage, updateFailedAttempts, user, handleGainedPoints, handleIsPlaying1, handleIsPlaying2, handleIsPlaying3 } = this.props;
            if (res === 'true') {
                handleIsPlaying1(false)
                handleIsPlaying2(false)
                handleIsPlaying3(false)
                handleNextLvl(user.id, this.props.lvlDifficulty);
                animationOnGoodAnswer();
                if (this.props.lvlDifficulty === 'easy') {
                    handleGainedPoints(user.failedattempts, user.usedhints)
                } else if (this.props.lvlDifficulty === 'hard') {
                    handleGainedPoints(user.failedattemptshard, user.usedhintshard)
                }
                handleUserPoints(user.id, this.props.lvlDifficulty);
                resetUsedHints(user.id, this.props.lvlDifficulty);
                resetFailedAttempts();
                this.setState({
                    answerInput: ''
                })
                setTimeout(() => {
                    updateLocalStorage()
                }, 500)
            } else {
                this.changeWrongAnswer()
                updateFailedAttempts()
                setTimeout(() => {
                    updateLocalStorage()
                }, 250)
            }
        }).catch(err => console.log(err))
    }

    handleInputAnswer = (e) => {
        this.setState({
            answerInput: e.target.value
        })
    }
    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.checkAnswer()
        }
    }
    showPoints = () => {
        const { turnAnimation, user } = this.props;
        if (this.props.lvlDifficulty === 'easy') {
            if (turnAnimation) {
                return (
                    <div className="points">Your points: <span className='fadePoints'>{user.easylvl}</span></div>
                )
            } else {
                return (
                    <div className="points" >Your points: <span>{user.easylvl}</span></div>
                )
            }
        } else if (this.props.lvlDifficulty === 'hard') {
            if (turnAnimation) {
                return (
                    <div className="points">Your points: <span className='fadePoints'>{user.hardmode}</span></div>
                )
            } else {
                return (
                    <div className="points" >Your points: <span>{user.hardmode}</span></div>
                )
            }
        }
    }
    render() {

        const { isWrongAnswer, answerInput, wrongAnswer } = this.state;
        const { animationOnGoodAnswer, handleNextLvl, resetUsedHints, resetFailedAttempts, updateLocalStorage, user, userLvl, handleShowLvlPasswordAnimation, handleIsPlaying1, handleIsPlaying2, handleIsPlaying3 } = this.props;
        const { checkAnswer, handleInputAnswer } = this;

        return (
            <>
                <div className="answer">
                    <input onChange={handleInputAnswer} type="text" value={answerInput} className='inputAnswer' placeholder='Answer...' spellCheck="false" onKeyPress={this.handleKeyPress} />
                    <br />
                    {isWrongAnswer && <div className="wrongAnswer">{wrongAnswer}</div>}
                    <br />
                    <button className='check' onClick={checkAnswer}>Check</button>
                    <button onClick={() => {
                        this.props.handleShowLvlPasswordOnSkip(userLvl.lvlnumber)
                        animationOnGoodAnswer();
                        handleShowLvlPasswordAnimation();
                        handleNextLvl(user.id, this.props.lvlDifficulty)
                        resetUsedHints(user.id, this.props.lvlDifficulty)
                        handleIsPlaying1(false)
                        handleIsPlaying2(false)
                        handleIsPlaying3(false)
                        setTimeout(() => {
                            resetFailedAttempts()
                        }, 100)
                        setTimeout(() => {
                            updateLocalStorage()
                        }, 250)
                    }} className="skip">SKIP</button>
                    {/* {turnAnimation && this.props.lvlDifficulty === 'easy' ? <div className="points">Your points: <span className='fadePoints'>{user.easylvl}</span></div> : <div className="points" >Your points: <span>{user.easylvl}</span></div>}
                    {turnAnimation && this.props.lvlDifficulty === 'hard' ? <div className="points">Your points: <span className='fadePoints'>{user.hardmode}</span></div> : <div className="points" >Your points: <span>{user.hardmode}</span></div>} */}
                    {this.showPoints()}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userLvl: state.userLvl,
        user: state.user,
        lvlDifficulty: state.lvlDifficulty
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleUserPoints: (id, lvl) => dispatch(actionCreators.handleUserPoints(id, lvl)),
        handleNextLvl: (id, lvl) => dispatch(actionCreators.handleNextLvl(id, lvl)),
        resetUsedHints: (id, lvl) => dispatch(actionCreators.resetUsedHints(id, lvl)), handleIsPlaying1: (isHintPlaying) => dispatch({ type: actionTypes.QUESTION_HINT_PLAYING1, isHintPlaying }),
        handleIsPlaying2: (isHintPlaying) => dispatch({ type: actionTypes.QUESTION_HINT_PLAYING2, isHintPlaying }),
        handleIsPlaying3: (isHintPlaying) => dispatch({ type: actionTypes.QUESTION_HINT_PLAYING3, isHintPlaying })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Answer);