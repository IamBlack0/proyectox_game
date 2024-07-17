// src/screens/Personaje3Screen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/PersonajeScreenStyles';

const Personaje3Screen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Esta es la pantalla del personaje 3</Text>
            <Image
                source={{ uri: 'https://example.com/personaje3.jpg' }} // Reemplaza con tu URL de imagen
                style={styles.image}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Personaje: Nombre del Personaje 3</Text>
                <Text style={styles.detailText}>Fecha: 09/01/1964</Text>
                <Text style={styles.detailText}>Lugar: Ferrocarril</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={() => {/* Acción del botón */}}>
                <Text style={styles.startButtonText}>Empezar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Personaje3Screen;
