// src/screens/Personaje2Screen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/PersonajeScreenStyles';

const Personaje2Screen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Esta es la pantalla del personaje 2</Text>
            <Image
                source={{ uri: 'https://example.com/personaje2.jpg' }} // Reemplaza con tu URL de imagen
                style={styles.image}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Personaje: Nombre del Personaje 2</Text>
                <Text style={styles.detailText}>Fecha: 09/01/1964</Text>
                <Text style={styles.detailText}>Lugar: Ferrocarril</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={() => {/* Acción del botón */}}>
                <Text style={styles.startButtonText}>Empezar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Personaje2Screen;
