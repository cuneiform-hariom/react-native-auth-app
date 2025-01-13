import { Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigation/RootNavigation'
import CreateRecipeForm from '../components/CreateRecipeForm'
import { Recipe, RecipeContext } from '../context/RecipeContext'
import RecipeItem from '../components/RecipeItem'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, "Home">

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { signOut } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [search, setsearch] = useState("")
  const { createRecipe, fetchRecipes, recipes } = useContext(RecipeContext)
  console.log('recipes: ', recipes);
  const handleLogout = () => {
    Alert.alert('Logout', "Are you sure want to logout?", [
      {
        text: "Cancel",
        style: 'cancel'
      },
      {
        text: "Log out",
        style: 'default',
        onPress: async () => {
          await signOut()
          navigation.replace("Login")
        }
      }
    ])
  }
  const handleCreateRecipeSubmit = (newRecipe: Omit<Recipe, '_id' | 'createdBy' | 'createdAt'>) => {
    createRecipe(newRecipe)
    setShowModal(false)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])


  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TextInput
          placeholder='Search Recipes...'
          placeholderTextColor={"black"}
          style={styles.searchBox}
          value={search}
          onChangeText={setsearch}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeItem recipe={item} onPressRecipeItem={() => navigation.navigate("RecipeDetail", { recipeId: item._id })} />}
          keyExtractor={(item) => item._id}
        />
      </View>

      {/* Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <CreateRecipeForm onCancel={() => setShowModal(false)} onSubmit={handleCreateRecipeSubmit} />
      </Modal>
      {/* Modal */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 8,
    borderRadius: 8,
    gap: 8
  },
  searchBox: {
    flex: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    height: 50,
    backgroundColor: "#ffffff",
    fontSize: 16,
    color: "#333333",
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutButton: {
    backgroundColor: "#ff6b6b",
    width: 100,
    height: 50,
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  addButton: {
    backgroundColor: "#ff6b6b",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  }
})
