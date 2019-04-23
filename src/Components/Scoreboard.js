import React, { Component } from 'react';
import '../Scoreboard.css';
class Scoreboard extends Component {
    state = {
        top10: ''
    }

    UNSAFE_componentWillMount() {
        fetch('https://secure-brook-39660.herokuapp.com/scoreboard', {
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
                        <>
                            <div className='username'>{user.username}</div>
                            <div className='points'>{user.easylvl}</div>
                        </>
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
                <div className="users">
                    {users}
                </div>
            </div>
        );
    }
}

export default Scoreboard;