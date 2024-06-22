import { View, Text, Button, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DataTable } from 'react-native-paper';

const GetProduct = () => {

  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [eliminate, setEliminate] = useState(false)

  const fetchProducts = async () => {
    try {
      const fetch = await axios.get(`http://192.168.100.7:3000/api/producto`);
      setProductos(fetch.data);
    } catch (e) {
      console.log(e);
    }
  }

  const dltProducts = async (id: number) => {
    setEliminate(true)
    try {
      const fetch = await axios.delete(`http://192.168.100.7:3000/api/producto/${id}`);
      fetchProducts();
      Alert.alert('Producto eliminado con Exito!')
    } catch (e) {
      console.log(e);
    }
  }

  const detail = (producto: any) => {
    setSelectedProduct(producto);
    setShow(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Precio</DataTable.Title>
          <DataTable.Title>Ver</DataTable.Title>
        </DataTable.Header>
        {productos.map((producto: any) => (
          <DataTable.Row key={producto.id}>
            <DataTable.Cell>{producto.nombre}</DataTable.Cell>
            <DataTable.Cell>{producto.precio}</DataTable.Cell>
            <DataTable.Cell><Button title='Ver' onPress={() => detail(producto)}></Button></DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {show && selectedProduct && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ alignSelf: 'center' }}>Nombre: {selectedProduct.nombre}</Text>
          <Text style={{ alignSelf: 'center' }}>Precio: {selectedProduct.precio}</Text>
          <Text style={{ alignSelf: 'center' }}>Descripcion: {selectedProduct.descripcion}</Text>
          <Button title='Eliminar' onPress={() => dltProducts(selectedProduct.id)}></Button>
        </View>
      )}


    </ScrollView>
  )
}

export default GetProduct