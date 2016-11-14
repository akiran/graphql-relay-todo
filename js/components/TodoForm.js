import React, {Component} from 'react'

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }
  changeHandler(e) {
    this.setState({
      text: e.target.value
    })
  }
  addTodo(e) {
    if (e.key === 'Enter') {
      this.props.addTodo(this.state.text)
      this.setState({
        text: ''
      })
    }
  }
  render() {
    return (
      <div>
        <input
          value={this.state.text}
          onChange={this.changeHandler}
          onKeyDown={this.addTodo} />
      </div>
    )
  }
}
