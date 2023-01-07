import { View, Text } from 'react-native'
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null);

    // !Sign up:
    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                Alert.alert('Account created!')
                const user = userCredential.user;

            }).catch(err => {
                console.log(err)
            })
    }

    // !Sign in:
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(`Welcome ${email}!`)
                const user = userCredential.user;
                user && navigation.navigate('Home')

            }).catch(err => {
                console.log(err)
                Alert.alert(err.message)
            })
    }
    // !Sign out:
    const handleSignOut = () => {
        signOut(auth)
        console.log('loggedOut')
    }

    return (
        <AuthContext.Provider
            value={{
                user: {
                    email,
                    password,
                },
                setEmail,
                setPassword,
                createUser,
                handleSignIn,
                handleSignOut,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}


// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import * as Linking from 'expo-linking';
// import { Button } from 'react-native';


// Listener for when the user is attempting to sign in
// WebBrowser.maybeCompleteAuthSession();

// const [accessToken, setAccessToken] = useState(null);
    // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({

        // expoClientId: '693208400867-s83tm2ckt5mqh0udud62hj5fffogsuku.apps.googleusercontent.com',
        // webClientId: '693208400867-s83tm2ckt5mqh0udud62hj5fffogsuku.apps.googleusercontent.com',
        // androidClientId: '693208400867-4576kt3auk33od4hj6ua8f46978mrvrj.apps.googleusercontent.com',
        // iosClientId: '693208400867-k1b2gt58omfnnb39ap6pga7oa7cdtla7.apps.googleusercontent.com',

    // })

    // useEffect(() => {
        // if (response?.type === 'success') {
            // setAccessToken(response.authentication.accessToken)
            // accessToken && fetchUserInfo
        // }
    // }, [response, accessToken]);

    // async function fetchUserInfo() {
        // let response = await fetch('https://www.googleapis.com/userinfo/v2/me',
            // {
                // headers: {
                    // Authorization: `Bearer ${accessToken}`
                // }
            // })
        // const userInfo = await response.json()
        // setUser(userInfo)
    // }