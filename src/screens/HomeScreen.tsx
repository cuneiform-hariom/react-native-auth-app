import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigation/RootNavigation'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, "Home">

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { signOut } = useContext(AuthContext)

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
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})