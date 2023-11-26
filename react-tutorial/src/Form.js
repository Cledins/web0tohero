import React, { useState } from 'react'

const Form = ({ setTodos }) => {
    const [title, setTitle] = useState('');
    const [done, setDone] = useState(false);

    const handleTitleChange = (event) => {
      setTitle(event.target.value)
    }
    const handleDoneChange = (event) => {
      setDone(event.target.value)
    }

    const handleSubmit = async () => {
        console.log({ title })
        const response = await fetch('http://127.0.0.1:5000/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ title })
        })
        const res = await response.json()
        setTitle('')
        setDone(false)
        setTodos(res)
    }

  return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Add a task</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange} />
        <p></p>
        <input 
            type="button" 
            value="Submit" 
            onClick={handleSubmit} />
      </form>
      
    );
}

export default Form;