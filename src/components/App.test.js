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

  describe('when create a note', () => {
    let testNote = 'test note';
    beforeEach(() => {
      app.find('FormControl').simulate('change', {
        target: {
          value: testNote,
        },
      });
    });
    it('State has changed', () => {
      expect(app.state('text')).toEqual(testNote);
    });

    describe('and submitting the new note', () => {
      beforeEach(() => {
        app.find('Button').at(0).simulate('click');
      });

      afterEach(() => {
        app.find('Button').at(1).simulate('click');
      })

      it('should has the new note', () => {
        expect(app.find('Note')).toHaveLength(1);
      });

      describe('and remounting the component', () => {
        let app2;

        beforeEach(() => {
          app2 = mount(<App />);
        });

        it('reads the store note cookies', () => {
          expect(app2.state().notes).toHaveLength(1);
        });
      });
    });

    describe('and clicking the clear button', () => {
      beforeEach(() => {
        app.find('Button').at(1).simulate('click');
      });

      it('should has the new note', () => {
        expect(app.state('notes')).toEqual([]);
      });
    });

  });
});
