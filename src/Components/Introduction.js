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
const { changingKej,changeDownloadLvl,userId,setUserLvl }=this.props;
 changingKej('843');
 changeDownloadLvl();
 const userLvl = userId;
 const numberLvl = parseInt(userLvl);
 fetch(`https://secure-brook-39660.herokuapp.com/getlvl/${numberLvl}`, {
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
                <article className="rules">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat soluta blanditiis harum sunt, numquam quis distinctio repellat quos a voluptates quibusdam laborum maxime? Quia perspiciatis exercitationem labore, laudantium fugiat quos?
                Saepe obcaecati quisquam vel hic recusandae error praesentium quaerat tempore, optio, expedita totam voluptatem neque! Laborum labore reiciendis quos numquam, aperiam accusamus cum praesentium, qui cumque at, error repellendus ad?
                Laudantium nemo, quasi porro explicabo minus, ratione eius nostrum magni id, dicta eos? Iste ut hic illo est placeat exercitationem libero. Amet, iste voluptates! Est itaque consectetur possimus. Dolor, perspiciatis!</article>
                <Link onClick={() => pageChange('chooselvl')} className="ok" to='/lvl'>Let's Play</Link>
            </div>
        );
    }
}

export default Introduction;