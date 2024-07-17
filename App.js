import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, AllertaStencil_400Regular } from '@expo-google-fonts/allerta-stencil';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    let [fontsLoaded] = useFonts({
        AllertaStencil_400Regular,
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
