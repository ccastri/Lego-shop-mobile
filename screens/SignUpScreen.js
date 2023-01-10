import { View, Text, Button, SafeAreaView, TouchableScreen, TouchableOpacity, Image, TextInput, ImageBackground, Switch, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithCredential,
    onAuthStateChanged,
} from 'firebase/auth'
import * as WebBrowser from 'expo-web-browser';
// import { Button } from 'react-native';
import { app, auth } from '../firebase'
import useToggle from '../hooks/useToggle'

WebBrowser.maybeCompleteAuthSession();
// !!!! SECOND TRIAL !!!!
const LoginScreen = () => {

    const navigation = useNavigation()
    const [user, setUser] = useState({
        name: null,
        email: null,
        password: null,
        imgUrl: null,
        id_token: null,
    });



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            const auth = getAuth()
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(result => {
                    // console.log('entraaaaa')
                    setUser({
                        ...user,
                        id: result._tokenResponse.uid,
                        name: result._tokenResponse.displayName,
                        email: result._tokenResponse.email,
                        imgUrl: result._tokenResponse.photoUrl,
                        // id_token: result.getIdToken,
                    })
                    navigation.navigate('Home', { user: user })
                    // console.log(result)
                })


        }

    }, [response]);

    const createUser = () => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(userCredential => {
                Alert.alert('Account created!')
                const user = userCredential.user;
                navigation.navigate('Login')

            }).catch(err => {
                Alert.alert(err.code)
                Alert.alert(err.message)
            })
    }
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({

        expoClientId: '693208400867-s83tm2ckt5mqh0udud62hj5fffogsuku.apps.googleusercontent.com',

    }
    )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userLogged) => {
            if (userLogged) {
                const uid = userLogged.uid;
                // console.log(userLogged);
                //  console.log(user);

            } else {
                // navigation.navigate('Login')
                console.log('logged out currently');
            }
        });
        unsubscribe;
    }, [])


    const { toggle, toggleFunction } = useToggle()

    return (
        <SafeAreaView className='flex-1 '>

            <View className='relative flex-1 '>
                <View className='absolute z-50 bg-white ml-[82%] mt-4   flex-1'>

                    <Switch
                        // onClick={toggleFunction}
                        onValueChange={toggleFunction}
                        value={toggle}
                        className='absolute p-5 z-50 '

                    />
                </View>
                {
                    toggle ? (
                        <ImageBackground
                            resizeMode='center'
                            source={{
                                uri: 'https://c4.wallpaperflare.com/wallpaper/536/402/410/awesome-black-lego-logo-alternate-entertainment-other-hd-art-wallpaper-thumb.jpg',
                            }}
                            className={'flex-1 bg-black'}
                        />
                    ) : (
                        <ImageBackground
                            resizeMode='center'
                            source={{
                                uri: 'https://media.designrush.com/inspirations/129839/conversions/_1611238414_61_lego-logo-1-preview.jpg'
                            }}
                            className='flex-1 bg-red-600 '
                        />
                    )
                }
                <View className='absolute items-center w-full h-screen '>

                    <TextInput
                        // type='text'
                        value={user.email}
                        placeholder='Email'
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        className='w-80 p-4 top-20 bg-gray-200 absolute rounded-full'
                    />
                    <TextInput
                        // type='text'
                        value={user.password}
                        placeholder='Password'
                        onChangeText={(text) => setUser({ ...user, password: text })}
                        className='w-80 p-4 top-40 bg-gray-200 absolute rounded-full items-center mx-auto'
                    />
                </View>
            </View>

            <TouchableOpacity
                className={`absolute mx-[25%] items-center bottom-40 w-52 ${toggle ? 'bg-red-500 ' : 'bg-black'} p-4 rounded-2xl`}
                // onPress={handleSignIn}
                // onPress={dispatch(login(user.email, user.password))}
                onPress={createUser}
            >
                <Text className={`text-xl font-bold ${toggle ? 'text-black' : ' text-white'}  text-center`}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity

                // disabled={!request}
                className={`absolute mx-[25%] items-center bottom-20 w-52 ${toggle ? 'bg-red-500 ' : 'bg-black'} p-4 rounded-2xl`}
                onPress={() => navigation.navigate('Login')}
            >
                <Text className={`text-xl font-bold ${toggle ? 'text-black' : ' text-white'}  text-center`}>Login </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LoginScreen













