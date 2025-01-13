import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigation/RootNavigation'
import { AuthContext } from '../context/AuthContext'

type SignupScreenNavigationProps = NativeStackNavigationProp<RootStackParamsList, "Signup">

interface SignupScreenProp {
  navigation: SignupScreenNavigationProps
}

const SignupScreen: React.FC<SignupScreenProp> = ({ navigation }) => {

  const [email, setEmail] = useState("hariom@gmail.com")
  const [name, setName] = useState("Hariom")
  const [password, setPassword] = useState("Hariom@123")

  const { signUp } = useContext(AuthContext)

  const handleSignup = async () => {
    if (email && password && name) {
      const success = await signUp(name, email, password)
      if (success) {
        Alert.alert('Success', "Account created successfully!")
        navigation.navigate("Login")
      } else {
        Alert.alert("Sinup failed", "Use different email and password")
      }
    } else {
      Alert.alert("Invalid inputs!")
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.inputField}
        placeholder='Name'
        placeholderTextColor={"gray"}
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Log In </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignupScreen

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