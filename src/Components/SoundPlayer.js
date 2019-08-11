import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import '../Styles/SoundPlayer.css';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
import { url } from '../store/actions'

class SoundPlayer extends Component {
  state = {
    playing: this.props.soundplayerPlaying,
    volume: 0.1,
    played: 0,
    duration: null,
    url: '',
    widthOfPlayer: '320px',
    heightOfPlayer: '120px',
    indexOfMusic: null,
    musicToPlay: [],
    indexOfSongsPlayed: []
  }

  async componentWillMount() {
    const response = await fetch(`${url}music`)
    const json = await response.json()
    const songList = json.songList
    this.setState({
      musicToPlay: songList
    })
    const numberOfMusic = Math.floor(Math.random() * songList.length);
    const array = this.state.indexOfSongsPlayed
    array.push(numberOfMusic)
    this.setState({
      url: songList[numberOfMusic],
      indexOfSongsPlayed: array
    })
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()

  }
  resize() {
    if (window.innerWidth <= 535) {
      this.setState({
        widthOfPlayer: '100px',
        heightOfPlayer: '60px'
      })
    } else if (window.innerHeight <= 735) {
      this.setState({
        widthOfPlayer: '100px',
        heightOfPlayer: '60px'
      })
    } else {
      this.setState({
        widthOfPlayer: '230px',
        heightOfPlayer: '120px'
      })
    }
  }

  changeVolume = (volume) => {
    this.setState({
      volume: volume.target.value
    })
  }
  changePlaying = () => {
    this.setState({
      playing: !this.state.playing
    })
  }
  played = (e) => {
    this.setState({
      played: parseFloat(e.target.value)
    })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onDuration = (duration) => {
    this.setState({ duration })
  }

  skipMusic = () => {
    this.setState({
      played: this.state.duration - 1,
      seeking: true
    })
    this.player.seekTo(0.9999)
  }

  nextSong = () => {
    const numberOfMusic = Math.floor(Math.random() * this.state.musicToPlay.length);
    const array = this.state.indexOfSongsPlayed
    array.push(numberOfMusic)
    this.setState({
      indexOfSongsPlayed: array,
      url: this.state.musicToPlay[numberOfMusic]
    })
  }
  previousSong = () => {
    if (this.state.indexOfSongsPlayed.length > 1) {
      const array = this.state.indexOfSongsPlayed
      array.splice(-1, 1)
      this.setState({
        url: this.state.musicToPlay[this.state.indexOfSongsPlayed[this.state.indexOfSongsPlayed.length - 1]]
      })
      setTimeout(() => {
        this.setState({
          indexOfSongsPlayed: array
        })
      }, 100)
    }
  }

  ref = player => {
    this.player = player
  }

  render() {
    const { heightOfPlayer, widthOfPlayer, url, volume } = this.state
    const { ref, nextSong, onProgress, onDuration, changeVolume, changePlaying, previousSong, skipMusic } = this;
    const { soundplayerPlaying, handleTurningSoundplayer } = this.props;

    return (
      <div className="soundPlayer">
        <div className="blur"></div>
        <ReactPlayer ref={ref} className='reactPlayer' url={url} onEnded={nextSong} width={widthOfPlayer} height={heightOfPlayer} onProgress={onProgress}
          onDuration={onDuration} playing={soundplayerPlaying} volume={Number(volume)} />
        <input type="range" step="any" min="0" max="1" value={volume} onChange={changeVolume} className='focused range' />
        {!soundplayerPlaying && <i className="fas fa-play" onClick={() => {
          changePlaying()
          handleTurningSoundplayer()
        }}></i>}
        {soundplayerPlaying && <i className="fas fa-pause" onClick={() => {
          changePlaying()
          handleTurningSoundplayer()
        }}></i>}
        <i className="fas fa-forward front" onClick={skipMusic}></i>
        <i className="fas fa-forward back" onClick={previousSong}></i>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    soundplayerPlaying: state.soundplayerPlaying
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleTurningSoundplayer: () => dispatch({ type: actionTypes.SOUNDPLAYER_PLAYING })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundPlayer);