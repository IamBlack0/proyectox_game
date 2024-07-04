import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { API_URL } from '@env';

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    const getUsuarios = async () => {
        try {
            const response = await fetch(`${API_URL}/usuarios/all`);
            const json = await response.json();
            console.log('Datos obtenidos:', json); // Verificar los datos obtenidos
            // Filtrar datos incompletos
            const validData = json.filter(item => item && item.id_usuario !== undefined);
            setUsuarios(validData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={usuarios}
                    keyExtractor={(item, index) => index.toString()} // Usar índice como clave temporalmente
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>{item.nombre_usuario}</Text>
                            <Text>{item.correo_usuario}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default App;
