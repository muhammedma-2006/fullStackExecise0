const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
            filter shown with: <input value={filter} onChange={(e) => handleFilterChange(e)} />
    </div>
    )
}
export default Filter;