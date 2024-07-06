import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a ProyectoX Game</Text>
            <Button
                title="Ir a Iniciar Sesión"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 22,
        marginBottom: 20,
    }
});

export default HomeScreen;
