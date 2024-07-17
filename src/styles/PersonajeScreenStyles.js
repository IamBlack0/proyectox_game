import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        alignSelf: 'center',
    },
    heartsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        userSelect: 'none', // Esto evitará la selección del texto en web
    },
    cardContainer: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    cardText: {
        fontSize: 18,
        color: '#fff',
        userSelect: 'none', // Esto evitará la selección del texto en web
    },
    placeName: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    date: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default styles;
