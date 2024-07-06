import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pantalla de Inicio de Sesión</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    }
});

export default LoginScreen;
