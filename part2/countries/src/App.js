import { useState, useEffect } from "react";
import axios from "axios"

const Results = ({results}) => {
    if (results === null) return null;
    if (results.length === 1) return results;
    return <p>{results}</p>
}

const CountryInfo = ({country}) => {
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <br />
            Languages:
            <ul>
                {Object.values(country.languages).map(l => <li>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

function App() {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState(null)
    const [result, setResult] = useState(null)
    
    useEffect(() => {
        axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(result => {
            setCountries(result.data)
        })
        .catch(e => {
            console.log(e)
            alert('Something went wrong...')
        })
    }, [])
    
    const updateSearch = (value) => {
        setQuery(value)
        if (countries === null) return;
        if (value.length <= 0) {
            setResult(null)
            return
        }
        
        let matches = []
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].name.common.toLowerCase().includes(value.toLowerCase())) {
                matches.push(countries[i])

                if (matches.length > 10)
                {
                    setResult('Too many matches, specify another filter.')
                    return
                }
            }
        }
        
        if (matches.length > 0) {
            if (matches.length === 1) {
                setResult(<CountryInfo country={matches[0]} />)
            } else {
                setResult(matches.map(country => <>{country.name.common}<br/></>))
            }
        }
    }
    
    return (
        <>
            <form>
            find countries <input value={query} onChange={e => updateSearch(e.target.value)} />
            <Results results={result} />
            </form>
        </>
        );
    }
    
    export default App;
    