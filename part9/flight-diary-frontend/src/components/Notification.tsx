const Notification = ({ notification }: { notification: string }) => {
    const style = notification.toLowerCase().includes('error') ? { color: 'red' } : {};
    return(<p style={style}>{notification}</p>)
}

export default Notification;