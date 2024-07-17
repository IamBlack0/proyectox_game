import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const isWeb = width > 800; // Ajusta este valor según tus necesidades

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece la imagen de fondo
        alignItems: isWeb ? 'flex-start' : 'center', // Alinear los elementos a la izquierda en la web y al centro en móvil
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: isWeb ? 55 : 28, // Ajustar el tamaño del texto "ShadoWars" para web y móvil
        color: '#fff', // Asegúrate de que el texto sea visible sobre la imagen de fondo
        marginBottom: 20,
        fontFamily: 'AllertaStencil_400Regular', // Usar la fuente Allerta Stencil
    },
    button: {
        marginVertical: 10, // Añadir margen vertical para separar los botones
        width: isWeb ? 'auto' : wp('80%'), // Ajustar el ancho del botón para que sea responsivo
        height: 'auto', // Ajustar la altura del botón para que se ajuste al contenido
        backgroundColor: 'transparent', // Cambiar el fondo de los botones a transparente
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: isWeb ? 32 : 14, // Ajustar el tamaño del texto del botón para que sea más grande en la web
        color: '#fff', // Cambiar el color del texto del botón a blanco
        fontFamily: 'AllertaStencil_400Regular', // Usar la fuente Allerta Stencil
    },
    adminButton: {
        marginVertical: 10,
        width: isWeb ? 'auto' : wp('80%'),
        height: 'auto',
        backgroundColor: '#3B5998', // Color de fondo del botón de administrador
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    adminButtonText: {
        fontSize: isWeb ? 32 : 14,
        color: '#fff',
        fontFamily: 'AllertaStencil_400Regular',
    },
    soundButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        zIndex: 10,
    },
});

export default styles;
