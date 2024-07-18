import React, { useState } from 'react';
import { View, Text, Image, Animated, PanResponder, Platform } from 'react-native';
import styles from '../styles/PersonajeScreenStyles';
import { FontAwesome } from '@expo/vector-icons';

const PersonajeScreen = () => {
    const [cardColor, setCardColor] = useState(getRandomColor());

    const pan = useState(new Animated.ValueXY())[0];

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan.x }
            ],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gesture) => {
            const limit = Platform.OS === 'web' ? 150 : 100;
            if (Math.abs(gesture.dx) > limit) {
                setCardColor(getRandomColor());
                Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            } else {
                Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            }
        }
    });

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://art.pixilart.com/thumb/sr2ea7f8d2c35aws3.png' }}
                style={styles.image}
            />
            <View style={styles.heartsContainer}>
                <FontAwesome name="heart" size={24} color="red" />
                <FontAwesome name="heart" size={24} color="red" />
                <FontAwesome name="heart" size={24} color="red" />
            </View>
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo sed dolor ultrices iaculis. Donec accumsan efficitur dolor sit amet vehicula.
            </Text>
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.cardContainer,
                    pan.getLayout(),
                    { backgroundColor: cardColor },
                    Platform.OS === 'web' ? { alignSelf: 'center' } : {}
                ]}
            />
            <Text style={styles.placeName}>NOMBRE DE LUGAR O PERSONAJE</Text>
            <Text style={styles.date}>2000</Text>
        </View>
    );
};

const getRandomColor = () => {
    const colors = ['#ffcccb', '#add8e6', '#90ee90', '#d3d3d3', '#ffa07a'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default PersonajeScreen;