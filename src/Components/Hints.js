import React, { Component } from 'react';
import '../Hints.css';
import ReactCardFlip from 'react-card-flip';
import Img from 'react-image';
import change from '../img/change.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
class Hints extends Component {
    state = {
      
        isFlipped1: false,
        isFlipped2: false,
        isFlipped3: false,
    }
    componentDidMount() {
        const { user } =this.props;
        setTimeout(()=>{
            this.setState({
                isFlipped1:true
            })
        },1250)

        if(user.usedhints===1){
            this.setState({
                isFlipped1:true,
                isFlipped2:true
            })
        }else if(user.usedhints===2){
            this.setState({
                isFlipped1:true,
                isFlipped2:true,
                isFlipped3:true
            })
        }
       

    }
    componentDidUpdate(){

        const { user,turnAnimation }=this.props;
       const { isFlipped1,isFlipped2,isFlipped3 }=this.state;
        if(user.usedhints===1&&isFlipped2===false){
           
            this.setState({
                isFlipped1:true,
                isFlipped2:true
            })
        }else if(user.usedhints===2&&isFlipped3===false){
            this.setState({
                isFlipped1:true,
                isFlipped2:true,
                isFlipped3:true
            })
        }else if(user.usedhints===0&&isFlipped2===true){
            this.setState({
                isFlipped1:false,
                isFlipped2:false,
                isFlipped3:false
            })
        }else if(user.usedhints===0&&turnAnimation===true&&isFlipped1===true){
            this.setState({
                isFlipped1:false
            })
        }else if(user.usedhints===0&&turnAnimation===false&&isFlipped1===false){
            this.setState({
                isFlipped1:true
            })
        }
       
    }
      handleClick2=()=> {
        this.setState({
            isFlipped2:!this.state.isFlipped2
        })
      }
      handleClick3=()=> {
       
        
        this.setState({
            isFlipped3:!this.state.isFlipped3
        })
      }

    render() {

        const { isFlipped1,isFlipped2,isFlipped3 }=this.state;
        const { doubledouble1,updateLocalStorage,turnAnimation,doubledouble2,user }=this.props;
        let boxClass = ["quizHints"];
            if(turnAnimation) {
              boxClass.push('addAnimation');
            }
        return (
            <div className={boxClass.join(' ')}>

            <div className="firstFlip flip">
  <ReactCardFlip isFlipped={isFlipped1} flipDirection="vertical">
        <div key='front' className='front1'><LazyLoadImage
            alt='asdsd'
            src={change}
            height='100%'
            width='100%'/></div>
         <div key='back' className='back1'><img src={require(`../img/change.jpg`)} className='back1img' /></div>
      </ReactCardFlip>
      </div>

      <div className="secondFlip flip">
  <ReactCardFlip isFlipped={isFlipped2} flipDirection="vertical">
        <div key='front' className='front2' onClick={()=>{
            this.handleClick2()
            doubledouble1()
            setTimeout(() => {
                updateLocalStorage()
            }, 250)
        }} >
            <LazyLoadImage
            alt='asdsd'
            src={change}
            height='100%'
            width='100%'/>
        </div>
         <div key='back' className='back2'><img src={require(`../img/change.jpg`)} className='back2img' /></div>
      </ReactCardFlip>
      </div>


      <div className="thirdFlip flip">
  <ReactCardFlip isFlipped={isFlipped3} flipDirection="vertical">
        <div className='front3' key='front' onClick={() => {
            if(user.usedhints===1){
                this.handleClick3()
                doubledouble2()
                setTimeout(() => {
                    updateLocalStorage()
                }, 250)
            }
                }}><LazyLoadImage
                alt='asdsd'
                src={change}
                height='100%'
                width='100%'/></div>
         <div key='back' className='back3'><img src={require(`../img/change.jpg`)} className='back3img' /></div>
      </ReactCardFlip>
      </div>
    </div>
        );
    }
}

export default Hints;