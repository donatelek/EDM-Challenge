import React, { Component } from 'react';
import '../Footer.css'
import SoundPlayer from './SoundPlayer.js';
import { Link } from 'react-router-dom';
class Footer extends Component {
    state = {}
    render() {
       
        const { showFooter } = this.props
        
        return (
            <>
            {showFooter?<footer style={{display:'block'}}>
                <SoundPlayer showFooter={showFooter} />
                <div className="player">PLAYER MP3</div>
                <div className="options">OPTIONS</div>
                <Link to='/contact' className="contact" >Report bugs</Link>
            </footer>:<footer>
                <SoundPlayer showFooter={showFooter} />
                <div className="player">PLAYER MP3</div>
                <div className="options">OPTIONS</div>


                

                <Link to='/contact' className="contact" >Report bugs</Link>
            </footer>}
            </>
        );
    }
}

export default Footer;