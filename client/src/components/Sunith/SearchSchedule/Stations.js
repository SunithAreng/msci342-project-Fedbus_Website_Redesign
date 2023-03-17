import React from 'react';
import { useSelector } from 'react-redux';

export const Stations = () => {

    const serverURL = useSelector((state) => state.serverURL.value);

    React.useEffect(() => {
        getOrigin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [stations, setStations] = React.useState([]);

    const getOrigin = () => {
        const callApiGetOrigin = async () => {
            const url = serverURL + "/api/getOrigin";
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

        callApiGetOrigin()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setStations(parsed);
                // console.log(parsed);
            })
    }

    return stations;
}
