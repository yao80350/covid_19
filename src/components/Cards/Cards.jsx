import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { fetchData } from "../../api";
import styles from "./Cards.module.css";
import CardItem from "../CardItem/CardItem";
import { cardsDataDefault } from "./Cards.data";

const Cards = () => {
    const [cardsData, setCardsData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const {
                confirmed,
                recovered,
                deaths,
                lastUpdate,
            } = await fetchData();
            const updatedCardsData = { ...cardsDataDefault };
            updatedCardsData.confirmed.value = confirmed.value;
            updatedCardsData.recovered.value = recovered.value;
            updatedCardsData.deaths.value = deaths.value;

            const arrayData = Object.values(updatedCardsData);
            setCardsData({ cards: arrayData, lastUpdate });
        };
        fetchApi();
    }, []);

    if (!cardsData.lastUpdate) {
        return "Loading...";
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                {cardsData.cards.map((card, idx) => (
                    <CardItem
                        key={idx}
                        card={card}
                        lastUpdate={cardsData.lastUpdate}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default Cards;
