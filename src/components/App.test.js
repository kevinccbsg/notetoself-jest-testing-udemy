import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  let app = mount(<App />);
  it('Render the app title', () => {
    expect(app.find('h2').text()).toEqual('Note to self');
  });

  it('renders the clear button', () => {
    expect(app.find('.btn').at(1).text()).toEqual('Clear notes');
  });

  // it('should has two notes', () => {
  //   app.setState({ notes: [{ text: 2 }, { text: 8}]});
  //   expect(app.find('Note')).toHaveLength(2);
  // });

  describe('when rendering the form', () => {
    it('creates form component', () => {
      expect(app.find('Form').exists()).toEqual(true);
    });
    it('creates formControl component', () => {
      expect(app.find('FormControl').exists()).toEqual(true);
    });
  });
});
