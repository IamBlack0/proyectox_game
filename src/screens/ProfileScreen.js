// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileScreenStyles';

function ProfileScreen({ navigation }) {
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        const obtenerNombreUsuario = async () => {
            const user = await AsyncStorage.getItem('user');
            const nombre = user ? JSON.parse(user).nombre_usuario : 'Usuario';
            setNombreUsuario(nombre);
        };

        obtenerNombreUsuario();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.replace('LoginRegister');
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdnb.artstation.com/p/assets/images/images/056/671/665/large/nooarth-witchanimegirlblink.jpg?1669822411' }}
                style={styles.profileImage}
            />
            <Text style={styles.userName}>{nombreUsuario}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileScreen;
