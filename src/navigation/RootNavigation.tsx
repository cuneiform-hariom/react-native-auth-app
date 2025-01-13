import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import RecipeDetail from '../screens/RecipeDetail'
import { AuthContext } from '../context/AuthContext'

export type RootStackParamsList = {
    Login: undefined,
    Signup: undefined,
    Home: undefined,
    RecipeDetail: { recipeId: string }
}

const Stack = createNativeStackNavigator()

const RootNavigation: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [initialRoute, setInitialRoute] = useState<keyof RootStackParamsList>('Login');

    useEffect(() => {
        if (isAuthenticated) {
            setInitialRoute('Home');
        } else {
            setInitialRoute('Login');
        }
    }, [isAuthenticated]);

    if (initialRoute === null) {
        return null;
    }

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name='RecipeDetail' component={RecipeDetail} />
        </Stack.Navigator>
    )
}

export default RootNavigation;