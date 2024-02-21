import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeError } from '../reducers/errorReducer';
import { setUserData } from '../reducers/userDataReducer';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const responseData = await loginService.login({
                username,
                password,
            });

            blogService.setToken(responseData.token);
            window.localStorage.setItem(
                'loggeduser',
                JSON.stringify(responseData)
            );
            dispatch(setUserData(responseData));
            setUsername(responseData.username);
            setPassword('');
        } catch (exception) {
            console.log(`Login failed: ${exception}`);
            dispatch(changeError('Wrong username or password'));
            setTimeout(() => {
                dispatch(changeError(''));
            }, 5000);
        }
    };

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification isError={true} />

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="usernameInput"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="passwordInput"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
}

export default Login;