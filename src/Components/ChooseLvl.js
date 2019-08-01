import React, { Component } from 'react';
import '../Styles/ChooseLvl.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
class ChooseLvl extends Component {
    state = {}
    componentWillMount() {
        const { handlePageChange } = this.props;
        handlePageChange('chooselvl')
    }
    render() {
        const { handlePageChange } = this.props;

        return (
            <div className="chooseLvl">
                <h1 className="lvl">Choose lvl</h1>
                <section className="lvls">
                    <Link className="easy" to='/quiz' onClick={() => {
                        handlePageChange('/quiz')
                    }} >
                        <h1>Easy</h1>
                    </Link>
                    <article onClick={() => handlePageChange('quiz')} className="hard">
                        <h2>Not available</h2>
                    </article>
                </section>
                <div className="note">Next Levels will be released soon!</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handlePageChange: (page) => dispatch({ type: actionTypes.SAVE_PAGE_URL, page }),
    }
}

export default connect(null, mapDispatchToProps)(ChooseLvl);