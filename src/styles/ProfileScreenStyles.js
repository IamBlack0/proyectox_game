import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: [{ translateY: -50 }],
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
    },
    updateButton: {
        width: '50%',
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    logoutButton: {
        width: '50%',
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    missionCompleted: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
