// src/screens/AdminScreen.js

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/AdminScreenStyles';

const AdminScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Panel de Administrador</Text>
            <Text style={styles.description}>
                Aquí puedes gestionar diferentes aspectos del sistema.
            </Text>
            {/* Agrega aquí los componentes y funcionalidades específicas del panel de administrador */}
        </View>
    );
};

export default AdminScreen;
