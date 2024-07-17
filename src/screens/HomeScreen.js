import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/HomeScreenStyles';
import { Audio } from 'expo-av'; // Importa Audio de expo-av

const backgroundImage = { uri: 'https://i.postimg.cc/2yQPTpx5/Foto-Firma-de-Tratado-2-pixelicious.png' };
const musicFile = require('../../assets/MusicaFondo.mp3'); // Ruta relativa al archivo de música

const HomeScreen = ({ navigation }) => {
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (user) {
                    const userData = JSON.parse(user);
                    setUsuarioActual(userData);
                    console.log('Usuario actual:', userData);
                }
            } catch (error) {
                console.error('Error al obtener el usuario desde AsyncStorage:', error);
            }
        };

        checkUserRole();
    }, []);

    const toggleMusic = async () => {
        try {
            if (!sound) {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    musicFile,
                    { shouldPlay: true }
                );
                setSound(newSound);
                setIsPlaying(true);
            } else {
                if (isPlaying) {
                    await sound.pauseAsync();
                } else {
                    await sound.playAsync();
                }
                setIsPlaying(!isPlaying);
            }
        } catch (error) {
            console.error('Error reproduciendo/pausando la música:', error);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
            <View style={styles.overlay}>
                <Text style={styles.text}>ShadoWars</Text>
                <TouchableOpacity style={styles.soundButton} onPress={toggleMusic}>
                    <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LearnMore')}>
                    <Text style={styles.buttonText}>Conflictos historicos de Panamá</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Play')}>
                    <Text style={styles.buttonText}>Jugar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ranking')}>
                    <Text style={styles.buttonText}>Ranking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.buttonText}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
                    <Text style={styles.buttonText}>Ayuda</Text>
                </TouchableOpacity>
                {usuarioActual && usuarioActual.rol_usuario === 2 && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
                        <Text style={styles.buttonText}>Administrador</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
};

export default HomeScreen;