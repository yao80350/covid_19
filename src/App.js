import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
    state = {
        fetchedData: {},
        country: "",
    };

    async componentDidMount() {
        this.setState({ fetchedData: await fetchData() });
    }

    handleChange = async (event) => {
        const country =
            event.target.value === "global" ? "" : event.target.value;
        const data = await fetchData(country);
        this.setState({ fetchedData: data, country });
    };

    render() {
        const { fetchedData, country } = this.state;
        console.log(fetchedData);
        return (
            <div className={styles.container}>
                <Cards fetchedData={fetchedData} />
                <CountryPicker handleChange={this.handleChange} />
                <Chart fetchedData={fetchedData} country={country} />
            </div>
        );
    }
}

export default App;
