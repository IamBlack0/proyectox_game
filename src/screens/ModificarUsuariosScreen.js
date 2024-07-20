import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    CheckBox,
} from 'react-native';
import styles from '../styles/ModificarUsuariosStyles';

const ModificarUsuariosScreen = ({ navigation }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [formData, setFormData] = useState({ nombre_usuario: '', correo_usuario: '', contra_usuario: '', rol_usuario: '', img_usuario: '' });

    useEffect(() => {
        fetch('http://192.168.50.177:8080/usuarios')
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
            img_usuario: usuario.img_usuario,
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
                    setFormData({ nombre_usuario: '', correo_usuario: '', contra_usuario: '', rol_usuario: '', img_usuario: '' });
                    // Refetch usuarios
                    fetch('http://192.168.50.177:8080/usuarios')
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
        }

        else{
            Alert.alert(
                'Confirmación',
                '¿Estás seguro de que quieres eliminar los usuarios seleccionados?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Eliminar', onPress: () => {
                            fetch('http://192.168.0.4:8080/usuarios/', {
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
                        }
                    },
                ]
            );
        }
    };

    const handleSelectAll = (isSelected) => {
        setSelectedIds(isSelected ? usuarios.map(user => user.id_usuario) : []);
    };

    const handleSelectRow = (id) => {
        setSelectedIds(prevIds =>
            prevIds.includes(id) ? prevIds.filter(i => i !== id) : [...prevIds, id]
        );
    };

    const renderTableHeader = () => (
        <View style={styles.tableRow}>
            <Text style={[styles.headerCell]}>Nombre</Text>
            <Text style={[styles.headerCell]}>Correo</Text>
            <Text style={[styles.headerCell]}>Contraseña</Text>
            <Text style={[styles.headerCell]}>Rol</Text>
            <Text style={[styles.headerCell]}>Imagen</Text>
        </View>
    );

    const renderTableRow = (item) => (
        <View style={styles.tableRow} key={item.id_usuario}>
            <CheckBox
                style={styles.checkboxStyle}
                value={selectedIds.includes(item.id_usuario)}
                onValueChange={() => handleSelectRow(item.id_usuario)
            }
            />
            <Text style={styles.tableCell}>{item.nombre_usuario}</Text>
            <Text style={styles.tableCell}>{item.correo_usuario}</Text>
            <Text style={styles.tableCell}>{item.contra_usuario}</Text>
            <Text style={styles.tableCell}>{item.rol_usuario}</Text>
            <Text style={styles.tableCell}>{item.img_usuario}</Text>
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
            <ScrollView style={styles.tableContainer}>
                <View style={styles.table}>
                    {renderTableHeader()}
                    {usuarios.map(renderTableRow)}
                </View>
            </ScrollView>
            {editingUserId && (
                <View style={styles.form}>
                    <Text style={styles.text}>Espacio de modificación</Text>
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
                    <TextInput
                        placeholder="Imagen"
                        value={formData.img_usuario}
                        onChangeText={(text) => setFormData({ ...formData, img_usuario: text })}
                        style={styles.input}
                    />
                    <View style={styles.button}>
                        <Button title="Guardar" onPress={handleSave} />
                    </View>
                </View>)}
        </View>
    );
};


export default ModificarUsuariosScreen;
