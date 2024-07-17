import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default styles;
