import { API_URL, STRAPI_API_TOKEN } from "./utls";

export const fetchDataFromApi = async (enpoint) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + STRAPI_API_TOKEN
        }
    };
    const res = await fetch(`${API_URL}${enpoint}`, options);
    const data = await res.json();

    return data;
} 
