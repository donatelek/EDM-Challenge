

import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import ReactPlayer from 'react-player'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'

class Hint3 extends Component {
    state = {
        volume: '0.3'
    }
    changeVolume = (volume) => {
        this.setState({
            volume: volume.target.value
        })
    }
    render() {
        return (
            <div className="thirdFlip flip">
                <ReactCardFlip isFlipped={this.props.isFlipped3} flipDirection="vertical">
                    <div className='front3' key='front' onClick={() => {
                        if (this.props.lvlDifficulty === 'easy') {
                            if (this.props.user.usedhints === 1) {
                                this.props.handleClick3()
                                this.props.handleShowHint2()
                                setTimeout(() => {
                                    this.props.updateLocalStorage()
                                }, 250)
                            }
                        } else if (this.props.lvlDifficulty === 'hard') {
                            if (this.props.user.usedhintshard === 1) {
                                this.props.handleClick3()
                                this.props.handleShowHint2()
                                setTimeout(() => {
                                    this.props.updateLocalStorage()
                                }, 250)
                            }
                        }

                    }}><LazyLoadImage
                            alt='image'
                            src={this.props.img}
                            height='100%'
                            width='100%' /></div>
                    <div key='back' className='back3'>
                        {this.props.userLvl.sound3 && <ReactPlayer url={require(`../mp3/${this.props.userLvl.sound3}`)} width='50px' height='70px' volume='0.3'
                            // eslint-disable-next-line
                            controls={false} playing={this.props.questionHintPlaying3} volume={Number(this.state.volume)} onEnded={() => this.props.handleIsPlaying3(false)} />}
                        <div className="soundHint">
                            {this.props.userLvl.sound3 && <input type="range" step="any" min="0" max="1" value={this.state.volume} onChange={this.changeVolume} className='volumeChanger' />}
                            {!this.props.questionHintPlaying3 && this.props.userLvl.sound3 ? <i className="fas fa-play" onClick={this.props.handleIsPlaying3}></i> : null}
                            {this.props.userLvl.sound3 && <h1 className='soundHintPlay'>PLAY</h1>}
                            {this.props.questionHintPlaying3 && this.props.userLvl.sound3 ? <i className="fas fa-pause" onClick={this.props.handleIsPlaying3}></i> : null}
                            {this.props.userLvl.backgroundimg3 && <img src={require(`../img/${this.props.userLvl.backgroundimg3}`)} alt="" className='backgroundImg3' />}
                        </div>
                    </div>
                </ReactCardFlip>
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

export default connect(mapStateToProps, mapDispatchToProps)(Hint3);



