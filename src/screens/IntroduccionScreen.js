import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av'; // Usando expo-av para reproducir video en Expo
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants'; // Importar expo-constants
import styles from '../styles/IntroduccionScreenStyles';

const IntroduccionScreen = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const videoRef = useRef(null); // Referencia para el componente Video
    const navigation = useNavigation();
    const route = useRoute();
    const plataforma = Platform.OS === 'web' ? 'web' : 'movil'; // Determinar la plataforma actual

    useEffect(() => {
        fetchVideoData(route.params.personajeId, plataforma);
    }, []);

    const fetchVideoData = async (personajeId, plataforma) => {
        try {
            const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/personajes/${personajeId}/videos/${plataforma}`); // Usa la URL de la variable de entorno
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setVideoUrl(data[0].url_videos);
                    console.log('Datos del video:', data[0]);
                }
            } else {
                console.error('Error al obtener datos del video');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleVideoPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
            navigation.navigate('Personaje', { personajeId: route.params.personajeId });
        }
    };

    const handleSkipPress = async () => {
        if (videoRef.current) {
            await videoRef.current.pauseAsync(); // Pausar el video
        }
        navigation.navigate('Personaje', { personajeId: route.params.personajeId });
    };

    return (
        <View style={styles.container}>
            {videoUrl ? (
                <>
                    <Video
                        ref={videoRef} // Asignar la referencia al Video
                        source={{ uri: videoUrl }}
                        style={styles.video}
                        useNativeControls
                        resizeMode="contain"
                        shouldPlay
                        isLooping={false}
                        onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
                        onError={(error) => console.error('Error al reproducir el video', error)}
                    />
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
                        <Text style={styles.skipButtonText}>Saltar Video</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Cargando video...</Text>
            )}
        </View>
    );
};

export default IntroduccionScreen;
