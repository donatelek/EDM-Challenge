import React, { Component } from 'react';
import '../Styles/ChooseLvl.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
import * as actionCreators from '../store/actions'
class ChooseLvl extends Component {
    state = {}
    componentWillMount() {
        const { handlePageChange } = this.props;
        handlePageChange('chooselvl')
    }
    componentDidMount() {
        this.props.handleChooseLvl('')
    }
    handleChooseLvl = lvl => {
        this.props.handleChooseLvl(lvl)
        const userLvl = this.props.user.id;
        const numberLvl = parseInt(userLvl);
        this.props.fetchUserLvl(numberLvl, lvl)
    }
    render() {
        const { handlePageChange } = this.props;
        const { handleChooseLvl } = this;

        return (
            <div className="chooseLvl">
                <h1 className="lvl">Choose lvl</h1>
                <section className="lvls">
                    <Link className="easy" to='/quiz' onClick={() => {
                        handlePageChange('/quiz')
                        handleChooseLvl('easy')
                        localStorage.setItem('lvl', 'easy')

                    }} >
                        <h1>Easy</h1>
                    </Link>
                    <Link className="hard" to='/quiz' onClick={() => {
                        handlePageChange('/quiz')
                        handleChooseLvl('hard')
                        localStorage.setItem('lvl', 'hard')

                    }} >
                        <h1>Easy</h1>
                    </Link>
                </section>
                <div className="note">Next Levels will be released soon!</div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        lvlDifficulty: state.lvlDifficulty
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleChooseLvl: (lvl) => dispatch({ type: actionTypes.SAVE_CHOOSE_LVL, lvl }),
        handlePageChange: (page) => dispatch({ type: actionTypes.SAVE_PAGE_URL, page }),
        fetchUserLvl: (numberLvl, lvl) => dispatch(actionCreators.fetchUserLvl(numberLvl, lvl))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLvl);