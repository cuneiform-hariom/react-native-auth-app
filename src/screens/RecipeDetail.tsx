import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamsList } from '../navigation/RootNavigation'
import { Recipe, RecipeContext } from '../context/RecipeContext'

type RecipeDetailRouteProps = RouteProp<RootStackParamsList, "RecipeDetail">

interface RecipeDetailScreenProps {
  route: RecipeDetailRouteProps
}

const RecipeDetail: React.FC<RecipeDetailScreenProps> = ({ route }) => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  console.log('recipe: ', recipe);
  const { recipeId } = route.params
  const { fetchRecipeDetail } = useContext(RecipeContext)


  useEffect(() => {
    const getDetail = async () => {
      const detail = await fetchRecipeDetail(recipeId)
      setRecipe(detail)
    }
  }, [recipeId])

  return (
    <View>
      <Text>RecipeDetail</Text>
    </View>
  )
}

export default RecipeDetail

const styles = StyleSheet.create({})