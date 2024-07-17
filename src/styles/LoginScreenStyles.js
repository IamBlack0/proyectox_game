// src/styles/LoginScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 2,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    registerText: {
        marginTop: 20,
        textAlign: 'center',
    },
    registerLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default styles;
