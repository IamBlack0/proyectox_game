import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    checkboxStyle: {
        marginRight: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    tableContainer: {
        flex: 1,
        marginBottom: 20,
        maxHeight: '40%'
    },
    table: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    tableCell: {
        flex: 1,
        maxWidth: '20%'
    },
    headerCell: {
        flex: 1,
        maxWidth: '20%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    editButton: {
        color: 'blue',
        marginLeft: 10,
    },
    form: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 4,
        padding: 10,
        marginBottom: 10,
        maxWidth: '13%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
export default styles;