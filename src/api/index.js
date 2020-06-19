import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    const changeableUrl = country ? `${url}/countries/${country}` : url;

    try {
        const {
            data: { confirmed, recovered, deaths, lastUpdate },
        } = await axios.get(changeableUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);

        return data.countries;
    } catch (error) {
        console.log(error);
    }
};
