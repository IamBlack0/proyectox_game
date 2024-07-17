// src/screens/Personaje1Screen.js
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from '../styles/PersonajeScreenStyles';

const Personaje1Screen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: 'https://art.pixilart.com/thumb/sr2ea7f8d2c35aws3.png' }}
                style={styles.image}
            />
            <View style={styles.heartsContainer}>
                <View style={styles.heartIcon} />
                <View style={styles.heartIcon} />
                <View style={styles.heartIcon} />
            </View>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo sed dolor ultrices iaculis. Donec accumsan efficitur dolor sit amet vehicula.</Text>
            <View style={[styles.cardContainer, { backgroundColor: '#ffcccb' }]} />
            <Text style={styles.placeName}>NOMBRE DE LUGAR O PERSONAJE</Text>
            <Text style={styles.date}>2000</Text>
        </ScrollView>
    );
};

export default Personaje1Screen;
