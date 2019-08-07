import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import '../Styles/SoundPlayer.css';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
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
    musicToPlay: ['https://www.youtube.com/watch?v=8mxe4cqtNo0', 'https://www.youtube.com/watch?v=TRXod9ILSBk', 'https://www.youtube.com/watch?v=Rlfp6-rwjUU', 'https://www.youtube.com/watch?v=6C8MwmuFsDQ', 'https://www.youtube.com/watch?v=8GfxW3oS63I', 'https://www.youtube.com/watch?v=kCvmwTIk058', 'https://www.youtube.com/watch?v=L7y0jz8joV0', 'https://www.youtube.com/watch?v=iz1xlru5k6U', 'https://www.youtube.com/watch?v=PlX9ZlDiHmw', 'https://www.youtube.com/watch?v=9RcF8uBZ3q4', 'https://www.youtube.com/watch?v=ATNP-PT3vpU', 'https://www.youtube.com/watch?v=Ybzo3rxY1bY', 'https://www.youtube.com/watch?v=g3lgYJ04cFA', 'https://www.youtube.com/watch?v=nzQLz8QcyqQ', 'https://www.youtube.com/watch?v=IoojScJfIdg', 'https://www.youtube.com/watch?v=_iFX6s_l7bs', 'https://www.youtube.com/watch?v=NyIxV3EzT-A', 'https://www.youtube.com/watch?v=43gf0R8a0GQ', 'https://www.youtube.com/watch?v=duBUQxRGEWM', 'https://www.youtube.com/watch?v=oqLysaPXkqE', 'https://www.youtube.com/watch?v=hEhWFZJDgsQ', 'https://www.youtube.com/watch?v=ZwYTDo2W6Jc', 'https://www.youtube.com/watch?v=93559nAOU9A', 'https://www.youtube.com/watch?v=13LiVkV-M9I', 'https://www.youtube.com/watch?v=Z_7JKe7Idao', 'https://www.youtube.com/watch?v=0-tDUOBKIN8', 'https://www.youtube.com/watch?v=iod7Erszuzs', 'https://www.youtube.com/watch?v=2cWu_ow99Wk', 'https://www.youtube.com/watch?v=w4j9dnRurvY', 'https://www.youtube.com/watch?v=ROaCvn5_rYA', 'https://www.youtube.com/watch?v=PS7pgJIhXiQ', 'https://www.youtube.com/watch?v=1p5PePwAYaE', 'https://www.youtube.com/watch?v=_lWI4gXU48k', 'https://www.youtube.com/watch?v=Uunxg5_RFcg', 'https://www.youtube.com/watch?v=BzvvulYyaIM', 'https://www.youtube.com/watch?v=YYSvd6uT3co', 'https://www.youtube.com/watch?v=XH5uCU4GROo', 'https://www.youtube.com/watch?v=ksuL2y8xWU8', 'https://www.youtube.com/watch?v=OYP38qW_96Q', 'https://www.youtube.com/watch?v=z0K2pmVi8Go', 'https://www.youtube.com/watch?v=15ub2_rScYE', 'https://www.youtube.com/watch?v=cxo3ZP5vKDw', 'https://www.youtube.com/watch?v=tSCGD4_CFbI', 'https://www.youtube.com/watch?v=1mnv0AuuscY', 'https://www.youtube.com/watch?v=2v0vVwe5I6Q', 'https://www.youtube.com/watch?v=_rdsLpIUX90', 'https://www.youtube.com/watch?v=QanTfzNE1Ys', 'https://www.youtube.com/watch?v=MzUr8R9ozeU', 'https://www.youtube.com/watch?v=j_KNsd44Nbc', 'https://www.youtube.com/watch?v=ePqnrsER5ig', 'https://www.youtube.com/watch?v=Zu7tiLtLYn8', 'https://www.youtube.com/watch?v=y7lLO_tKw2I', 'https://www.youtube.com/watch?v=9YnfKTahlwc', 'https://www.youtube.com/watch?v=9C9TuW1AsTg', 'https://www.youtube.com/watch?v=bE0m3FK51pg', 'https://www.youtube.com/watch?v=UzoWr2oo4mQ', 'https://www.youtube.com/watch?v=J-STI5eZFfw', 'https://www.youtube.com/watch?v=K03PVADqFug', 'https://www.youtube.com/watch?v=34MdzaewH_o', 'https://www.youtube.com/watch?v=CkjcWNSIKy4', 'https://www.youtube.com/watch?v=bOFGAISGBs0', 'https://www.youtube.com/watch?v=OBeWyuNw3eE', 'https://www.youtube.com/watch?v=SpUbOSRKdG8', 'https://www.youtube.com/watch?v=fQ94EsNi5Qs', 'https://www.youtube.com/watch?v=ej_tezPsXbE', 'https://www.youtube.com/watch?v=Wf_RnXFYKhs', 'https://www.youtube.com/watch?v=SZ7Zp2LKuRA', 'https://www.youtube.com/watch?v=wYMRqNsXCx8'],
    indexOfSongsPlayed: []
  }

  UNSAFE_componentWillMount() {
    const numberOfMusic = Math.floor(Math.random() * this.state.musicToPlay.length);
    const array = this.state.indexOfSongsPlayed
    array.push(numberOfMusic)
    this.setState({
      url: this.state.musicToPlay[numberOfMusic],
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