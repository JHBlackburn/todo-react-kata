import React, { Component } from 'react';
import { Router } from 'director/build/director';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nowShowing: 'all',
      todos: [],
      editing: null,
      editText: '',
      newTodo: '',
    };
  }

  componentDidMount() {
    var setState = this.setState;
    var router = Router({
      '/': setState.bind(this, { nowShowing: 'all' }),
      '/active': setState.bind(this, { nowShowing: 'active' }),
      '/completed': setState.bind(this, { nowShowing: 'completed' }),
    });

    router.init('/');
  }

  handleChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  handleNewTodoKeyDown(e) {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    if (this.state.newTodo.trim()) {
      this.addTodo(this.state.newTodo.trim());
      this.setState({ newTodo: '' });
    }
  }

  addTodo(t) {
    this.state.todos.push({ id: uuid(), title: t, completed: false });
  }

  toggleAll(e) {
    const todos = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      const newTodo = this.state.todos[i];
      newTodo.completed = e.target.checked;

      todos.push(newTodo);
    }

    this.setState({ todos: todos });
  }

  toggle(t) {
    const todos = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      if (t.id === this.state.todos[i].id) {
        const newTodo = this.state.todos[i];
        newTodo.completed = !newTodo.completed;

        todos.push(newTodo);
      } else {
        todos.push(this.state.todos[i]);
      }
    }

    this.setState({ todos: todos });
  }

  destroy(t) {
    const todos = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].id !== t.id) {
        todos.push(this.state.todos[i]);
      }
    }

    this.setState({ todos: todos });
  }

  edit(todo) {
    this.setState({
      editing: todo.id,
      editText: todo.title,
    });
  }

  handleChangeEdit(e) {
    this.setState({ editText: e.target.value });
  }

  handleKeyDown(e) {
    if (e.which === 27) {
      this.setState({ editing: null });
    } else if (e.which === 13) {
      this.save();
    }
  }

  save() {
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].id === this.state.editing) {
        this.state.todos[i].title = this.state.editText.trim();
      }
    }

    this.setState({ editing: null });
  }

  cancel() {
    this.setState({ editing: null });
  }

  clearCompleted() {
    const todos = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      if (!this.state.todos[i].completed) {
        todos.push(this.state.todos[i]);
      }
    }

    this.setState({ todos: todos });
  }

  render() {
    let shownTodos = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.nowShowing === 'active' && !this.state.todos[i].completed) {
        shownTodos.push(this.state.todos[i]);
      } else if (this.state.nowShowing === 'completed' && this.state.todos[i].completed) {
        shownTodos.push(this.state.todos[i]);
      } else if (this.state.nowShowing === 'all') {
        shownTodos.push(this.state.todos[i]);
      }
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            autoFocus={true}
          />
        </header>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll.bind(this)}
            checked={
              (function() {
                let count = 0;

                for (let i = 0; i < shownTodos.length; i++) {
                  if (!shownTodos[i].completed) {
                    count++;
                  }
                }

                return count;
              })() === 0
            }
          />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            {(function(that) {
              const todos = [];

              for (let i = 0; i < shownTodos.length; i++) {
                todos.push(
                  <li
                    key={shownTodos[i].id}
                    className={classNames({
                      completed: shownTodos[i].completed,
                      editing: that.state.editing === shownTodos[i].id,
                    })}
                  >
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        checked={shownTodos[i].completed}
                        onChange={that.toggle.bind(that, shownTodos[i])}
                      />
                      <label onDoubleClick={that.edit.bind(that, shownTodos[i])}>{shownTodos[i].title}</label>
                      <button className="destroy" onClick={that.destroy.bind(that, shownTodos[i])} />
                    </div>
                    <input
                      ref="editField"
                      className="edit"
                      value={that.state.editText}
                      onBlur={that.save.bind(that)}
                      onChange={that.handleChangeEdit.bind(that)}
                      onKeyDown={that.handleKeyDown.bind(that)}
                    />
                  </li>,
                );
              }

              return todos;
            })(this)}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {(function() {
                let count = 0;

                for (let i = 0; i < shownTodos.length; i++) {
                  if (!shownTodos[i].completed) {
                    count++;
                  }
                }

                return count;
              })()}
            </strong>{' '}
            {(function() {
              let count = 0;

              for (let i = 0; i < shownTodos.length; i++) {
                if (!shownTodos[i].completed) {
                  count++;
                }
              }

              return count;
            })() === 1
              ? 'todo'
              : 'todos'}{' '}
            left
          </span>
          <ul className="filters">
            <li>
              <a href="#/" className={classNames({ selected: this.state.nowShowing === 'all' })}>
                All
              </a>
            </li>{' '}
            <li>
              <a href="#/active" className={classNames({ selected: this.state.nowShowing === 'active' })}>
                Active
              </a>
            </li>{' '}
            <li>
              <a href="#/completed" className={classNames({ selected: this.state.nowShowing === 'completed' })}>
                Completed
              </a>
            </li>
          </ul>
          {(function() {
            let count = 0;

            for (let i = 0; i < shownTodos.length; i++) {
              if (shownTodos[i].completed) {
                count++;
              }
            }

            return count;
          })() > 0 && (
            <button className="clear-completed" onClick={this.clearCompleted.bind(this)}>
              Clear completed
            </button>
          )}
        </footer>
      </div>
    );
  }
}

export default App;
