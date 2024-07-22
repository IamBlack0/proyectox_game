import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importar desde @react-native-picker/picker
import styles from '../styles/RankingScreenStyles'; // Importa el archivo de estilos

const RankingScreen = () => {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [idPersonaje, setIdPersonaje] = useState(1);
    const [selectedMission, setSelectedMission] = useState('');
    const [missions, setMissions] = useState([]);

    const apiUrl = process.env.API_URL;

    useEffect(() => {
        fetchRankingGeneral(idPersonaje);
    }, [idPersonaje]);

    const fetchRankingGeneral = async (idPersonaje) => {
        try {
            const response = await fetch(`${apiUrl}/ranking/general?idPersonaje=${idPersonaje}`);
            if (!response.ok) {
                throw new Error('Error al obtener el ranking general: ' + response.statusText);
            }
            const data = await response.json();
            setRankings(data);

            // Extraer misiones para el filtro
            const uniqueMissions = [...new Set(data.map(ranking => ranking.mision_personaje))];
            setMissions(uniqueMissions);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener el ranking general:', error);
            setError(error);
            setLoading(false);
        }
    };



    const filterRankings = () => {
        if (selectedMission === '') {
            return rankings;
        }
        return rankings.filter(ranking => ranking.mision_personaje === selectedMission);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando rankings...</Text>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Error al cargar los rankings: {error.message}</Text>
                <Button title="Recargar Rankings" onPress={() => fetchRankingGeneral(idPersonaje)} />
            </View>
        );
    }

    if (rankings.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No hay rankings disponibles.</Text>
                <Button title="Recargar Rankings" onPress={() => fetchRankingGeneral(idPersonaje)} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pantalla de Ranking</Text>
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedMission}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedMission(itemValue)}
                >
                    <Picker.Item label="Seleccionar Misión" value="" />
                    {missions.map((mission) => (
                        <Picker.Item key={mission} label={mission} value={mission} />
                    ))}
                </Picker>
                <Button title="Mostrar Rankings Filtrados" onPress={() => {}} />
                <Button title="Mostrar Ranking General" onPress={() => fetchRankingGeneral(idPersonaje)} />
            </View>
            <FlatList
                data={filterRankings()}
                keyExtractor={(item) => item.id_ranking.toString()}
                renderItem={({ item }) => (
                    <View style={styles.rankingItem}>
                        <Image source={{ uri: item.img_usuario }} style={styles.userImage} />
                        <View>
                            <Text style={styles.rankingText}>
                                Usuario: {item.nombre_usuario} - Puntaje: {item.puntaje_ranking}
                            </Text>
                            <Text style={styles.rankingText}>
                                Misión: {item.mision_personaje}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default RankingScreen;
