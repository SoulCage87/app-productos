import { View, Text, StyleSheet, Button, TextInput, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const PostProducts = () => {
const [photo, setPhoto] = useState(null);
const [nombre, setNombre] = useState('');
const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState('');
const [categoria, setCategoria] = useState('');
const [estado, setEstado] = useState('');

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
     
    });

    if (!result.canceled) {
        setPhoto(result.uri);
    }
  };

  const uploadimg = async () => {
    if (photo) {
      const file = await FileSystem.readAsStringAsync(photo, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const filename = photo.split('/').pop();
      const mimetype = 'image/jpeg'; 
  
      try {
        const response = await axios.post('http://192.168.100.7:3000/api/producto', {
          nombre,
          descripcion,
          precio,
          estado,
          categoria,
          foto: file,
          nombre_archivo: filename,
          mime_type: mimetype,
        });
        console.log(response.data);
        Alert.alert('Subido Con Exito!');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };


  return (
    <View style={{flex: 1, padding: 20}}>
        <TextInput
        style={styles.input}
        onChangeText={setNombre}
        value={nombre}
        placeholder="Nombre del producto"
        />
        <TextInput
        style={styles.input}
        onChangeText={setDescripcion}
        value={descripcion}
        placeholder="Descripcion del producto"
        />
        <Picker
        selectedValue={estado}
        onValueChange={(itemValue) => setEstado(itemValue)}
        style={styles.picker}>
            <Picker.Item label="Disponible" value="Disponible"/>
            <Picker.Item label="No disponible" value="No disponible"/>
        </Picker>
        <TextInput 
        style={styles.input}
        onChangeText={setCategoria}
        value={categoria}
        placeholder='Categoria'
        />
        <TextInput 
        style={styles.input}
        onChangeText={setPrecio}
        value={precio}
        placeholder='Precio'
        />
        <Button title="Elija la foto del producto" onPress={pickImage} />

        {photo ? (
        <Image
          style={{ width: 200, height: 200, marginTop: 20 }}
          source={{ uri: photo }}
        />
      ) : null}
    
  <Button title='Subir Informacion' onPress={uploadimg}></Button>

    </View>
  )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
    },
    picker: {
      height: 50,
      width: '100%',
      marginBottom: 10,
    },
  });

export default PostProducts