import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import RecipeDetail from '../screens/RecipeDetail'

export type RootStackParamsList = {
    Login: undefined,
    Signup: undefined,
    Home: undefined,
    RecipeDetail: { recipeId: string }
}

const Stack = createNativeStackNavigator()

const RootNavigation: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name='RecipeDetail' component={RecipeDetail} />
        </Stack.Navigator>
    )
}

export default RootNavigation;