import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            web: {
                width: '100vw', // Asegura que el contenedor ocupe todo el ancho de la ventana
                height: '100vh', // Asegura que el contenedor ocupe toda la altura de la ventana
            },
            default: {
                width: '100%', // Ocupa todo el ancho disponible en dispositivos móviles
                height: '100%', // Ocupa toda la altura disponible en dispositivos móviles
            },
        }),
    },
    video: {
        width: '100%',
        height: '100%',
        ...Platform.select({
            web: {
                objectFit: 'cover', // Ajusta el video para cubrir el contenedor sin distorsionarlo
            },
            default: {
                // Para móvil, aseguramos que el video se ajuste al contenedor
            },
        }),
    },
    skipButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        zIndex: 1,
    },
    skipButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;
