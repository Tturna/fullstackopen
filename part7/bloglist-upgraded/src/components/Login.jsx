import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeError } from '../reducers/errorReducer';
import { setUserData } from '../reducers/userDataReducer';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification'
import styled from 'styled-components';

// Fuck making any of this responsive lmao
// I'm just trying out this styled components thing bro,
// give me a break.
const LoginContainer = styled.div`
    width: 30%;
    margin: auto;
    padding: 15px;
    background-color: #1EA896;
    border-radius: 15px;
    text-align: center;
`
const LoginTitle = styled.h2`
    padding: 0;
    margin: 0;
`
const Cred = styled.div`
    width: 30%;
    margin: 10px auto;
`
const LoginP = styled.p`
    padding: 0;
    margin: 0;
`
const LoginInput = styled.input`
    width: 100%;
    padding: 0;
    border: 0;
`
const StyledButton = styled.button`
    width: 30%;
    padding: 5px 15px;
    color: #fff;
    background-color: #FF715B;
    border: none;
    border-radius: 5px;
`

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
        <LoginContainer>
            <LoginTitle>Log in to application</LoginTitle>
            <Notification isError={true} />

            <form onSubmit={handleLogin}>
                <Cred>
                    <LoginP>username</LoginP>
                    <LoginInput
                        type="text"
                        value={username}
                        name="Username"
                        id="usernameInput"
                        onChange={({ target }) => setUsername(target.value)}
                        style={{width: "100%"}}
                    />
                </Cred>
                <Cred>
                    <LoginP>password</LoginP>
                    <LoginInput
                        type="password"
                        value={password}
                        name="Password"
                        id="passwordInput"
                        onChange={({ target }) => setPassword(target.value)}
                    /><br />
                </Cred>
                <StyledButton type="submit">Login</StyledButton>
            </form>
        </LoginContainer>
    );
}

export default Login;