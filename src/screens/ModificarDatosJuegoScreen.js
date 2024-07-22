import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import ModificarDatosJuegoStyles from '../styles/ModificarDatosJuegoStyles';

// Definimos la URL de la API usando las variables de entorno
const API_URL = process.env.API_URL;

const ModificarDatosJuegoScreen = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [personajeData, setPersonajeData] = useState([]);

    const fetchPersonajeData = async () => {
        try {
            const response = await fetch(`${API_URL}/personajes/campos`);
            const data = await response.json();
            setPersonajeData(data);
        } catch (error) {
            console.error("Error fetching personaje data:", error);
        }
    };

    useEffect(() => {
        if (selectedTable === 'personaje') {
            fetchPersonajeData();
        }
    }, [selectedTable]);

    return (
        <View style={ModificarDatosJuegoStyles.container}>
            <View style={ModificarDatosJuegoStyles.buttonContainer}>
                <TouchableOpacity
                    style={ModificarDatosJuegoStyles.tableButton}
                    onPress={() => setSelectedTable('personaje')}
                >
                    <Text style={ModificarDatosJuegoStyles.buttonText}>Personaje</Text>
                </TouchableOpacity>
                {/* Puedes añadir más botones para otras tablas aquí */}
            </View>
            <ScrollView style={ModificarDatosJuegoStyles.dataContainer}>
                {selectedTable === 'personaje' && personajeData.map((personaje, index) => (
                    <View key={index} style={ModificarDatosJuegoStyles.dataItem}>
                        <Text>Imagen: {personaje.img_personaje}</Text>
                        <Text>Lugar: {personaje.lugar_personaje}</Text>
                        <Text>Fecha: {personaje.fecha_personaje}</Text>
                        <Text>Misión: {personaje.mision_personaje}</Text>
                        <Text>Descripción: {personaje.descripcion_personaje}</Text>
                        <Text>Audio: {personaje.audio_personaje}</Text>
                    </View>
                ))}
                {/* Puedes añadir más condiciones para otras tablas aquí */}
            </ScrollView>
        </View>
    );
};

export default ModificarDatosJuegoScreen;
