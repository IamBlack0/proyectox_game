import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        padding: 20,
        backgroundColor: 'transparent', // Hacer el fondo transparente para que se vea la imagen
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
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
        justifyContent: Platform.OS === 'web' ? 'center' : 'center',
        alignItems: Platform.OS === 'web' ? 'center' : 'center',
        paddingRight: Platform.OS === 'web' ? 20 : 0,
        marginTop: Platform.OS === 'web' ? 50 : 0,
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
    webButton: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '100%',
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: Platform.OS === 'web' ? 30 : 18,
        fontFamily: Platform.OS === 'web' ? 'AllertaStencil_400Regularv' : 'AllertaStencil_400Regular', // Usa la fuente All
    },
    textContainer: {
        flex: 2,
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        justifyContent: 'flex-start',
        paddingLeft: Platform.OS === 'web' ? 20 : 0,
        borderLeftWidth: Platform.OS === 'web' ? 3 : 0,
        borderColor: Platform.OS === 'web' ? 'black' : '#ccc',
    },
    optionTitle: {
        fontSize: Platform.OS === 'web' ? 40 : 20,
        fontWeight: 'bold',
        marginBottom: Platform.OS === 'web' ? 20 : 10,
        padding: 10,
        alignSelf: 'center',
        fontFamily: Platform.OS === 'web' ? 'AllertaStencil_400Regular' : 'AllertaStencil_400Regular', // Usa la fuente Courier Prime
    },
    webContentBox: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        width: '100%',
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    webContentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    image: {
        width: Platform.OS === 'web' ? 500 : 150,
        height: Platform.OS === 'web' ? 500 : 150,
        marginRight: 10,
        marginBottom: 10,
    },
    webImage: {
        width: Platform.OS === 'web' ? 400 : 150,
        height: Platform.OS === 'web' ? 370 : 150,
        marginBottom: 10,
    },
    detailsContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    webDetailsContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    detailText: {
        fontSize: Platform.OS === 'web' ? 20 : 16,
        marginBottom: 5,
        fontFamily: Platform.OS === 'web' ? 'CourierPrime_400Regular' : 'CourierPrime_400Regular', // Usa la fuente Courier Prime
    },
    loremText: {
        fontSize: Platform.OS === 'web' ? 16 : 14,
        textAlign: 'justify',
        maxWidth: Platform.OS === 'web' ? screenWidth * 0.5 : '100%',
        fontFamily: Platform.OS === 'web' ? 'CourierPrime_400Regular' : 'CourierPrime_400Regular', // Usa la fuente Courier Prime
    },
    textScroll: {
        maxHeight: Platform.OS === 'web' ? '80vh' : '80%',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        maxWidth: '90%',
        maxHeight: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        zIndex: 10,
    },
    closeButtonText: {
        color: '#fff',
    },
    audioButton: {
        marginTop: Platform.OS === 'web' ? 10 : 10,
    },
});

export default styles;
