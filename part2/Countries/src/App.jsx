import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  const handleShow = (country) => {
  setSelectedCountry(country)
}

  return (
    <div>
      find countries{' '}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search === '' ? null : (
        <>
          {filtered.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}

          {filtered.length <= 10 && filtered.length > 1 && (
            <CountryList countries={filtered} onShow={handleShow} />
          )}

          {filtered.length === 1 && (
            <CountryDetails country={selectedCountry} />
          )}

          {selectedCountry && (
            <CountryDetails country={selectedCountry} />
          )}
        </>
      )}
    </div>
  )
}

export default App
