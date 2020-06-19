import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setFetchedCountries(await fetchCountries());
        };
        fetchApi();
    }, []);
    return (
        <FormControl className={styles.formCoutrol}>
            <NativeSelect defaultValue="" onChange={handleChange}>
                <option value="global">Gloabl</option>
                {fetchedCountries.map(({ name }) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
