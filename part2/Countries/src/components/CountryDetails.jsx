import Weather from './Weather'

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages || {})
  const capital = country.capital?.[0]

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital {capital}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />

      <Weather capital={capital} />
    </div>
  )
}

export default CountryDetails
