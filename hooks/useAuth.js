import * as Google from 'expo-auth-session/providers/google';
import { View, Text } from 'react-native'
import { createContext, useContext, useEffect, useState, useNavigation } from "react";
import { ResponseType } from 'expo-auth-session';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithCredential,
    onAuthStateChanged,
} from 'firebase/auth'
import { app, auth } from '../firebase'
// import { useNavigation } from '@react-navigation/native'


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    // navigation = useNavigation()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        imgUrl: "",
        id_token: "",
    });



    // const user = auth.currentUser
    // !Sign up:
    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                Alert.alert('Account created!')
                const user = userCredential.user;
                setUser({ ...user, email: user.email });
                console.log(user)
            }).catch(err => {
                console.log(err.code)
                console.log(err.message)
            })
    }

    // !Sign in:
    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(`Welcome ${email}!`)
                const user = userCredential.user;
                return user
                // user && navigation.navigate('Home')

            }).catch(err => {
                console.log(err)
                Alert.alert(err.message)
            })
    }

    //! Google login
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({

        expoClientId: '693208400867-s83tm2ckt5mqh0udud62hj5fffogsuku.apps.googleusercontent.com',

    }
    )

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const auth = getAuth()
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(result => {
                    setUser({
                        ...user,
                        id: result.uid,
                        name: result.displayName,
                        email: result.email,
                        imgUrl: result.photoURL,
                        id_token: result.getIdToken,
                    })
                    console.log(user)
                    //                         // const userGoogle = result.user
                })

        }

    }, [response]);

    //! Persistence of auth Token session
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userLogged) => {
            if (userLogged) {
                const uid = userLogged.uid;
                console.log(userLogged);
                //                     setUser({
                //                         ...user,
                //                         id: userLogged.uid,
                //                         name: userLogged.displayName, 
                //                         email: userLogged.email, 
                //                         id_token: userLogged.getIdToken, 
                //                         imgUrl: userLogged.photoURL
                //                          })
                //                          console.log(user);
                navigation.navigate('Home', { user: user })
            } else {
                navigation.navigate('Login')
                console.log('logged out currently');
            }
        });
        unsubscribe;
    }, [])

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
                user,
                createUser,
                handleSignIn,
                handleSignOut,
                request,
                response,
                promptAsync,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}


// import * as WebBrowser from 'expo-web-browser';
// import * as Linking from 'expo-linking';
import { Button } from 'react-native';


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