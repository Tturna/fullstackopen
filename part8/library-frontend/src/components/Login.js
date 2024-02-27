import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const Login = ({ show, setToken, setPage }) => {
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            window.localStorage.setItem('libraryLoggedUser', token)
            setPage('authors')
        }
    }, [result.data, setPage, setToken])

    if (!show) {
        return null
    }

    const handleLogin = (event) => {
        event.preventDefault()
        login({ variables: { username: usernameInput, password: passwordInput } })
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input value={usernameInput} onChange={({target}) => setUsernameInput(target.value)} />
                </div>
                <div>
                    password
                    <input type="password" value={passwordInput} onChange={({target}) => setPasswordInput(target.value)} />
                </div>
                <button>login</button>
            </form>
        </div>
    )
}

export default Login