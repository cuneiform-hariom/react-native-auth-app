import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Recipe } from '../context/RecipeContext';

interface RecipeItemProps {
  recipe: Recipe;
  onPressRecipeItem: () => void
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onPressRecipeItem }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressRecipeItem}>
      <View style={styles.cardDetail}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <Text style={styles.difficulty}>Difficulty: {recipe.difficulty}</Text>
        <Text style={styles.createdAt}>
          Created At: {new Date(recipe.createdAt).toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 10,
    flexDirection: "row"
  },
  cardDetail: { flex: 1 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  difficulty: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
  },
  createdBy: {
    fontSize: 12,
    color: '#777',
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "red"
  },
  deleteText: {
    fontWeight: "bold",
    color: "white"
  }
});
