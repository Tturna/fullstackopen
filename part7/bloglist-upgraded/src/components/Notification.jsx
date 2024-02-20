import { useSelector } from 'react-redux';

const Notification = ({ isError = false }) => {
    const notification = useSelector((state) =>
        isError ? state.error : state.notification
    );

    return <p style={{ color: isError ? 'red' : 'green' }}>{notification}</p>;
};

export default Notification;
