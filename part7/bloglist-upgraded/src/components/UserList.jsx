import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/usersReducer";
import userService from "../services/users";

const UserList = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users);

    useEffect(() => {
        userService.getAll()
        .then(users => {
            dispatch(setUsers(users));
        })
        .catch(e => console.log(e));
    }, [dispatch]);

    if (usersData.length <= 0) return "Loading users...";

    const tableStyle = {
        border: "1px solid black"
    }

    // yeah I get it this css stuff shuold be better
    return(
        <div>
            <h2>Users</h2>
            <table style={tableStyle}>
                <thead>
                    <tr style={tableStyle}><th /><th style={tableStyle}>Blogs</th></tr>
                </thead>
                <tbody>
                    {usersData.map(u => (
                        <tr style={tableStyle} key={u.id}>
                            <td style={tableStyle}><Link to={`/users/${u.id}`}>{u.username}</Link></td>
                            <td style={tableStyle}>{u.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;