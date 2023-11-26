import React from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Done</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.title}</td>
        <td>{row.done.toString()}</td>
        <td>
          <button id="delete" onClick={() => props.removeCharacter(index, row.id)}>Delete</button>
        </td>
        <td>
          <button id="done" onClick={() => props.changeDoneStatus(row.title, row.done, row.id)}>Done</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}


const Table = (props) => {
  const { characterData, removeCharacter, changeDoneStatus } = props

  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} removeCharacter={removeCharacter} changeDoneStatus={changeDoneStatus}/>
    </table>
  )
}


export default Table