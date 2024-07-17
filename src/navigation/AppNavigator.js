// src/navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RankingScreen from '../screens/RankingScreen';
import PlayScreen from '../screens/PlayScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LearnMoreScreen from '../screens/LearnMoreScreen';
import HelpScreen from '../screens/HelpScreen';
import LoginRegisterScreen from '../screens/LoginRegisterScreen';
import Personaje1Screen from '../screens/Personaje1Screen';
import Personaje2Screen from '../screens/Personaje2Screen';
import Personaje3Screen from '../screens/Personaje3Screen';
import AdminScreen from '../screens/AdminScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

function AppNavigator() {
    const [initialRoute, setInitialRoute] = useState('LoginRegister');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setInitialRoute('Home');
            } else {
                setInitialRoute('LoginRegister');
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Ranking" component={RankingScreen} />
                <Stack.Screen name="Play" component={PlayScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="LearnMore" component={LearnMoreScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Help" component={HelpScreen} />
                <Stack.Screen name="Admin" component={AdminScreen} />
                <Stack.Screen name="Personaje1" component={Personaje1Screen} />
                <Stack.Screen name="Personaje2" component={Personaje2Screen} />
                <Stack.Screen name="Personaje3" component={Personaje3Screen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
