import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileScreenStyles';

function ProfileScreen({ navigation }) {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [newImgUrl, setNewImgUrl] = useState('');
    const API_URL = process.env.API_URL;

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const userObj = JSON.parse(user);
                setNombreUsuario(userObj.nombre_usuario);
                setImgUrl(userObj.img_usuario || '');
            }
        };

        obtenerDatosUsuario();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.replace('LoginRegister');
    };

    const handleUpdateImage = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (!user) throw new Error('Usuario no encontrado');

            const userObj = JSON.parse(user);

            console.log('API_URL:', API_URL);
            console.log('Usuario ID:', userObj.id_usuario);
            console.log('Nueva URL de la imagen:', newImgUrl);

            const response = await fetch(`${API_URL}/usuarios/${userObj.id_usuario}/imagen`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ img_usuario: newImgUrl }),
            });

            if (response.ok) {
                const updatedUser = { ...userObj, img_usuario: newImgUrl };
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                setImgUrl(newImgUrl);
                Alert.alert('Imagen actualizada', 'Tu imagen de perfil ha sido actualizada.');
                console.log('Imagen actualizada:', updatedUser);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Hubo un problema al actualizar la imagen.');
                console.error('Error al actualizar la imagen:', errorData);
            }
        } catch (error) {
            console.error('Error en handleUpdateImage:', error);
            Alert.alert('Error', error.message || 'Hubo un problema al actualizar la imagen.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imgUrl || 'https://cdnb.artstation.com/p/assets/images/images/056/671/665/large/nooarth-witchanimegirlblink.jpg?1669822411' }}
                style={styles.profileImage}
            />
            <Text style={styles.userName}>{nombreUsuario}</Text>
            <TextInput
                placeholder="Nueva URL de la imagen"
                value={newImgUrl}
                onChangeText={setNewImgUrl}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateImage}>
                <Text style={styles.buttonText}>Actualizar Imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileScreen;
