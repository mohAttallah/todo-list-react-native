import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

const Task = ({ task, onDelete }) => {
    return (
        <View style={styles.task}>
            {/* <Image source={( uri: task.photo) } style={styles.image} /> */}
            
            <Image source={{ uri: task.photo }} style={styles.image} />
            <Text>{task.title}</Text>
            <TouchableOpacity onPress={() => onDelete(task.id)}>
                <Text style={styles.delete}>Delete</Text>

            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    delete: {
        color: 'red',
        marginLeft: 10,
    },
});

export default Task;
