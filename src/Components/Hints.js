import React, { Component } from 'react';
import '../Styles/Hints.css';
import ReactCardFlip from 'react-card-flip';
import change from '../img/change.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
class Hints extends Component {
    state = {
        isFlipped1: false,
        isFlipped2: false,
        isFlipped3: false,
        // playing:false,
        // playing2:false,
        // playing3:false,
        volume: '0.3',
        volume2: '0.3',
        volume3: '0.3'
    }
    componentDidMount() {
        const { user } = this.props;
        setTimeout(() => {
            this.setState({
                isFlipped1: true
            })
        }, 1250)
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
    }
    componentDidUpdate() {
        const { user, turnAnimation } = this.props;
        const { isFlipped1, isFlipped2, isFlipped3 } = this.state;

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
    }
    changeVolume = (volume) => {
        this.setState({
            volume: volume.target.value
        })
    }

    changeVolume2 = (volume) => {
        this.setState({
            volume2: volume.target.value
        })
    }

    changeVolume3 = (volume) => {
        this.setState({
            volume3: volume.target.value
        })
    }

    // changePlaying = () => {
    //     if(this.props.soundplayerPlaying&&!this.state.playing){
    //         this.props.handleTurningSoundplayer()
    //     }
    //     this.setState({
    //         playing: !this.state.playing
    //     })
    // }

    // changePlaying2 = () => {
    //     if(this.props.soundplayerPlaying&&!this.state.playing2){
    //         this.props.handleTurningSoundplayer()
    //     }
    //     this.setState({
    //         playing2: !this.state.playing2
    //     })
    // }

    // changePlaying3 = () => {
    //     if(this.props.soundplayerPlaying&&!this.state.playing3){
    //         this.props.handleTurningSoundplayer()
    //     }
    //     this.setState({
    //         playing3: !this.state.playing2
    //     })
    // }

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

    //   onEnded=()=>{
    //       this.setState({
    //           playing:false
    //       })
    //   }

    //   onEnded2=()=>{
    //     this.setState({
    //         playing2:false
    //     })
    // }

    // onEnded3=()=>{
    //     this.setState({
    //         playing3:false
    //     })
    // }

    render() {
        const { isFlipped1, isFlipped2, isFlipped3 } = this.state;
        const { doubledouble1, updateLocalStorage, turnAnimation, doubledouble2, user } = this.props;

        let boxClass = ["quizHints"];
        if (turnAnimation) {
            boxClass.push('addAnimation');
        }
        return (
            <div className={boxClass.join(' ')}>
                <div className="firstFlip flip">
                    <ReactCardFlip isFlipped={isFlipped1} flipDirection="vertical">
                        <div key='front' className='front1'><LazyLoadImage
                            alt='image'
                            src={change}
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
                </div>

                <div className="secondFlip flip">
                    <ReactCardFlip isFlipped={isFlipped2} flipDirection="vertical">
                        <div key='front' className='front2' onClick={() => {
                            this.handleClick2()
                            doubledouble1()
                            setTimeout(() => {
                                updateLocalStorage()
                            }, 250)
                        }} >
                            <LazyLoadImage
                                alt='image'
                                src={change}
                                height='100%'
                                width='100%' />
                        </div>
                        <div key='back' className='back2'>
                            {this.props.userLvl.sound2 && <ReactPlayer url={require(`../mp3/${this.props.userLvl.sound2}`)} width='50px' height='70px'
                                // eslint-disable-next-line
                                volume='0.3' controls={false} playing={this.props.questionHintPlaying2} volume={Number(this.state.volume2)} onEnded={() => this.props.handleIsPlaying2(false)} />}
                            <div className="soundHint">
                                {this.props.userLvl.sound2 && <input type="range" step="any" min="0" max="1" value={this.state.volume2} onChange={this.changeVolume2} className='volumeChanger' />}
                                {this.props.userLvl.sound2 && <h1 className='soundHintPlay'>PLAY</h1>}
                                {!this.props.questionHintPlaying2 && this.props.userLvl.sound2 ? <i className="fas fa-play" onClick={this.props.handleIsPlaying2}></i> : null}
                                {this.props.questionHintPlaying2 && this.props.userLvl.sound2 ? <i className="fas fa-pause" onClick={this.props.handleIsPlaying2}></i> : null}
                                {this.props.userLvl.backgroundimg2 && <img src={require(`../img/${this.props.userLvl.backgroundimg2}`)} alt="" className='backgroundImg3' />}
                            </div>
                        </div>
                    </ReactCardFlip>
                </div>

                <div className="thirdFlip flip">
                    <ReactCardFlip isFlipped={isFlipped3} flipDirection="vertical">
                        <div className='front3' key='front' onClick={() => {
                            if (user.usedhints === 1) {
                                this.handleClick3()
                                doubledouble2()
                                setTimeout(() => {
                                    updateLocalStorage()
                                }, 250)
                            }
                        }}><LazyLoadImage
                                alt='image'
                                src={change}
                                height='100%'
                                width='100%' /></div>
                        <div key='back' className='back3'>
                            {this.props.userLvl.sound3 && <ReactPlayer url={require(`../mp3/${this.props.userLvl.sound3}`)} width='50px' height='70px' volume='0.3'
                                // eslint-disable-next-line
                                controls={false} playing={this.props.questionHintPlaying3} volume={Number(this.state.volume3)} onEnded={() => this.props.handleIsPlaying3(false)} />}
                            <div className="soundHint">
                                {this.props.userLvl.sound3 && <input type="range" step="any" min="0" max="1" value={this.state.volume3} onChange={this.changeVolume3} className='volumeChanger' />}
                                {!this.props.questionHintPlaying3 && this.props.userLvl.sound3 ? <i className="fas fa-play" onClick={this.props.handleIsPlaying3}></i> : null}
                                {this.props.userLvl.sound3 && <h1 className='soundHintPlay'>PLAY</h1>}
                                {this.props.questionHintPlaying3 && this.props.userLvl.sound3 ? <i className="fas fa-pause" onClick={this.props.handleIsPlaying3}></i> : null}
                                {this.props.userLvl.backgroundimg3 && <img src={require(`../img/${this.props.userLvl.backgroundimg3}`)} alt="" className='backgroundImg3' />}
                            </div>
                        </div>
                    </ReactCardFlip>
                </div>
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
        questionHintPlaying3: state.questionHintPlaying3
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