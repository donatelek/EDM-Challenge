import React, { Component } from 'react';
import '../Styles/Footer.css'
import SoundPlayer from './SoundPlayer.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
class Footer extends Component {
    state = {}
    render() {

        const { showFooter } = this.props

        return (
            <>
                {showFooter ? <footer style={{ display: 'block' }}>
                    <SoundPlayer />
                    <Link to='/contact' className="contact" >Report bug</Link>
                </footer> : <footer>
                        <SoundPlayer />
                        <Link to='/contact' className="contact" >Report bug</Link>
                    </footer>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        showFooter: state.showFooter,
        soundplayerPlaying: state.soundplayerPlaying
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleTurningSoundplayer: () => dispatch({ type: actionTypes.SOUNDPLAYER_PLAYING }),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);