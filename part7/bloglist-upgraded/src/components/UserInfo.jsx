import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/usersReducer";
import userService from "../services/users";

const UserInfo = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const id = useParams().id;
    const user = users.find(u => u.id === id);

    useEffect(() => {
        if (users.length > 0) return;

        userService.getAll()
        .then(users => {
            dispatch(setUsers(users));
        })
        .catch(e => console.log(e));
    }, [dispatch]);

    if (!user) return "Loading users...";

    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserInfo;