import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ProfileScreenStyles';

function ProfileScreen({ navigation }) {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [newImgUrl, setNewImgUrl] = useState('');

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const { nombre_usuario, img_usuario } = JSON.parse(user);
                setNombreUsuario(nombre_usuario);
                setImgUrl(img_usuario || '');
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
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const response = await fetch(`http://192.168.0.3:8080/usuarios/${user.id_usuario}/imagen`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ img_usuario: newImgUrl }),
            });

            if (response.ok) {
                const updatedUser = { ...user, img_usuario: newImgUrl };
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                setImgUrl(newImgUrl);
                Alert.alert('Imagen actualizada', 'Tu imagen de perfil ha sido actualizada.');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Hubo un problema al actualizar la imagen.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al actualizar la imagen.');
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
