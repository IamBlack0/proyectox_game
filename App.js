import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font'; // Usa expo-font en lugar de @expo-google-fonts
import { AllertaStencil_400Regular } from '@expo-google-fonts/allerta-stencil';
import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime'; // Importa desde el paquete correcto
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    let [fontsLoaded] = useFonts({
        AllertaStencil_400Regular,
        CourierPrime_400Regular, // Agrega la fuente Courier Prime
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <AppNavigator />;
}
