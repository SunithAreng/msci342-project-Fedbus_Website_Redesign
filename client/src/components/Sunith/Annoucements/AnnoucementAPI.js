import React from 'react';
import { useSelector } from 'react-redux';

export const AnnoucementAPI = () => {

    const serverURL = useSelector((state) => state.serverURL.value);

    React.useEffect(() => {
        getAnnoucements();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [annoucments, setAnnoucements] = React.useState([]);

    const getAnnoucements = () => {
        const callApiGetAnnoucements = async () => {
            const url = serverURL + "/api/getAnnoucements";
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
        callApiGetAnnoucements()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setAnnoucements(parsed);
                // console.log(parsed);
            })
    }


    return annoucments;
}
