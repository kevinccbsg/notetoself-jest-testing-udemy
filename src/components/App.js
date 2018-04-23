import React, { Component } from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './Note';

const cookie_key = 'NOTES';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      notes: [],
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const notes = read_cookie(cookie_key);
    this.setState({ notes });
  }

  handleChange(evt) {
    this.setState({ text: evt.target.value });
  }

  seleteNotes() {
    delete_cookie(cookie_key);
    this.setState({ notes: [] });
  }

  submit() {
    const { notes, text } = this.state;
    const newNote = { text };
    const newNotes = notes.concat(newNote);
    this.setState({ notes: newNotes });
    bake_cookie(cookie_key, newNotes);
  }

  render() {
    const { notes } = this.state;
    return (
      <div>
        <h2>Note to self</h2>
        <Form inline>
          <FormControl onChange={this.handleChange} />
          <Button onClick={this.submit}>Submit</Button>
          {notes.map((obj) => (
            <Note key={obj.text} note={obj} />
          ))}
        </Form>
        <hr />
        <Button onClick={() => this.seleteNotes()}>Clear notes</Button>
      </div>
    );
  }
}

export default App;
