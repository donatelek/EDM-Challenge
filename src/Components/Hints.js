import React, { Component } from 'react';
import '../Styles/Hints.css';
import changeEasy from '../img/change.jpg'
import changeHard from '../img/change3.jpg'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'

import Hint1 from './Hint1'
import Hint2 from './Hint2'
import Hint3 from './Hint3'

class Hints extends Component {
    state = {
        isFlipped1: false,
        isFlipped2: false,
        isFlipped3: false,
    }
    componentDidMount() {
        const { user } = this.props;
        setTimeout(() => {
            this.setState({
                isFlipped1: true
            })
        }, 1250)
        if (this.props.lvlDifficulty === 'easy') {
            if (user.usedhints === 1) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true
                })
            } else if (user.usedhints === 2) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true,
                    isFlipped3: true
                })
            }
        } else if (this.props.lvlDifficulty === 'hard') {
            if (user.usedhintshard === 1) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true
                })
            } else if (user.usedhintshard === 2) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true,
                    isFlipped3: true
                })
            }
        }

    }
    componentDidUpdate() {
        const { user, turnAnimation } = this.props;
        const { isFlipped1, isFlipped2, isFlipped3 } = this.state;

        if (this.props.lvlDifficulty === 'easy') {
            if (user.usedhints === 1 && isFlipped2 === false) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true
                })
            } else if (user.usedhints === 2 && isFlipped3 === false) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true,
                    isFlipped3: true
                })
            } else if (user.usedhints === 0 && isFlipped2 === true) {
                this.setState({
                    isFlipped1: false,
                    isFlipped2: false,
                    isFlipped3: false
                })
            } else if (user.usedhints === 0 && turnAnimation === true && isFlipped1 === true) {
                this.setState({
                    isFlipped1: false
                })
            } else if (user.usedhints === 0 && turnAnimation === false && isFlipped1 === false) {
                this.setState({
                    isFlipped1: true
                })
            }
        } else if (this.props.lvlDifficulty === 'hard') {
            if (user.usedhintshard === 1 && isFlipped2 === false) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true
                })
            } else if (user.usedhintshard === 2 && isFlipped3 === false) {
                this.setState({
                    isFlipped1: true,
                    isFlipped2: true,
                    isFlipped3: true
                })
            } else if (user.usedhintshard === 0 && isFlipped2 === true) {
                this.setState({
                    isFlipped1: false,
                    isFlipped2: false,
                    isFlipped3: false
                })
            } else if (user.usedhintshard === 0 && turnAnimation === true && isFlipped1 === true) {
                this.setState({
                    isFlipped1: false
                })
            } else if (user.usedhintshard === 0 && turnAnimation === false && isFlipped1 === false) {
                this.setState({
                    isFlipped1: true
                })
            }
        }

    }

    handleClick2 = () => {
        this.setState({
            isFlipped2: !this.state.isFlipped2
        })
    }

    handleClick3 = () => {
        this.setState({
            isFlipped3: !this.state.isFlipped3
        })
    }

    render() {
        const { isFlipped1, isFlipped2, isFlipped3 } = this.state;
        const { handleShowHint1, updateLocalStorage, turnAnimation, handleShowHint2, user } = this.props;
        let boxClass = ["quizHints"];
        if (turnAnimation) {
            boxClass.push('addAnimation');
        }
        let img = ''
        if (this.props.lvlDifficulty === 'easy') {
            img = changeEasy
        } else if (this.props.lvlDifficulty === 'hard') {
            img = changeHard
        }
        return (
            <div className={boxClass.join(' ')}>
                <Hint1 isFlipped1={isFlipped1} updateLocalStorage={updateLocalStorage} img={img} />
                <Hint2 handleShowHint1={handleShowHint1} isFlipped2={isFlipped2} updateLocalStorage={updateLocalStorage} img={img} handleClick2={this.handleClick2} />
                <Hint3 handleShowHint2={handleShowHint2} isFlipped3={isFlipped3} updateLocalStorage={updateLocalStorage} user={user} handleClick3={this.handleClick3} img={img} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userLvl: state.userLvl,
        user: state.user,
        questionHintPlaying1: state.questionHintPlaying1,
        questionHintPlaying2: state.questionHintPlaying2,
        questionHintPlaying3: state.questionHintPlaying3,
        lvlDifficulty: state.lvlDifficulty
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleIsPlaying1: (isHintPlaying) => dispatch({ type: actionTypes.QUESTION_HINT_PLAYING1, isHintPlaying }),
        handleIsPlaying2: (isHintPlaying) => dispatch({ type: actionTypes.QUESTION_HINT_PLAYING2, isHintPlaying }),
        handleIsPlaying3: (isHintPlaying) => dispatch({ type: actionTypes.QUESTION_HINT_PLAYING3, isHintPlaying })
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Hints);