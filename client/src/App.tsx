import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tabs from "./components/Tabs"
import Alerts from "./components/Alerts"
import Axios from "axios"
import { Button } from "reactstrap";

class App extends React.Component {
  state = {
    random: 1,
    status: "",
    history: [],
    lasterror: "",
    messages: []
  }

  async componentDidMount() {
    let req = await (await Axios.get("/data")).data
    this.setState({
      status: req.status,
      history: req.history,
      lasterror: req.lasterror,
      messages: req.messages
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <Alerts status={this.state.status}/>
          <Tabs history={this.state.history} lasterror={this.state.lasterror} messages={this.state.messages}/>
          {this.renderButtons()}
        </div>
      </div>
    )
  }

  renderButtons() {
    return (
      <div className="mt-5 mt-lg-5 col-lg-6" style={{alignContent: "center", display: "inline-block"}}>
        <Button size="lg" className="btn-1 ml-1" color="success" type="button" style={{width: "33%"}} onClick={this.startBtn_onClick}>
          Start
        </Button>
        <Button size="lg" className="btn-1 ml-1" color="danger" type="button" style={{width: "33%"}} onClick={this.stopBtn_onClick}>
          Stop
        </Button>
      </div>
    )
  }

  startBtn_onClick = async() => {
    let x = await Axios.get("/start") //start로 바꾸기
    let req = await (await Axios.get("/data")).data
    this.setState({
      status: req.status,
      history: req.history,
      lasterror: req.lasterror,
      messages: req.messages
    })
  }

  stopBtn_onClick = async() => {
    let x = await Axios.get("/stop") //stop으로 바꾸기
    let req = await (await Axios.get("/data")).data
    this.setState({
      status: req.status,
      history: req.history,
      lasterror: req.lasterror,
      messages: req.messages
    })
  }
}

export default App;
