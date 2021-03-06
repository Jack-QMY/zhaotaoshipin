import { useMemo, useState, useEffect } from 'react';

interface Props {
    count: number | string;
}

export const useCountDown = (props: Props) => {
    const { count } = props;
    const [subTime, setSubTime] = useState(count);
    useEffect(() => {
        setSubTime(count);
    }, [count]);

    useEffect(() => {
        const timer: any = setInterval(() => {
            setSubTime((prevCount: any) => {
                if (prevCount - 1000 <= 0) {
                    clearInterval(timer);
                }
                return prevCount - 1000;
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [count]);

    return useMemo(() => {
        let day: number | string = parseInt(String(subTime / 1000 / 60 / 60 / 24), 10);
        let hours: number | string = parseInt(String((subTime / 1000 / 60 / 60) % 24), 10);
        let minutes: number | string = parseInt(String((subTime / 1000 / 60) % 60), 10);
        let seconds: number | string = parseInt(String((subTime / 1000) % 60), 10);
        const isEnd = subTime < 1000;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return { day, hours, minutes, seconds, isEnd, subTime };
    }, [subTime]);
};

// export const useCountDown = (props: Props) => {
//     const { count } = props;
//     const [subTime, setSubTime] = useState(0);
//     const future = useMemo(() => new Date(count), [count]);

//     useEffect(() => {
//         const timer: number = setInterval(() => {
//             const now: Date = new Date();
//             setSubTime(Number(future) - Number(now));
//         }, 10);
//         return () => {
//             clearInterval(timer);
//         };
//     }, [future]);

//     return useMemo(() => {
//         let day: number | string = parseInt(String(subTime / 1000 / 60 / 60 / 24), 10);
//         let hours: number | string = parseInt(String((subTime / 1000 / 60 / 60) % 24), 10);
//         let minutes: number | string = parseInt(String((subTime / 1000 / 60) % 60), 10);
//         let seconds: number | string = parseInt(String((subTime / 1000) % 60), 10);
//         day = day < 10 ? '0' + day : day;
//         hours = hours < 10 ? '0' + hours : hours;
//         minutes = minutes < 10 ? '0' + minutes : minutes;
//         seconds = seconds < 10 ? '0' + seconds : seconds;
//         return { day, hours, minutes, seconds };
//     }, [subTime]);
// };
