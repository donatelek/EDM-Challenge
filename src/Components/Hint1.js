import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import ReactPlayer from 'react-player'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'

class Hint1 extends Component {
    state = {
        volume: '0.3',
    }
    changeVolume = (volume) => {
        this.setState({
            volume: volume.target.value
        })
    }
    render() {
        return (
            < div className="firstFlip flip" >
                <ReactCardFlip isFlipped={this.props.isFlipped1} flipDirection="vertical">
                    <div key='front' className='front1'><LazyLoadImage
                        alt='image'
                        src={this.props.img}
                        height='100%'
                        width='100%' /></div>
                    <div key='back' className='back1'>
                        {this.props.userLvl.sound && <ReactPlayer url={require(`../mp3/${this.props.userLvl.sound}`)} width='50px' height='70px'
                            // eslint-disable-next-line
                            volume='0.3' controls={false} playing={this.props.questionHintPlaying1} volume={Number(this.state.volume)} onEnded={() => this.props.handleIsPlaying1(false)} />}
                        <div className="soundHint">
                            {this.props.userLvl.sound && <input type="range" step="any" min="0" max="1" value={this.state.volume} onChange={this.changeVolume} className='volumeChanger' />}
                            {this.props.userLvl.sound && <h1 className='soundHintPlay'>PLAY</h1>}
                            {!this.props.questionHintPlaying1 && this.props.userLvl.sound ? <i className="fas fa-play" onClick={this.props.handleIsPlaying1}></i> : null}
                            {this.props.questionHintPlaying1 && this.props.userLvl.sound ? <i className="fas fa-pause" onClick={this.props.handleIsPlaying1}></i> : null}
                            {this.props.userLvl.backgroundimg && <img src={require(`../img/${this.props.userLvl.backgroundimg}`)} alt="" className='backgroundImg3' />}
                        </div>
                    </div>
                </ReactCardFlip>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Hint1);



