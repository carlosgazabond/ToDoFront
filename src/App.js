import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNote: "" // Add state to handle newNote input
    };
  }

  ApiUrl = "http://carlosarscombinatoria.eastus2.cloudapp.azure.com:5000/";

  componentDidMount() {
    this.RefreshNotes();
  }

  async RefreshNotes() {
    fetch(this.ApiUrl + "api/ToDo/GetNotes")
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data });
      });
  }

  async addClick() {
    const { newNote } = this.state; // Get newNote from state

    const data = new FormData();
    data.append("newNotes", newNote);

    fetch(this.ApiUrl + "api/ToDo/AddNotes", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then((result) => {
        alert(result);
        this.RefreshNotes();
        this.setState({ newNote: "" }); // Clear input after adding
      });
  }

  async deleteClick(id) {
    fetch(this.ApiUrl + "api/ToDo/DeleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then((result) => {
        alert(result);
        this.RefreshNotes();
      });
  }

  handleInputChange = (event) => {
    this.setState({ newNote: event.target.value });
  }

  render() {
    const { notes, newNote } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>ToDo List</h2>
          {/* Use value and onChange to handle input */}
          <input 
            id="newNote"
            value={newNote}
            onChange={this.handleInputChange}
          />&nbsp;
          <button onClick={() => this.addClick()}>Add Notes</button>

          {notes.map(note => (
            <p key={note.id}>
              <b>* {note.description}</b>&nbsp;
              <button onClick={() => this.deleteClick(note.id)}>Delete Notes</button>
            </p>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
