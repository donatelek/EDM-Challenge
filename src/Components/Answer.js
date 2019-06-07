import React, { Component } from 'react';
import '../Answer.css';
class Answer extends Component {
    state = {
        passwordInput: '',
        user: '',
        answerInput: '',
        arrayOfWrongAnswers:['Nope, thats not him', 'Not this time', 'Try again!','Bad answer'],
        wrongAnswer:'Nope, thats not him',
        isWrongAnswer:false,
    }



    handlePasswordChange = (e) => {
        this.setState({
            passwordInput: e.target.value
        })
    }
    changeWrongAnswer=()=>{

        const index = Math.floor(Math.random()*this.state.arrayOfWrongAnswers.length);
        this.setState({
            isWrongAnswer:true,
            wrongAnswer:this.state.arrayOfWrongAnswers[index]
        })
        setTimeout(()=>{
            this.setState({
                isWrongAnswer:false
            })
        },2500)
        
    }
    onchange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    onchange1 = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    clicky = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => res.json()).then(res => {
            this.setState({
                user: res
            })
        }).catch(err => console.log(err))
    }
    checkAnswer = () => {

        fetch('https://pure-dawn-32038.herokuapp.com/password', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lvl: this.props.userLvl.lvlnumber,
                password: this.state.answerInput.toLowerCase()
            })
        }).then(res => res.json()).then(res => {
            const { handleUsedHints,handleNextLvl,animationOnGoodAnswer,handleUserPoints,mainmain,resetUsedHints,resetFailedAttempts,updateLocalStorage,updateFailedAttempts }=this.props;
            if (res === 'true') {
                handleUsedHints();
                handleNextLvl();
                animationOnGoodAnswer();
                handleUserPoints();
                mainmain()
                resetUsedHints()
                resetFailedAttempts()
                this.setState({
                    answerInput:''
                })
                setTimeout(() => {
                    updateLocalStorage()
                }, 250)
            } else {
                this.changeWrongAnswer()
                updateFailedAttempts()
                setTimeout(() => {
                    updateLocalStorage()
                }, 250)
            }

        }).catch(err => console.log(err))
    }
    handleInputAnswer = (e) => {
        this.setState({
            answerInput: e.target.value
        })
    }
    render() {

        const { isWrongAnswer,answerInput,wrongAnswer }=this.state;
        const { animationOnGoodAnswer,handleNextLvl,resetUsedHints,resetFailedAttempts,updateLocalStorage,turnAnimation,user }=this.props;
        const { changeWrongAnswer, checkAnswer,handleInputAnswer }=this;

        return (
            <>
                <div class="answer">
                   
                    <input onChange={handleInputAnswer} type="text" value={answerInput} className='inputAnswer' placeholder='Answer...' spellcheck="false" />
                    <br />
                    {isWrongAnswer&&<div className="wrongAnswer">{wrongAnswer}</div>}
                    <br/>
                    <button className='check' onClick={checkAnswer}>Check</button>
                    
                    
                    <button onClick={() => {
                        animationOnGoodAnswer();
                        handleNextLvl()
                        resetUsedHints()
                        setTimeout(() => {
                            resetFailedAttempts()
                        }, 100)
                        setTimeout(() => {
                            updateLocalStorage()
                        }, 250)
                    }} className="skip">SKIP</button>
                    {turnAnimation?<div className="points">Your points: <span className='fadePoints'>{user.easylvl}</span></div>:<div className="points" >Your points: <span>{user.easylvl}</span></div>}
                </div>

            </>
        );
    }
}

export default Answer;