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
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    textContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        paddingLeft: Platform.OS === 'web' ? 20 : 0,
        borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
        borderColor: '#ccc',
    },
    optionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    image: {
        width: Platform.OS === 'web' ? 300 : 150,
        height: Platform.OS === 'web' ? 300 : 150,
        marginRight: 10,
        marginLeft: Platform.OS === 'web' ? 0 : -10,
    },
    detailsContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    loremText: {
        fontSize: 14,
        textAlign: 'justify',
    },
    textScroll: {
        maxHeight: Platform.OS === 'web' ? 300 : '80%',
        marginTop: 10,
    },
    startButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
    startButtonText: {
        color: '#fff',
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
});

export default styles;
