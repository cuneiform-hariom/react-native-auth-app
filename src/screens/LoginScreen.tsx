import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigation/RootNavigation'
import { AuthContext } from '../context/AuthContext'

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, "Login">

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState("hariom@gmail.com")
  const [password, setPassword] = useState("Hariom@123")
  const handleLogin = async () => {
    if (email && password) {
      const success = await signIn(email, password)
      console.log('success: ', success);
      if(success){
        navigation.navigate("Home")
      }else{
        Alert.alert("Invalid credential")
      }
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        style={styles.inputField}
        placeholder='Email'
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={"gray"}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.linkText}>Don't have an account? Sign Up </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  inputField: {
    width: "100%",
    height: 45,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    color: "black"
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#056edd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 16,
  },
  linkText: {
    color: "#056edd"
  }
})