import React, { Component } from 'react';
import '../Hints.css';
import ReactCardFlip from 'react-card-flip';
import Img from 'react-image';
import change from '../img/change.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player'
import sound1 from '../mp3/1.mp3'
class Hints extends Component {
    state = {
      
        isFlipped1: false,
        isFlipped2: false,
        isFlipped3: false,
        playing:false,
        volume:'0.3'
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
    changeVolume = (volume) => {

        this.setState({
            volume: volume.target.value
        })
    }

    changePlaying = () => {
        this.setState({
            playing: !this.state.playing
        })
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
      onEnded=()=>{
          this.setState({
              playing:false
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
         <div key='back' className='back1'>
         
         {this.props.userLvl.sound&&<ReactPlayer url={require(`../mp3/${this.props.userLvl.sound}`)} width='50px' height='70px' volume='0.3' controls={false} playing={this.state.playing} volume={this.state.volume} onEnded={this.onEnded} />}
         {this.props.userLvl.sound&&<input type="range" step="any" min="0" max="1" value={this.state.volume} onChange={this.changeVolume} className='focused range' />}
         {!this.state.playing&&this.props.userLvl.sound?<i class="fas fa-play" onClick={this.changePlaying}></i>:null}
                {this.state.playing&&this.props.userLvl.sound?<i class="fas fa-pause" onClick={this.changePlaying}></i>:null}
                {this.props.userLvl.backgroundimg&&<img src={require(`../img/${this.props.userLvl.backgroundimg}`)} alt="" srcset=""/>}
         </div>
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
         <div key='back' className='back2'>

         {this.props.userLvl.sound2&&<ReactPlayer url={require(`../mp3/${this.props.userLvl.sound2}`)} width='50px' height='70px' volume='0.3' controls={false} playing={this.state.playing} volume={this.state.volume} onEnded={this.onEnded} />}
         {this.props.userLvl.sound2&&<input type="range" step="any" min="0" max="1" value={this.state.volume} onChange={this.changeVolume} className='focused range' />}
         {!this.state.playing&&this.props.userLvl.sound2?<i class="fas fa-play" onClick={this.changePlaying}></i>:null}
                {this.state.playing&&this.props.userLvl.sound2?<i class="fas fa-pause" onClick={this.changePlaying}></i>:null}
                {this.props.userLvl.backgroundimg2&&<img src={require(`../img/${this.props.userLvl.backgroundimg2}`)} alt="" srcset=""/>}
         </div>
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
         <div key='back' className='back3'>

{this.props.userLvl.sound3&&<ReactPlayer url={require(`../mp3/${this.props.userLvl.sound3}`)} width='50px' height='70px' volume='0.3' controls={false} playing={this.state.playing} volume={this.state.volume} onEnded={this.onEnded} />}
{this.props.userLvl.sound3&&<input type="range" step="any" min="0" max="1" value={this.state.volume} onChange={this.changeVolume} className='focused range' />}
{!this.state.playing&&this.props.userLvl.sound3?<i class="fas fa-play" onClick={this.changePlaying}></i>:null}
       {this.state.playing&&this.props.userLvl.sound3?<i class="fas fa-pause" onClick={this.changePlaying}></i>:null}
                {this.props.userLvl.backgroundimg3&&<img src={require(`../img/${this.props.userLvl.backgroundimg3}`)} alt="" srcset=""/>}
         </div>
      </ReactCardFlip>
      </div>
    </div>
        );
    }
}

export default Hints;