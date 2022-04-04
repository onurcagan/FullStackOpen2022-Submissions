const Filter = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      filters shown with: <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
    </div>
  )
}
export default Filter
