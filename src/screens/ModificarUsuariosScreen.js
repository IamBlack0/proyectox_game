import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Platform, Modal, TouchableOpacity } from 'react-native';
import styles from '../styles/ModificarUsuariosStyles';

const ModificarUsuariosScreen = ({ navigation }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [correoUsuario, setCorreoUsuario] = useState('');
    const [contraUsuario, setContraUsuario] = useState('');
    const [rolUsuario, setRolUsuario] = useState('');
    const [imgUsuario, setImgUsuario] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [crearVisible, setCrearVisible] = useState(false);
    const API_URL = process.env.API_URL;

    const fetchUsuarios = async () => {
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleSelectUser = (id) => {
        const user = usuarios.find(u => u.id_usuario === id);
        if (user) {
            setSelectedUser(user);
            setNombreUsuario(user.nombre_usuario);
            setCorreoUsuario(user.correo_usuario);
            setContraUsuario(user.contra_usuario);
            setRolUsuario(user.rol_usuario.toString());
            setImgUsuario(user.img_usuario);
            setModalVisible(true);
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`${API_URL}/usuarios/${selectedUser.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombreUsuario,
                    correo_usuario: correoUsuario,
                    contra_usuario: contraUsuario,
                    rol_usuario: parseInt(rolUsuario, 10),
                    img_usuario: imgUsuario,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Usuario actualizado con éxito');
                setModalVisible(false);
                setSelectedUser(null);
                setNombreUsuario('');
                setCorreoUsuario('');
                setContraUsuario('');
                setRolUsuario('');
                setImgUsuario('');
                fetchUsuarios();
            } else {
                alert('Error al actualizar el usuario: ' + result.error);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCreateUser = async () => {
        try {
            const response = await fetch(`${API_URL}/usuarios/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombreUsuario,
                    correo_usuario: correoUsuario,
                    contra_usuario: contraUsuario,
                    rol_usuario: parseInt(rolUsuario, 10),
                    img_usuario: imgUsuario,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Usuario creado con éxito');
                setCrearVisible(false);
                setSelectedUser(null);
                setNombreUsuario('');
                setCorreoUsuario('');
                setContraUsuario('');
                setRolUsuario('');
                setImgUsuario('');
                fetchUsuarios();
            } else {
                alert('Error al crear el usuario: ' + result.error);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;
        try {
            const response = await fetch(`${API_URL}/usuarios/${selectedUser.id_usuario}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Usuario eliminado con éxito');
                setModalVisible(false);
                setSelectedUser(null);
                setNombreUsuario('');
                setCorreoUsuario('');
                setContraUsuario('');
                setRolUsuario('');
                setImgUsuario('');
                fetchUsuarios();
            } else {
                const result = await response.json();
                alert('Error al eliminar el usuario: ' + result.error);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Modificar Usuario</Text>
            {usuarios.map(user => (
                <Button key={user.id_usuario} title={`Seleccionar ${user.nombre_usuario}`}
                        onPress={() => handleSelectUser(user.id_usuario)}/>
            ))}
            {selectedUser && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        setSelectedUser(null);
                        setNombreUsuario('');
                        setCorreoUsuario('');
                        setContraUsuario('');
                        setRolUsuario('');
                        setImgUsuario('');
                    }}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Editar Usuario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de Usuario"
                            value={nombreUsuario}
                            onChangeText={setNombreUsuario}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            value={correoUsuario}
                            onChangeText={setCorreoUsuario}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            value={contraUsuario}
                            onChangeText={setContraUsuario}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Rol de Usuario"
                            value={rolUsuario}
                            onChangeText={setRolUsuario}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Imagen de Usuario URL"
                            value={imgUsuario}
                            onChangeText={setImgUsuario}
                        />
                        <Button title="Actualizar Usuario" onPress={handleUpdateUser}/>
                        <Button title="Eliminar Usuario" onPress={handleDeleteUser} color="red"/>
                    </View>
                </Modal>
            )}
            <Button title="Crear Nuevo Usuario" onPress={() => setCrearVisible(true)}/>
            {crearVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={crearVisible}
                    onRequestClose={() => {
                        setCrearVisible(!crearVisible);
                        setNombreUsuario('');
                        setCorreoUsuario('');
                        setContraUsuario('');
                        setRolUsuario('');
                        setImgUsuario('');
                    }}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setCrearVisible(false)}>
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Crear Nuevo Usuario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de Usuario"
                            value={nombreUsuario}
                            onChangeText={setNombreUsuario}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            value={correoUsuario}
                            onChangeText={setCorreoUsuario}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            value={contraUsuario}
                            onChangeText={setContraUsuario}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Rol de Usuario"
                            value={rolUsuario}
                            onChangeText={setRolUsuario}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Imagen de Usuario URL"
                            value={imgUsuario}
                            onChangeText={setImgUsuario}
                        />
                        <Button title="Crear Usuario" onPress={handleCreateUser}/>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
};

export default ModificarUsuariosScreen;
