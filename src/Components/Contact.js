import React, { Component } from 'react';
import '../Contact.css';
class Contact extends Component {
    state = {
        name:'',
        message:''
    }
    componentDidMount(){
       
        this.props.pageChange('contact')
    }

    handleContactName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    handleContactMessage=(e)=>{
        this.setState({
            message:e.target.value
        })
    }
handleSubmit=(e)=>{
e.preventDefault()
}
    render() {
        return (
            <div className="contact">
            <h1 className="contactTitle">Contact</h1>
            <h3 className="ideas">If you have any ideas for next levels or saw some bugs feel free to hit me up. I will be appreciated</h3>
            <form action="" id="contact-form">
            <input type="hidden" name="contact_number"/>
            <div className="name">
                <span>Name</span>
                <br/>
                <input name='user_name' placeholder='Your name...' type="text" onChange={this.handleContactName} value={this.state.name} />
            </div>
            <div className="message">
                <span>Message</span>
                <br/>
                <textarea name="contact" id="" cols="30" rows="10" placeholder='Your message...' value={this.state.message} onChange={this.handleContactMessage} ></textarea>
            </div>
            <input type='submit' value='Send' className="submitContact" onClick={this.handleSubmit} />
            </form>
            </div> 
        );
    }
}

export default Contact;