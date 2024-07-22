// Archivo PersonajeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import styles from '../styles/PersonajeScreenStyles'; // Asegúrate de la ruta correcta
import Constants from 'expo-constants';
import { useRoute, useNavigation } from '@react-navigation/native'; // Para obtener parámetros de la ruta y navegación
import { Audio } from 'expo-av'; // Importar módulo para manejar audio


const ErrorBoundary = ({ onError, FallbackComponent, children }) => {
    const [error, setError] = useState(null);

    if (error) {
        return <FallbackComponent error={error} />;
    }

    return children;
};

const ErrorFallbackComponent = ({ error }) => {
    return (
        <View style={styles.errorContainer}>
            <Text>Oops! Ha ocurrido un error</Text>
            <Text>{error.message}</Text>
        </View>
    );
};
//prueba
const PersonajeScreen = () => {
    const route = useRoute(); // Obtener parámetros de la ruta
    const navigation = useNavigation(); // Obtener la función de navegación
    const { personajeId } = route.params || {}; // Obtener personajeId del parámetro de la ruta
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [currentPregunta, setCurrentPregunta] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [puntaje, setPuntaje] = useState(0);
    const [preguntasRespondidas, setPreguntasRespondidas] = useState([]);
    const [showResult, setShowResult] = useState(false); // Estado para mostrar el resultado final
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Para saber cuál respuesta fue seleccionada
    const [sound, setSound] = useState(null); // Para manejar el sonido
    const API_URL = process.env.API_URL; // Corrección aquí

    useEffect(() => {
        const loadQuestionsAndAnswers = async () => {
            try {


                // Fetch preguntas
                const preguntasResponse = await fetch(`${API_URL}/preguntas/all`);
                if (!preguntasResponse.ok) {
                    throw new Error('Error al obtener preguntas: ' + preguntasResponse.statusText);
                }
                const preguntasText = await preguntasResponse.text();
                const preguntasData = JSON.parse(preguntasText);

                // Filtrar preguntas por personajeId
                const filteredPreguntas = preguntasData.filter(pregunta => pregunta.id_personaje_pregunta === personajeId);
                setPreguntas(filteredPreguntas);

                // Fetch respuestas
                const respuestasResponse = await fetch(`${API_URL}/respuestas/all`);
                if (!respuestasResponse.ok) {
                    throw new Error('Error al obtener respuestas: ' + respuestasResponse.statusText);
                }
                const respuestasText = await respuestasResponse.text();
                if (!respuestasText) {
                    throw new Error('Respuesta de respuestas está vacía');
                }

                const respuestasData = JSON.parse(respuestasText);
                setRespuestas(respuestasData);

                if (filteredPreguntas.length > 0) {
                    setCurrentPregunta({
                        ...filteredPreguntas[0],
                        respuestas: respuestasData.filter(
                            (respuesta) => respuesta.id_respuesta_pregunta === filteredPreguntas[0].id_pregunta
                        ),
                    });
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                console.error('Error al cargar preguntas y respuestas:', error);
            }
        };

        loadQuestionsAndAnswers();
    }, [personajeId]);

    const handleAnswer = (respuesta) => {
        const isCorrect = respuesta.efecto_respuesta === 1;

        // Marcar la pregunta como respondida
        setPreguntasRespondidas([...preguntasRespondidas, currentPregunta.id_pregunta]);

        if (isCorrect) {
            setPuntaje(puntaje + 1);
        }

        setSelectedAnswer(respuesta.id_respuesta);

        // Verificar si se han respondido todas las preguntas
        if (preguntasRespondidas.length + 1 === preguntas.length) {
            setShowResult(true);
            return;
        }

        // Ir a la siguiente pregunta
        const currentIndex = preguntas.findIndex(p => p.id_pregunta === currentPregunta.id_pregunta);
        const nextIndex = (currentIndex + 1) % preguntas.length;
        const nextPregunta = preguntas[nextIndex];
        setCurrentPregunta({
            ...nextPregunta,
            respuestas: respuestas.filter(
                (respuesta) => respuesta.id_respuesta_pregunta === nextPregunta.id_pregunta
            ),
        });
    };

    const handleGoHome = () => {
        navigation.navigate('Home'); // Cambiar 'Home' por el nombre de tu pantalla de inicio
    };

    const playAudio = async (audioUrl) => {
        if (sound) {
            await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setSound(newSound);
        await newSound.playAsync();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    if (showResult) {
        const nota = ((puntaje / preguntas.length) * 100);
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Tu puntaje final es: {puntaje}/{preguntas.length}   =     Nota: {nota.toFixed(2)}%</Text>
                <Button title="Regresar al Home" onPress={handleGoHome} />
            </View>
        );
    }

    return (
        <ErrorBoundary onError={(error) => setError(error)} FallbackComponent={ErrorFallbackComponent}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: currentPregunta.imagen_pregunta }} style={styles.image} />
                <Text style={styles.text}>{currentPregunta.pregunta}</Text>
                {currentPregunta.audio_pregunta && (
                    <TouchableOpacity
                        onPress={() => playAudio(currentPregunta.audio_pregunta)}
                        style={styles.audioButton}
                    >
                        <Text style={styles.buttonText}>Reproducir Audio</Text>
                    </TouchableOpacity>
                )}
                {currentPregunta.respuestas && currentPregunta.respuestas.map((respuesta) => {
                    const isCorrect = respuesta.efecto_respuesta === 1;
                    const isSelected = respuesta.id_respuesta === selectedAnswer;
                    return (
                        <TouchableOpacity
                            key={respuesta.id_respuesta}
                            onPress={() => handleAnswer(respuesta)}
                            style={[
                                styles.button,
                                isSelected && (isCorrect ? styles.buttonCorrect : styles.buttonIncorrect)
                            ]}
                        >
                            <Text style={styles.buttonText}>{respuesta.respuesta}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </ErrorBoundary>
    );
};

export default PersonajeScreen;