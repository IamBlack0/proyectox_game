// Archivo PersonajeScreenStyles.js
//prueba
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    buttonCorrect: {
        backgroundColor: 'green',
    },
    buttonIncorrect: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    audioButton: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#007BFF',
        alignItems: 'center',
    },
});

export default styles;