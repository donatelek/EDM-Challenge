import React, { Component } from 'react';
import '../Styles/Footer.css'
import SoundPlayer from './SoundPlayer.js';
import { Link } from 'react-router-dom';
class Footer extends Component {
    state = {}
    render() {
       
        const { showFooter } = this.props
        
        return (
            <>
            {showFooter?<footer style={{display:'block'}}>
                <SoundPlayer showFooter={showFooter} handleTurningSoundplayer={this.props.handleTurningSoundplayer} soundplayerPlaying={this.props.soundplayerPlaying} />
                {/* <div className="player">PLAYER MP3</div>
                <div className="options">OPTIONS</div> */}
                <Link to='/contact' className="contact" >Report bug</Link>
            </footer>:<footer>
                <SoundPlayer showFooter={showFooter} handleTurningSoundplayer={this.props.handleTurningSoundplayer} soundplayerPlaying={this.props.soundplayerPlaying} />
                {/* <div className="player">PLAYER MP3</div>
                <div className="options">OPTIONS</div> */}


                

                <Link to='/contact' className="contact" >Report bug</Link>
            </footer>}
            </>
        );
    }
}

export default Footer;