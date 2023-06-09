import { useState, useEffect } from "react";
import axios from "axios"

const Results = ({results}) => {
    if (results === null) return
    return <p>{results}</p>
}

function App() {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState(null)
    const [result, setResult] = useState()
    
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
            setResult(matches.map(country => <>{country.name.common}<br/></>))
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
    