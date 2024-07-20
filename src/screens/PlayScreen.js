import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants'; // Importar expo-constants
import styles from '../styles/PlayScreenStyles';

function PlayScreen() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [personajes, setPersonajes] = useState([]);
    const navigation = useNavigation();

    const backgroundImage = 'https://i.postimg.cc/qvTr9PMZ/images-pixelicious.png';
    useEffect(() => {
        fetchPersonajes();
    }, []);

    const fetchPersonajes = async () => {
        try {
            const response = await fetch(`${Constants.expoConfig.extra.apiUrl}/personajes/all`); // Usar la URL de la variable de entorno
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
        setSelectedOption(option);
        if (Platform.OS !== 'web') {
            setModalVisible(true);
        }
    };

    const handleStartPress = () => {
        if (selectedOption) {
            navigation.navigate('Introduccion', { personajeId: selectedOption.id_personaje });
        } else {
            console.error('No se ha seleccionado ningún personaje.');
        }
    };

    const renderContent = () => {
        if (!selectedOption) return null;

        return (
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
                    </View>
                </View>
                <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
                    <Text style={styles.startButtonText}>Empezar</Text>
                </TouchableOpacity>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.optionsContainer}>
                {personajes.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => handleOptionPress(option)}>
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
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.iconContainer}>
                                <Icon name="close" size={24} color="#000" />
                            </TouchableOpacity>
                            {renderContent()}
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default PlayScreen;
