import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

class App extends Component {
  state = {
    characters: [],
  }

  componentDidMount() {
    const url = 'http://127.0.0.1:5000/tasks'
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          characters: result,
        })
      })
  }

  removeCharacter = (index, id) => {
    const { characters } = this.state
  
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })

    const responsedel = fetch('http://127.0.0.1:5000/tasks/'+id.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',

        },
    })
  }

  changeDoneStatus = (title, done, id) => {
    const todos = this.state.characters.slice()
    const index = todos.findIndex(t=>t.id===id)
    todos[index].done = !done
  
    const responseput = fetch('http://127.0.0.1:5000/tasks/'+id.toString(), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, "done": !done })
    })
    this.setState({ characters: todos })
  }

  setTodos = (newTask) => {
    const newCharacters = this.state.characters.slice()
    newCharacters.push(newTask)
      this.setState({ characters: newCharacters })
    }
  
  render() {
    const { characters } = this.state
    
  
    return (
      <>
      <h1>My TodoList</h1>
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} changeDoneStatus={this.changeDoneStatus}/>
        <Form setTodos={this.setTodos} />
      </div>
      </>
    )
  }
}

export default App
