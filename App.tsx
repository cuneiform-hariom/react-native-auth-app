import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigation/RootNavigation'
import { AuthProvider } from './src/context/AuthContext'
import { RecipeProvider } from './src/context/RecipeContext'

const App = () => {
  return (
    <AuthProvider>
      <RecipeProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </RecipeProvider>
    </AuthProvider>
  )
}

export default App