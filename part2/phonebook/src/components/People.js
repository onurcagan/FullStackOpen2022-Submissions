export const People = ({ filter, deleteButtonOnClick }) => {
  return (
    <div>
      {filter.map((p) => {
        return (
          // <div style={{ columnCount: '2', width: '80%' }}>
          <div key={p.id}>
            {p.name} - {p.number}
            <button style={{ marginLeft: '10px' }} onClick={() => deleteButtonOnClick(p.id)} key={p.id}>
              delete
            </button>
          </div>
          // </div>
        )
      })}
    </div>
  )
}
