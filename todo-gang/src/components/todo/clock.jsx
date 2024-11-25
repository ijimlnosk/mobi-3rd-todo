import { useEffect, useState } from "react";

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const timeString = currentTime.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div>
            <h1>{timeString}</h1>
        </div>
    );
};
export default Clock;
