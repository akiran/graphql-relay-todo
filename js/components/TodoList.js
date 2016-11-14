import React, {Component} from 'react'
import Relay from 'react-relay'
import Todo from './Todo'
import AddTodoMutation from '../mutations/AddTodoMutation'
import RemoveTodoMutation from '../mutations/RemoveTodoMutation'
import TodoForm from './TodoForm'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.removeTodo = this.removeTodo.bind(this)
  }
  loadMore = () => {
    const {setVariables, variables} = this.props.relay
    setVariables({
      size: variables.size + 2
    })
  }
  addTodo = (text) => {
    const {commitUpdate} = this.props.relay
    commitUpdate(
      new AddTodoMutation({text, viewer: this.props.viewer})
    )
  }
  removeTodo(todo) {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({
        todo,
        viewer: this.props.viewer,
      })
    );
  }
  render() {
    console.log(this.props.viewer.todos, 'todolist')
    return (
      <div>
        <TodoForm addTodo={this.addTodo}/>
        <h3>Your todo list</h3>
        <ul>
          {this.props.viewer.todos.edges.map((edge, index) =>
            <Todo todo={edge.node} key={index} removeTodo={() => this.removeTodo(edge.node)}/>
          )}
        </ul>
        <button onClick={this.loadMore} style={{color: '#000', background: '#ccc'}}>
          Load More
        </button>
      </div>
    )
  }
}

export default Relay.createContainer(TodoList, {
  initialVariables: {
    size: 2
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos (first: 20) {
          edges {
            node {
              ${RemoveTodoMutation.getFragment('todo')}
              ${Todo.getFragment('todo')}
            },
          },
        },
       ${AddTodoMutation.getFragment('viewer')}
       ${RemoveTodoMutation.getFragment('viewer')}
      }
    `,
  },
});
