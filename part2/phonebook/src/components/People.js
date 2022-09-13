const People = ({ filter }) => {
  return (
    <div>
      {filter.map((p) => {
        return (
          <div key={p.id}>
            {p.name} - {p.number}
          </div>
        )
      })}
    </div>
  )
}

export default People
