import React, { Component } from 'react';
import '../Introduction.css';
import { Link } from 'react-router-dom';

class Introduction extends Component {
    state = {
        lvl: '',
    }

UNSAFE_componentWillMount(){
    this.props.pageChange('introduction')
}

componentDidMount() {
    console.log('aaaaaaaaa')
const { changingKej,changeDownloadLvl,userId,setUserLvl }=this.props;
 changingKej('843');
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
                <h1 className="rules">RULES OF GAME</h1>
                <article className="rules">Zgadnij jaki to dj, za jeden poziom możesz zdobyć maksymalnie 6 pkt. Jedna podpowiedz -2pkt  złe trafienie -1pkt jeśli nie znasz odpowiedzi możesz ominąć pytanie nie zyskując żadnych punktów Link do playlisty: https://www.youtube.com/watch?v=AKNIO4aYAPg Dont forget to turn up the volume!</article>
                <Link onClick={() => pageChange('chooselvl')} className="ok" to='/lvl'>Let's Play</Link>
            </div>
        );
    }
}

export default Introduction;