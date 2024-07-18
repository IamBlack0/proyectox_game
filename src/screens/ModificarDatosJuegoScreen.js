// src/screens/ModificarDatosJuegoScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/AdminScreenStyles';

const ModificarDatosJuegoScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Modificar Datos del Juego</Text>
            <Text style={styles.description}>
                Aquí puedes modificar los datos del juego.
            </Text>
            {/* Agrega aquí los componentes y funcionalidades específicas para modificar los datos del juego */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Admin')}
            >
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModificarDatosJuegoScreen;
