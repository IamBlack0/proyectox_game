import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants'; // Importar expo-constants
import styles from '../styles/RegisterScreenStyles';

const RegisterScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errors, setErrors] = useState({});


    const handleRegister = async () => {
        // Validación básica del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            setErrors({ correo_usuario: 'Correo electrónico no válido' });
            return;
        }

        // Validación de longitud mínima de contraseña
        if (contrasena.length < 6) { // Por ejemplo, requerimos al menos 6 caracteres
            setErrors({ contra_usuario: 'La contraseña debe tener al menos 6 caracteres' });
            return;
        }

        try {
            const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/usuarios/registrar`, { // Usa la URL de la variable de entorno
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombre,
                    correo_usuario: correo,
                    contra_usuario: contrasena,
                    rol_usuario: 1
                })
            });

            const result = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('user', JSON.stringify(result));
                Alert.alert("Registro exitoso", "Usuario registrado correctamente");
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
                style={[styles.input, errors.nombre_usuario ? styles.inputError : null]}
                placeholder="Nombre"
                onChangeText={setNombre}
                value={nombre}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
