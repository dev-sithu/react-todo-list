import React, {Component} from 'react';
import Todo from "./Todo";
import NewTodoForm from './NewTodoForm';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
    };

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  create(newTodo) {
    this.updateLocalStorage([...this.state.todos, newTodo]);
  }

  update(id, updatedTask) {
    let updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }

      return todo;
    });

    this.updateLocalStorage(updatedTodos);
  }

  remove(id) {
    this.updateLocalStorage(this.state.todos.filter(todo => todo.id !== id));
  }

  toggleCompletion(id) {
    let updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.updateLocalStorage(updatedTodos);
  }

  updateLocalStorage(updatedTodos) {
    this.setState(
      st => ({
        todos: updatedTodos
      }),
      () => window.localStorage.setItem('todos', JSON.stringify(this.state.todos))
    );
  }

  render() {
    return (
      <div className="TodoList">
        <h1>
          Todo List <span>A Simple React Todo List App.</span>
        </h1>
        <ul>
          {
            this.state.todos.map(todo => (
              <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                completed={todo.completed}
                updateTodo={this.update}
                removeTodo={this.remove}
                toggleTodo={this.toggleCompletion}
              />
            ))
          }
        </ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}

export default TodoList;
