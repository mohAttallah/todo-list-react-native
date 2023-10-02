import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Task from './components/Task';

export default function App() {
  //const [title, setImages] = useState('');

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('')
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      console.log('Camera permission denied');
    }
  };

  const handleAdd = () => {
    if (photo) {
      setTasks([...tasks, { id: Date.now(), title, photo }]);
      setPhoto(null)
      setTitle('');
    }
  };

  const handleCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images


    });

    if (!result.cancelled) {
      setPhoto(result.uri)
    }
  };

  const handleDelete = (taskId) => {

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);


  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />



      <TouchableOpacity onPress={handleCamera}>
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
        {!photo && <Text>Take a Photo</Text>}

      </TouchableOpacity>
      <Button title="Add Task" onPress={handleAdd} />
      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    // marginBottom: 20,
  },
  taskList: {
    flex: 1,
    width: '100%',
  },
});
