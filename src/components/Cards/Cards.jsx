import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import styles from "./Cards.module.css";
import CardItem from "../CardItem/CardItem";
import { cardsDataDefault } from "./Cards.data";

const Cards = ({
    fetchedData: { confirmed, recovered, deaths, lastUpdate },
}) => {
    const [cardsData, setCardsData] = useState({});

    useEffect(() => {
        if (!confirmed) return;
        const updatedCardsData = { ...cardsDataDefault };
        updatedCardsData.confirmed.value = confirmed.value;
        updatedCardsData.recovered.value = recovered.value;
        updatedCardsData.deaths.value = deaths.value;

        const arrayData = Object.values(updatedCardsData);
        console.log(arrayData);
        setCardsData({ cards: arrayData, lastUpdate });
    }, [confirmed]);
    if (!cardsData.cards) {
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
