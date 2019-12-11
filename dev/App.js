import React, { Component } from 'react';
import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader } from '../index';
import axios from 'axios';
export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        active: false,
        session_id: "",
        username: "",
        loggedin: false
    };

    this.handleClick = this.handleClick.bind(this);
}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.username !== prevState.username){
      
    this.setState({loggedin:true})
    axios.post('http://0.0.0.0:3001/')
      .then(res => {
        this.session_id=res.data;
        axios.post('http://0.0.0.0:3001/user', {"message":this.state.username, "session_id":this.session_id})
          .then(res => {
            addResponseMessage(res.data);
          })
      })
    // console.log(response);
  }
  }
  

  handleNewUserMessage = (newMessage) => {    
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();    
      
      axios.post('http://0.0.0.0:3001/chat',{"message":newMessage, "session_id":this.session_id})
      .then(res => {
        addResponseMessage(res.data);
      })
      
      
    }, 2000);
  }

  handleClick() {
    this.setState({
        active: !this.state.active
    });
}

mySubmitHandler = (event) => {
  uname = document.getElementById("uname").value
  this.setState({username: uname});
  console.log(uname);
  event.preventDefault();
  
  // alert("You are submitting " + this.state.username);
}

myChangeHandler = (event) => {
  this.setState({username: event.target.value});
}

 



      render(){
        return (
          <div className="App">
            <header className="App-header">
            
        
      {!this.state.loggedin && <form onSubmit={this.mySubmitHandler}>
        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" id="uname"/>
        </div>
        <div>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw"/>
      
          <button type="submit" onClick={this.handleClick}>Login</button>
          
        </div>
        </form>
      }
        {this.state.active &&
        <Widget
        title="Banky"
        subtitle="Banking Chatbot"
        senderPlaceHolder="Type a message ..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        badge={1}
      />
        }
            </header>
          </div>
        )
      }
  
}
