import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av'; // Usando expo-av para reproducir video en Expo
import { useNavigation, useRoute } from '@react-navigation/native';

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
            const response = await fetch(`http://192.168.0.4:8080/personajes/${personajeId}/videos/${plataforma}`);
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
            <Text style={styles.title}>Introducción al Personaje</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    video: {
        flex: 1,
        width: '100%',
        height: Platform.OS === 'web' ? '100vh' : '100%',
    },
    skipButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    skipButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default IntroduccionScreen;
