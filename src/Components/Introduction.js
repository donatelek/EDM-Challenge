import React, { Component } from 'react';
import '../Styles/Introduction.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'
import * as actionCreators from '../store/actions'
class Introduction extends Component {
    state = {
        lvl: '',
    }

    componentDidMount() {
        this.props.handlePageChange('introduction')
        const userLvl = this.props.user.id;
        const numberLvl = parseInt(userLvl);
        this.props.fetchUserLvl(numberLvl)
    }
    render() {
        const { handlePageChange } = this.props;
        return (
            <div className='introduction'>
                <article className="rules">
                    <h1>Guess what is that DJ!</h1>
                    <br />
                    <ul>
                        <h2>You can get 6 points per Level</h2>
                        <li>By opening a hint you lose 2 points</li>
                        <li>By typing wrong DJ you lose 1 point</li>
                        <li>You can also skip question but you won't get any points</li>
                    </ul>
                    <br />
                    <h2>Do not use Shazam!</h2>
                    <br />
                    <h3>Link to playlist: https://bit.ly/2XFqQAg</h3>
                    <br />
                    <h3>Good Luck <i class="far fa-smile-wink"></i></h3>
                </article>
                <Link onClick={() => handlePageChange('chooselvl')} className="ok" to='/lvl'>Let's Play</Link>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUserLvl: (numberLvl) => dispatch(actionCreators.fetchUserLvl(numberLvl)),
        handlePageChange: (page) => dispatch({ type: actionTypes.SAVE_PAGE_URL, page }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);