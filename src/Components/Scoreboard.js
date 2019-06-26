import React, { Component } from 'react';
import '../Styles/Scoreboard.css';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions'
import * as actionCreators from '../store/actions'
class Scoreboard extends Component {
    state = {
        top10: ''
    }

    UNSAFE_componentWillMount() {
        this.props.handlePageChange('scoreboard')
        fetch('http://localhost:3000/scoreboard', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(res => {
            const sorting = res.sort((a, b) => {
                const A = a.easylvl;
                const B = b.easylvl;
                return B - A;
            })
            this.setState({
                top10: sorting
            })
        }).catch(err => console.log(err))
    }

    render() {
        const { top10 } = this.state;
        let users
        if (top10) {
            users = top10.map((user, index) => {
                if (!user.username) {
                    return null
                } else {
                    return (
                        <React.Fragment key={index}>
                            <li className='username' >{user.username}</li>
                            <li className='points'>{user.easylvl}</li>
                        </React.Fragment>
                    )
                }
            })
        }
        if (users) {
            for (let i = 0; i <= users.length; i++) {
                const index = users.indexOf(null)
                users.splice(index, 1)
            }
            users.splice(10, users.length)
        }

        return (
            <div className="scoreboard">
                <h1 className='titleScoreboard'>SCOREBOARD</h1>
                <h3>TOP 10</h3>
                <div className="scoreboardTitles">
                    <h2 className="name">NAME</h2>
                    <h2 className="points">POINTS</h2>
                </div>
                <ul className="users">
                    {users}
                </ul>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        userLvl:state.userLvl,
        page:state.page

    }   
}
const mapDispatchToProps=dispatch=>{
    return{
        handlePageChange:(page)=>dispatch({type:actionTypes.SAVE_PAGE_URL,page}),
        
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Scoreboard);