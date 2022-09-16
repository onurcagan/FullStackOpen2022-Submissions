export const Filter = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      Search Contacts: <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
    </div>
  )
}
