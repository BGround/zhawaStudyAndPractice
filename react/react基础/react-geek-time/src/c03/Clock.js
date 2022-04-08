import React from "react";

const A = 65 // ASCII character code

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    console.log("Clock constructed");
    this.state = { 
      date: new Date(),
      value: 0,
      letters: Array.from({length: 26}, (_, i) => String.fromCharCode(A + i))
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("Clock did mount");
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log("Clock will unmount");
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    console.log("Clock did update");
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleChange() {
    this.setState({
      value: this.state.value + 1
    })
  }

  onChange(count) {
    return this.setState({
      value: this.state.value + count
    })
  }

  handleClick(val) {
    this.setState({
      value: this.state.value + val
    })
  }

  handleClick2(letter) {
    this.setState({ value: letter });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>value: {this.state.value}</p>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        <button type="button" onClick={this.handleChange}>add1</button>
        <button type="button" onClick={this.onChange.bind(this, 2)}>add2</button>
        <button type="button" onClick={() => this.handleClick(3)}>add3</button>
        <ul>
          {this.state.letters.map(letter =>
            <li key={letter} onClick={() => this.handleClick2(letter)}>
              {letter}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
