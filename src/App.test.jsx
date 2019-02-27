import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import uuid  from 'uuid/v4';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


//J. Blackburn and A. Quintero Begin: 

describe('Rendering Components Tests', () => {
  it('will render h1 with text todos', () => {

    const wrapper = shallow(<App />);
    const title = wrapper.find('header > h1').text();
    expect(title).toEqual('todos');

  });

  it('will render input > placeholder with text What needs to be done?', () => {

    const wrapper = shallow(<App />);
    const title = wrapper.find('header > .new-todo');

    expect(title.prop('placeholder')).toEqual('What needs to be done?');

  });

  it('on initial load will render footer with 0 ToDos', () => {

    const wrapper = shallow(<App />);
    const numberTodos = wrapper.instance().state.todos.length;

    expect(numberTodos).toEqual(0);

  });

  it('on initial load will render radiobutton with "All" selected', () => {

    const wrapper = shallow(<App />);
    const allSelector = wrapper.find('.selected').text();

    expect(allSelector).toEqual('All')

  });

});

// D. Brodie begin:

describe('addTodo', () => {
  it('should add a todo item to the array of todos', () => {
    const app = shallow(<App />).instance();
    app.addTodo('potato');

    expect(app.state.todos[0].title).toBe('potato');
  });
});

describe('destroy', () => {
  it('should remove the passed in todo from the array', () => {
    const app = shallow(<App />).instance();
    const makeHerHappy = { id: uuid(), title: 'Make Happy Chan Happy', completed: true };
    const makeHerSad = { id: uuid(), title: 'Make her sad again', completed: false };
    const todos = [makeHerHappy, makeHerSad];
    app.state.todos = todos;
    app.destroy(makeHerHappy);

    expect(app.state.todos.length).toBe(1);
  });

  it('should remove the passed in todo from the array', () => {
    const app = shallow(<App />).instance();
    const makeHerHappy = { id: uuid(), title: 'Make Happy Chan Happy', completed: true };
    const makeHerSad = { id: uuid(), title: 'Make her sad again', completed: false };
    const feedHer = { id: uuid(), title: 'Get her some food', completed: false };
    const todos = [makeHerHappy, makeHerSad];
    app.state.todos = todos;
    app.destroy(feedHer);

    expect(app.state.todos.length).toBe(2);
  });
})


describe('edit', () => {
  it('should update editing and editText properties of state', () => {
    const app = shallow(<App />).instance();
    const makeHerHappy = { id: uuid(), title: 'Make Happy Chan Happy', completed: true };
    app.edit(makeHerHappy);

    expect(app.state.editing).toBe(makeHerHappy.id);
    expect(app.state.editText).toBe(makeHerHappy.title);
  })


})

describe('handleChangeEdit', () => {
  it('should update state with the value passed in via the change event', () => {
    const app = shallow(<App />)
    const element = app.find('.new-todo');
    const event = { target: { value: 'Happy' } };
    element.simulate('change', event);
    expect(app.instance().state.newTodo).toBe('Happy');
  })
});

describe('handleNewTodoKeyDown', () => {
  it('Should not empty the newTodo state when any key but enter (13) is pressed', () => {
    const app = shallow(<App />)
    app.instance().state.newTodo = 'hello';
    const element = app.find('.new-todo');
    const event = { target: { value: 'Happy' }, keyCode: 15 };
    element.simulate('keydown', event);
    expect(app.instance().state.newTodo).toBe('hello');
  })

  it('Should empty the newTodo state when the enter key is pressed', () => {
    const app = shallow(<App />)
    const preventDefault = jest.fn();
    app.instance().state.newTodo = 'hello';
    const element = app.find('.new-todo');
    const event = { target: { value: 'Happy' }, keyCode: 13, preventDefault };
    element.simulate('keydown', event);
    expect(app.instance().state.newTodo).toBe('');
  })
})
