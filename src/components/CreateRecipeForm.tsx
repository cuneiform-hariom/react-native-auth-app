import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Recipe } from '../context/RecipeContext';

interface createReciepeForm {
    onSubmit: (recipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>) => void,
    onCancel: () => void
}

const CreateRecipeForm: React.FC<createReciepeForm> = ({ onCancel, onSubmit }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>("easy")
    const handleCreateRecipe =  () => {
        if (title && description) {
            onSubmit({ title, description, difficulty })
        } else {
            Alert.alert('Invalid input', "Please fill all fields")
        }
    }
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <Text style={styles.headerText}>Create New Recipe</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    placeholderTextColor="gray"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter description"
                    placeholderTextColor="gray"
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Difficulty</Text>
                    <Picker
                        style={[styles.picker, { color: '#333' }]}
                        itemStyle={{ color: '#666' }}
                        selectedValue={difficulty}
                        onValueChange={value => setDifficulty(value)}
                    >
                        <Picker.Item label="Easy" value="easy" />
                        <Picker.Item label="Medium" value="medium" />
                        <Picker.Item label="Hard" value="hard" />
                    </Picker>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleCreateRecipe}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateRecipeForm;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', // Light background color
    },
    modalHeader: {
        marginBottom: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333', // Dark text color for contrast
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        elevation: 5, // Adds a subtle shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        width: "100%",
        height: 45,
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        color: "black"
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top', // Ensures multiline text starts at the top
    },
    pickerContainer: {
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    cancelButton: {
        backgroundColor: 'red',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
