import React from 'react';
import { useSelector } from 'react-redux';

export const RouteAPI = () => {

    const serverURL = useSelector((state) => state.serverURL.value);

    React.useEffect(() => {
        getRoutes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [routes, setRoutes] = React.useState([]);

    const getRoutes = () => {
        const callApiGetRoutes = async () => {
            const url = serverURL + "/api/getRoutes";
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
        callApiGetRoutes()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setRoutes(parsed);
                // console.log(parsed);
            })
    }


    return routes;
}
