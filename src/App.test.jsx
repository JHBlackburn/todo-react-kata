import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

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
