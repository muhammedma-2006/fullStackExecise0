const PersonForm = ({ handlePerson, newName, handleNnameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={handlePerson}>
            <div>
              name: <input value={newName} onChange={(e) => handleNnameChange(e)} />
              number: <input value={newNumber} onChange={(e) => handleNumberChange(e)} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
    </form>
  )
}

export default PersonForm;