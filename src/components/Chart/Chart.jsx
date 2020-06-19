import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css";

const Chart = ({ fetchedData: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        };
        fetchApi();
    }, []);

    const showLine = () => (
        <Line
            data={{
                labels: dailyData.map(({ reportDate }) => reportDate),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed.total),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths.total),
                        label: "Deaths",
                        borderColor: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                        fill: true,
                    },
                ],
            }}
            options={{
                maintainAspectRatio: false,
            }}
        />
    );

    const showBar = () => (
        <Bar
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "People",
                        backgroundColor: [
                            "rgba(0,0,255, .5)",
                            "rgba(0,255,0, .5)",
                            "rgba(255,0,0, .5)",
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: `Current state in ${country}`,
                },
                maintainAspectRatio: false,
            }}
        />
    );

    return (
        <div className={styles.container}>
            {country ? showBar() : showLine()}
        </div>
    );
};

export default Chart;
