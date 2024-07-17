// src/styles/PersonajeScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    heartsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    heartIcon: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 15,
        marginRight: 10,
    },
    text: {
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    cardContainer: {
        width: '80%',
        height: 150,
        borderRadius: 10,
        marginBottom: 20,
    },
    placeName: {
        fontSize: 20,
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        color: '#888',
    },
});

export default styles;
