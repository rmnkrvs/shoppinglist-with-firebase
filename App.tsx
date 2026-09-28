import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';

import { app } from './firebaseConfig'

type Product = {
  id?: string;
  title: string;
  amount: string;
}

const database = getDatabase(app);

export default function App() {

  const [product, setProduct] = useState<Product>({
    title: '',
    amount: ''
  });
  const [listItem, setListItems] = useState<Product[]>([]);

  useEffect(() => {
    return onValue(ref(database, 'items/'), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setListItems(items as Product[]);
      } else {
        setListItems([]);
      }
    });
  }, []);

  const handleSave = async () => {
    if (product.amount && product.title) {
      push(ref(database, 'items/'), product);
      setProduct({ title: '', amount: '' });
    }
    else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }

  const handleDelete = (id?: string) => {
    if (!id) return;
    remove(ref(database, `items/${id}`));
  }

  return (

    <View style={styles.container}>

      <StatusBar style="auto" />

      <Text style={styles.title}>Add items to your shopping list</Text>
      <Text></Text>
      <TextInput
        style={styles.input}
        placeholder='product'
        onChangeText={text => setProduct({ ...product, title: text })}
        value={product.title}
      />
      <TextInput
        style={styles.input}
        placeholder='amount'
        onChangeText={text => setProduct({ ...product, amount: text })}
        value={product.amount}
      />

      <View style={styles.buttons}>
        <Button title="SAVE" onPress={handleSave} />
      </View>

      <FlatList
        data={listItem}
        keyExtractor={(item) => item.id!}
        ListHeaderComponent={
          <Text style={styles.listTitle}>Shopping List</Text>
        }
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.listItem}>{item.title}, {item.amount} </Text>
            <Text style={styles.listItemBought} onPress={() => handleDelete(item.id!)}>delete</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 140,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    width: 250,
    height: 40
  },
  buttons: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  listTitle: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    textAlign: 'center',
  },
  listItemBought: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
  },
});