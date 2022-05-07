export const Country = ({ filter }) => {
  const obj = filter.languages
  const result = Object.keys(obj).map((key) => [obj[key]])
  return (
    <div>
      <h1>{filter.name.common}</h1> <br />
      <div>Capital: {filter.capital}</div>
      <div>Area: {filter.area}</div> <br />
      <div>Languages: {filter.languages[0]}</div>
      <ul>
        {result.map((language, id) => {
          return <li key={id}>{language}</li>
        })}
      </ul>
      <img src={`${filter.flags.png}`} alt="Country Flag" width={300} height={200}></img>
    </div>
  )
}
