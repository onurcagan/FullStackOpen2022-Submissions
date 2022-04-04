const Persons = ({ filter }) => {
  return (
    <div>
      {filter.map((p) => {
        return (
          <div key={p.id}>
            {p.name} - {p.phone}
          </div>
        )
      })}
    </div>
  )
}

export default Persons
