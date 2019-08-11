import React, { Component } from 'react';
import '../Styles/Contact.css';
import * as actionTypes from '../store/actions'
import { connect } from 'react-redux'
class Contact extends Component {
  state = {
    feedback: '',
    formSubmitted: false,
    name: '',
    showMessageSent: false,
    showMessageError: false
  }

  componentWillMount() {
    this.props.handlePageChange('contact')
  }

  static sender = 'sender@example.com';



  handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'feedback') {
      this.setState({
        feedback: value
      })
    } else if (name === 'name') {
      this.setState({
        name: value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.feedback && !this.state.name) {
      this.setState({
        showMessageError: true
      })
      setTimeout(() => {
        this.setState({
          showMessageError: false
        })
      }, 3000)
      return
    }
    const temp = 'contact_template'
    this.sendFeedback(
      temp,
      this.sender,
      this.state.name,
      this.state.feedback
    );
    this.setState({
      formSubmitted: true
    });
  }

  sendFeedback(templateId, senderEmail, name, feedback) {
    const receiv = 'donatelek92@gmail.com'
    const temp = 'contact_template'
    window.emailjs
      .send('mailgun', temp, {
        senderEmail,
        receiv,
        name,
        feedback
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            showMessageSent: true
          })
          setTimeout(() => {
            this.setState({
              showMessageSent: false
            })
          }, 3000)
        }
      })
      .catch(err => console.error('Failed to send feedback. Error: ', err));
  }

  render() {
    return (
      <div className="contact">
        <h1 className="contactTitle">Contact</h1>
        <h3 className="ideas">If you have any ideas for next levels or saw some bugs feel free to hit me up. I will be appreciated</h3>
        <form className="feedback-form" onSubmit={this.handleSubmit}>
          <div className="name">
            <span>Name</span>
            <br />
            <input type="text" onChange={this.handleInputChange} value={this.state.name} name='name' placeholder="Your name" />
          </div>
          <div className="message">
            <span>Message</span>
            <br />
            <textarea
              className="text-input"
              id="feedback-entry"
              name="feedback"
              onChange={this.handleInputChange}
              placeholder="Enter your message here"
              value={this.state.feedback}
            />
          </div>
          {this.state.showMessageSent && <div className="messageSent">Message has been sent</div>}
          {this.state.showMessageError && <div className="contactSentError">Please fill all form fields!</div>}
          <input type='submit' value='Send' className="submitContact" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handlePageChange: (page) => dispatch({ type: actionTypes.SAVE_PAGE_URL, page }),
  }
}

export default connect(null, mapDispatchToProps)(Contact);