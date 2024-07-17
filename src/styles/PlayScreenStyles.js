import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: Platform.OS === 'web' ? 20 : 10, // Aumentado para web
        marginBottom: 10,
        borderRadius: 5,
        minWidth: Platform.OS === 'web' ? 470 : 'auto', // Añadido para web
    },
    buttonText: {
        color: '#fff',
        fontSize: Platform.OS === 'web' ? 24 : 16, // Aumentado para web
    },
    textContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        paddingLeft: Platform.OS === 'web' ? 20 : 0,
        borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
        borderColor: '#ccc',
    },
    optionTitle: {
        fontSize: Platform.OS === 'web' ? 28 : 22, // Aumentado para web
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: Platform.OS === 'web' ? 'left' : 'center',
        alignSelf: Platform.OS === 'web' ? 'flex-start' : 'center',
    },
    contentContainer: {
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: Platform.OS === 'web' ? 400 : 150, // Aumentado para web
        height: Platform.OS === 'web' ? 400 : 150, // Aumentado para web
        marginBottom: 10,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
        marginLeft: Platform.OS === 'web' ? 20 : 0, // Aumentado para web
        paddingLeft: Platform.OS === 'web' ? 20 : 0, // Añadido padding para web
    },
    detailText: {
        fontSize: Platform.OS === 'web' ? 50 : 16, // Aumentado para web
        marginBottom: Platform.OS === 'web' ? 20 : 5, // Aumentado para web
    },
    startButton: {
        backgroundColor: '#007bff',
        padding: Platform.OS === 'web' ? 20 : 10, // Aumentado para web
        borderRadius: 5,
        marginTop: 20,
        // Eliminar alignSelf para estirar el botón
    },
    startButtonText: {
        color: '#fff',
        fontSize: Platform.OS === 'web' ? 24 : 16, // Aumentado para web
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
});

export default styles;
