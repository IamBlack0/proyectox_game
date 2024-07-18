// src/screens/ModificarUsuariosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Button, CheckBox, Alert } from 'react-native';

const ModificarUsuariosScreen = ({ navigation }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [formData, setFormData] = useState({ nombre_usuario: '', correo_usuario: '', contra_usuario: '', rol_usuario: '' });

    useEffect(() => {
        fetch('http://192.168.0.4:8080/usuarios')
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error('Error fetching usuarios:', error));
    }, []);

    const handleEdit = (usuario) => {
        setEditingUserId(usuario.id_usuario);
        setFormData({
            nombre_usuario: usuario.nombre_usuario,
            correo_usuario: usuario.correo_usuario,
            contra_usuario: usuario.contra_usuario,
            rol_usuario: usuario.rol_usuario.toString(),
        });
    };

    const handleSave = () => {
        fetch(`http://192.168.0.4:8080/usuarios/${editingUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario: editingUserId, ...formData }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje) {
                    alert(data.mensaje);  // Mostrar mensaje de éxito o error del backend
                    setEditingUserId(null);
                    setFormData({ nombre_usuario: '', correo_usuario: '', contra_usuario: '', rol_usuario: '' });
                    // Refetch usuarios
                    fetch('http://192.168.0.4:8080/usuarios')
                        .then(response => response.json())
                        .then(data => setUsuarios(data))
                        .catch(error => console.error('Error fetching usuarios:', error));
                } else {
                    alert('Error actualizando usuario');
                }
            })
            .catch(error => console.error('Error updating usuario:', error));
    };

    const handleDelete = () => {
        if (selectedIds.length === 0) {
            Alert.alert('No hay usuarios seleccionados');
            return;
        }

        Alert.alert(
            'Confirmación',
            '¿Estás seguro de que quieres eliminar los usuarios seleccionados?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => {
                        fetch('http://192.168.0.4:8080/usuarios/eliminar', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ ids: selectedIds }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.mensaje) {
                                    alert(data.mensaje);  // Mostrar mensaje de éxito o error del backend
                                    setSelectedIds([]);
                                    // Refetch usuarios
                                    fetch('http://192.168.0.4:8080/usuarios')
                                        .then(response => response.json())
                                        .then(data => setUsuarios(data))
                                        .catch(error => console.error('Error fetching usuarios:', error));
                                } else {
                                    alert('Error eliminando usuarios');
                                }
                            })
                            .catch(error => console.error('Error deleting usuarios:', error));
                    } },
            ]
        );
    };

    const handleSelectAll = (isSelected) => {
        setSelectedIds(isSelected ? usuarios.map(user => user.id_usuario) : []);
    };

    const handleSelectRow = (id) => {
        setSelectedIds(prevIds =>
            prevIds.includes(id) ? prevIds.filter(i => i !== id) : [...prevIds, id]
        );
    };

    const renderItem = ({ item }) => (
        <View style={[styles.userItem, editingUserId === item.id_usuario && styles.editing]}>
            <CheckBox
                value={selectedIds.includes(item.id_usuario)}
                onValueChange={() => handleSelectRow(item.id_usuario)}
            />
            <Text style={styles.userName}>{item.nombre_usuario}</Text>
            <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Modificar Usuarios</Text>
            <Text style={styles.description}>
                Aquí puedes gestionar la información de los usuarios.
            </Text>
            <View style={styles.actions}>
                <Button title="Eliminar" onPress={handleDelete} color="#FF5733" />
                <Button title="Seleccionar Todos" onPress={() => handleSelectAll(true)} />
                <Button title="Deseleccionar Todos" onPress={() => handleSelectAll(false)} />
            </View>
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id_usuario.toString()}
                renderItem={renderItem}
            />
            {editingUserId && (
                <View style={styles.form}>
                    <TextInput
                        placeholder="Nombre de usuario"
                        value={formData.nombre_usuario}
                        onChangeText={(text) => setFormData({ ...formData, nombre_usuario: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Correo electrónico"
                        value={formData.correo_usuario}
                        onChangeText={(text) => setFormData({ ...formData, correo_usuario: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Contraseña"
                        value={formData.contra_usuario}
                        onChangeText={(text) => setFormData({ ...formData, contra_usuario: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Rol (número)"
                        value={formData.rol_usuario}
                        onChangeText={(text) => setFormData({ ...formData, rol_usuario: text })}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Button title="Guardar" onPress={handleSave} />
                </View>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Admin')}
            >
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
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
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    editing: {
        borderColor: '#000',
        borderWidth: 2,
    },
    userName: {
        flex: 1,
    },
    editButton: {
        color: 'blue',
        marginLeft: 10,
    },
    form: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ModificarUsuariosScreen;
