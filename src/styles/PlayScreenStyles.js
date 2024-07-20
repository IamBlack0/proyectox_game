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
        backgroundColor: '#ececed',
        padding: Platform.OS === 'web' ? 20 : 15,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        width: Platform.OS === 'web' ? 'calc(100% - 40px)' : '80%',
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: Platform.OS === 'web' ? 30 : 18,
        fontFamily: Platform.OS === 'web' ? 'AllertaStencil_400Regularv' : 'AllertaStencil_400Regular',
    },
    textContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        paddingLeft: Platform.OS === 'web' ? 20 : 0,
        borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
        borderColor: '#ccc',
    },
    optionTitle: {
        fontSize: Platform.OS === 'web' ? 40 : 20,
        fontWeight: 'bold',
        marginBottom: Platform.OS === 'web' ? 20 : 10,
        padding: 10,
        fontFamily: Platform.OS === 'web' ? 'AllertaStencil_400Regular' : 'AllertaStencil_400Regular',
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
        paddingTop: 10,
        fontSize: Platform.OS === 'web' ? 30 : 16,
        marginBottom: 5,
        fontFamily: Platform.OS === 'web' ? 'CourierPrime_400Regular' : 'CourierPrime_400Regular',
    },
    startButton: {
        backgroundColor: 'rgba(0,123,255,0)',
        padding: Platform.OS === 'web' ? 20 : 10, // Aumentado para web
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#000',
        // Eliminar alignSelf para estirar el botón
    },
    startButtonText: {
        color: '#000000',
        fontSize: Platform.OS === 'web' ? 24 : 16, // Aumentado para web
        fontFamily: Platform.OS === 'web' ? 'CourierPrime_400Regular' : 'CourierPrime_400Regular',
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
