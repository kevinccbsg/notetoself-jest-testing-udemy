import React from 'react';
import { mount } from 'enzyme';
import Note from './Note';

describe('Note', () => {
  const props = { text: 'asd' };
  let note = mount(<Note note={props} />);
  it('Renders the note text', () => {
    expect(note.find('p').text()).toEqual(props.text);
  });
});
