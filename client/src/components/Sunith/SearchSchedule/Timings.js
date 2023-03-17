import React from 'react';
import { useSelector } from 'react-redux';

export const Timings = () => {

    const serverURL = useSelector((state) => state.serverURL.value);

    React.useEffect(() => {
        getTimes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [timesList, setTimesList] = React.useState([]);

    const getTimes = () => {
        const callApiGetTimes = async () => {
            const url = serverURL + "/api/getTimes";
            console.log(url);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            return body;
        };
        callApiGetTimes()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setTimesList(parsed);
                // console.log(parsed);
            })
    }


    return timesList;
}
