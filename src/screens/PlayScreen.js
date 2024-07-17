// src/screens/PlayScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/PlayScreenStyles';

function PlayScreen({ navigation }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
        fetchPersonajes();
    }, []);

    const fetchPersonajes = async () => {
        try {
            const response = await fetch('http://192.168.0.4:8080/personajes/all');
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
        if (Platform.OS === 'web') {
            setModalVisible(false);
        } else {
            setModalVisible(true);
        }
    };

    const handleStartPress = () => {
        if (selectedOption.id_personaje === 1) {
            navigation.navigate('Personaje1');
        } else if (selectedOption.id_personaje === 2) {
            navigation.navigate('Personaje2');
        } else if (selectedOption.id_personaje === 3) {
            navigation.navigate('Personaje3');
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
                        <Text style={styles.detailText}>Personaje: {selectedOption.personaje}</Text>
                        <Text style={styles.detailText}>Fecha: {selectedOption.fecha_personaje}</Text>
                        <Text style={styles.detailText}>Lugar: {selectedOption.lugar_personaje}</Text>
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
