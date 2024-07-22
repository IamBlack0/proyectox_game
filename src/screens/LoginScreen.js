import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants'; // Importar expo-constants
import styles from '../styles/LoginScreenStyles';

const LoginScreen = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/usuarios/login`, { // Usa la URL de la variable de entorno
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo_usuario: correo,
                    contra_usuario: contrasena
                })
            });

            const result = await response.json();

            if (response.ok) {
                // Guarda el usuario en AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(result));
                console.log('Usuario almacenado en AsyncStorage:', result);

                // Navega a la pantalla Home
                navigation.replace('Home');
            } else {
                setErrors({ [result.field]: result.error });
            }
        } catch (error) {
            console.error(error);
            setErrors({ general: error.message || "No se pudo conectar al servidor" });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, errors.correo_usuario ? styles.inputError : null]}
                placeholder="Correo"
                onChangeText={setCorreo}
                value={correo}
            />
            <TextInput
                style={[styles.input, errors.contra_usuario ? styles.inputError : null]}
                placeholder="Contraseña"
                onChangeText={setContrasena}
                value={contrasena}
                secureTextEntry
            />
            {Object.values(errors).map((error, index) => (
                <Text key={index} style={styles.errorText}>{error}</Text>
            ))}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
