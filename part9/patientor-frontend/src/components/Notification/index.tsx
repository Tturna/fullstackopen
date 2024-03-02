const Notification = ({ notification }: { notification: string }) => {
    if (notification === '') {
        return null;
    }

    const style = {
        border: "2px solid red",
        padding: "1em",
        margin: "1em auto"
    };

    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;