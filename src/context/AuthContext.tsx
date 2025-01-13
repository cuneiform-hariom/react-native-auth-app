import { createContext, ReactNode, useState } from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface AuthContextData {
    token: string | null,
    isLoading: boolean,
    userId: string | null,
    signUp: (name: string, email: string, password: string) => Promise<boolean>,
    signIn: (email: string, password: string) => Promise<boolean>
    signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
        try {
            const data = {
                name: name,
                email: email,
                password: password
            }
            const res = await axios({
                method: "POST",
                url: "http://192.168.29.229:3000/api/auth/signup",
                data: data,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.status === 200) {
                return true

            } else {
                return false;
            }
        } catch (error) {
            console.log('error: ', error);
            return false
        }
    }

    const signIn = async (email: string, password: string): Promise<boolean> => {
        try {
            const data = {
                email: email,
                password: password
            }
            const res = await axios({
                method: "POST",
                url: "http://192.168.29.229:3000/api/auth/login",
                data: data,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const { token, userId } = res.data
            if (res.status === 200) {
                await AsyncStorage.setItem('token', token)
                setToken(token)
                await AsyncStorage.setItem('userId', userId)
                setUserId(userId)
                return true
            } else {
                return false;
            }
        } catch (error) {
            console.log('error: ', error);
            return false
        }
    }

    const signOut = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('userId')
            setToken(null)
            setUserId(null)
        } catch (error) {
            console.log('error: ', error);

        }
        return
    }
    return (
        <AuthContext.Provider value={{ token, userId, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )

}