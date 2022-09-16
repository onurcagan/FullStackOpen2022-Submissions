export const People = ({ filter, deleteButtonOnClick }) => {
  return (
    <div>
      {filter.map((p) => {
        return (
          <div key={p.id}>
            {p.name} - {p.number}
            <button style={{ marginLeft: '10px' }} onClick={() => deleteButtonOnClick(p.id)}>
              delete
            </button>
          </div>
        )
      })}
    </div>
  )
}
