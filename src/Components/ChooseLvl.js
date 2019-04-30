import React, { Component } from 'react';
import '../ChooseLvl.css';
import { Link } from 'react-router-dom';
class ChooseLvl extends Component {
    state = {}
    componentDidMount(){
        const { pageChange }=this.props;
        pageChange('chooselvl')
    }
    render() {

        const { pageChange }=this.props;

        return (
            <div className="chooseLvl">
                <h1 className="lvl">Choose lvl</h1>
                <section className="lvls">
                    <Link className="easy" to='/quiz' onClick={() => {
                        pageChange('quiz')
                    }} >
                        <h1>Easy</h1>
                    </Link>
                    <article onClick={() => pageChange('quiz')} className="hard">
                        <h1>Hard</h1>
                    </article>
                </section>
                <div className="note">Next Levels will be released soon!</div>
            </div>
        );
    }
}

export default ChooseLvl;