import React, { Component } from 'react';
import '../Styles/Introduction.css';
import { Link } from 'react-router-dom';

class Introduction extends Component {
    state = {
        lvl: '',
    }

componentDidMount() {
    this.props.pageChange('introduction')
    const { changeDownloadLvl,userId,setUserLvl }=this.props;
    changeDownloadLvl();
    const userLvl = userId;
    const numberLvl = parseInt(userLvl);
    fetch(`https://pure-dawn-32038.herokuapp.com/getlvl/${numberLvl}`, {
     headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json()).then(res => {
     setUserLvl(res)
      }).catch(err => console.log(err))
    }
    render() {
        const { pageChange }=this.props;
        return (
            <div className='introduction'>
                {/* <h1 className="rules">RULES OF GAME</h1> */}
                <article className="rules">
                    <h1>Guess what is that DJ!</h1>
                    <br/>
                    <ul>
                        <h2>You can get 6 points per Level</h2>
                       
                        <li>By opening a hint you lose 2 points</li>
                        <li>By typing wrong DJ you lose 1 point</li>
                        <li>You can also skip question but you won't get any points</li>
                    </ul>
                    <br/>
                    <h2>Do not use Shazam!</h2>
                    <br/>
                    <h3>Link to playlist: https://bit.ly/2XFqQAg</h3>
                    <br/>
                    <h3>Good Luck :)</h3>
                </article>
                <Link onClick={() => pageChange('chooselvl')} className="ok" to='/lvl'>Let's Play</Link>
            </div>
        );
    }
}

export default Introduction;