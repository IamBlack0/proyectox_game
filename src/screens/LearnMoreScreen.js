import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, ScrollView, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants'; // Importar expo-constants
import styles from '../styles/LearnMoreScreenStyles';

const backgroundImage = 'https://i.postimg.cc/qvTr9PMZ/images-pixelicious.png';

function LearnMoreScreen({ navigation }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [personajes, setPersonajes] = useState([]);
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const API_URL = process.env.API_URL;// Corrección aquí

    useFocusEffect(
        React.useCallback(() => {
            // Detener el sonido al salir de la pantalla
            return () => {
                if (sound) {
                    sound.stopAsync();
                    sound.unloadAsync();
                    setIsPlaying(false);
                }
            };
        }, [sound])
    );

    useEffect(() => {
        fetchPersonajes();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const fetchPersonajes = async () => {
        try {
            const response = await fetch(`${API_URL}/personajes/all`); // Usa la URL de la variable de entorno
            if (response.ok) {
                const data = await response.json();
                setPersonajes(data);
            } else {
                console.error('Error al obtener los personajes');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleOptionPress = (option) => {
        if (selectedOption && sound) {
            sound.stopAsync();
            setIsPlaying(false);
        }
        setSelectedOption(option);
        if (Platform.OS === 'web') {
            setModalVisible(false);
        } else {
            setModalVisible(true);
        }
    };

    const handleAudioPress = async () => {
        if (isPlaying) {
            await sound.stopAsync();
            setIsPlaying(false);
        } else {
            if (sound) {
                await sound.stopAsync();
                setIsPlaying(false);
            }
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: selectedOption.audio_personaje }
            );
            setSound(newSound);
            newSound.playAsync();
            setIsPlaying(true);
        }
    };

    const renderContent = () => {
        if (!selectedOption) return null;

        return (
            <>
                {Platform.OS === 'web' ? (
                    <View style={styles.webContentBox}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.optionTitle}>{selectedOption.mision_personaje}</Text>
                            <Image
                                source={{ uri: selectedOption.img_personaje }}
                                style={styles.webImage}
                            />
                            <Text style={styles.detailText}>{selectedOption.fecha_personaje}</Text>
                            <Text style={styles.detailText}>{selectedOption.lugar_personaje}</Text>
                            <TouchableOpacity onPress={handleAudioPress} style={styles.audioButton}>
                                <Icon name={isPlaying ? "stop" : "play"} size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightContainer}>
                            <ScrollView style={styles.textScroll}>
                                <Text style={styles.loremText}>
                                    {selectedOption.descripcion_personaje}
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <>
                        <Text style={styles.optionTitle}>{selectedOption.mision_personaje}</Text>
                        <View style={styles.contentContainer}>
                            <Image
                                source={{ uri: selectedOption.img_personaje }}
                                style={styles.image}
                            />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailText}>{selectedOption.fecha_personaje}</Text>
                                <Text style={styles.detailText}>{selectedOption.lugar_personaje}</Text>
                                <TouchableOpacity onPress={handleAudioPress} style={styles.audioButton}>
                                    <Icon name={isPlaying ? "stop" : "play"} size={30} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={styles.textScroll}>
                            <Text style={styles.loremText}>
                                {selectedOption.descripcion_personaje}
                            </Text>
                        </ScrollView>
                    </>
                )}
            </>
        );
    };

    return (
        <ImageBackground
            source={{ uri: backgroundImage }}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.optionsContainer}>
                    {personajes.map((option, index) => (
                        <TouchableOpacity key={index} style={[styles.button, Platform.OS === 'web' && styles.webButton]} onPress={() => handleOptionPress(option)}>
                            <Text style={styles.buttonText}>{option.mision_personaje}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {Platform.OS === 'web' && selectedOption && (
                    <View style={styles.textContainer}>
                        {renderContent()}
                    </View>
                )}
                {Platform.OS !== 'web' && (
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {renderContent()}
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                    <Icon name="close-circle" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </ImageBackground>
    );
}

export default LearnMoreScreen;
