// src/screens/AdminScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/AdminScreenStyles';

const AdminScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Panel de Administrador</Text>
            <Text style={styles.description}>
                Aquí puedes gestionar diferentes aspectos del sistema.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ModificarUsuarios')}
            >
                <Text style={styles.buttonText}>Modificar Usuarios</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ModificarDatosJuego')}
            >
                <Text style={styles.buttonText}>Modificar Datos de Juego</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminScreen;
