import { useState, useEffect } from "react";
import axios from "axios"

const Results = ({results}) => {
    if (results === null) return null;
    // if (results.length === 1) return results;
    // return <p>{results}</p>
    return results
}

const WeatherInfo = ({country}) => {
    const [weatherData, setWeatherData] = useState(null)
    const [lat, lng] = country.capitalInfo.latlng
    
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then(response => {
                setWeatherData(response.data)
            })
            .catch(error => {
                console.log(error)
                alert("Something went wrong fetching the weather")
            })
    }, [lat, lng])

    if (weatherData === null) return null;

    const celsius = (weatherData.main.temp - 273.15).toFixed(2)

    return(
        <div>
            <h1>Weather in {country.capital[0]}</h1>
            <p>Temperature: {celsius} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
    )
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
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />

            <WeatherInfo country={country}/>

        </div>
    )
}

const CountryListItem = ({country, showCallback}) => {
    return(
        <>{country.name.common} <button onClick={showCallback}>Show</button> <br/></>
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
                    setResult(<p>'Too many matches, specify another filter.'</p>)
                    return
                }
            }
        }
        
        if (matches.length > 0) {
            if (matches.length === 1) {
                setResult(<CountryInfo country={matches[0]} />)
            } else {
                setResult(matches.map(country => {
                    return(
                        <CountryListItem key={country.name.common} country={country} showCallback={() => setResult(<CountryInfo country={country} />)} />
                    )
                }))
            }
        }
    }
    
    return (
        <>
            <form>
            find countries <input value={query} onChange={e => updateSearch(e.target.value)} /> <br />
            <Results results={result} />
            </form>
        </>
        );
    }
    
    export default App;
    