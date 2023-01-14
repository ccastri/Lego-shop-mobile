// !React deps
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, Button, SafeAreaView, TouchableScreen, TouchableOpacity, Image, TextInput, ImageBackground, Switch, Alert, Keyboard, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
// !firebase auth and storage deps 
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { app, auth } from '../firebase'
import { ResponseType } from 'expo-auth-session';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithCredential,
    onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
//!Custom modules
import useToggle from '../hooks/useToggle'
import { TouchableWithoutFeedback } from 'react-native-web';

WebBrowser.maybeCompleteAuthSession();

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
    // useEffect(() => {
    //     if (response?.type === 'success') {
    //         const { id_token } = response.params
    //         const auth = getAuth()
    //         const credential = GoogleAuthProvider.credential(id_token);
    //         signInWithCredential(auth, credential)
    //             .then(result => {
    //                 setUser({
    //                     ...user,
    //                     id: result._tokenResponse.uid,
    //                     name: result._tokenResponse.displayName,
    //                     email: result._tokenResponse.email,
    //                     imgUrl: result._tokenResponse.photoUrl,
    //                 })
    //                 navigation.navigate('Home', { user: user })
    //                 // console.log(result)
    //             })
    //     }
    // }, [response]);

    // const createUser = async () => {
    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
    //         const user = userCredential.user;
    //         console.log(userCredential)
    //         Alert.alert('Account created!')
    //         navigation.navigate('Login')
    //     } catch (error) {
    //         Alert.alert(error.message)
    //         console.log(error)
    //         // Alert.alert(error.message)
    //     }
    // }

    //         .catch(err => {
    //             Alert.alert(err.code)
    //             Alert.alert(err.message)
    //         })

    // }
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
    // Add a new document in collection "users"
    // useEffect(() => {

    //     setDoc(doc(db, "users", "new users"), {
    //         name: "Los Angeles",
    //         state: "CA",
    //         country: "USA"
    //     });
    // }, [])

    const { toggle, toggleFunction } = useToggle()

    return (
        <SafeAreaView className='flex-1 h-screen bg-gray-300 relative'>

            <View className='relative flex-1  '>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#414977', '#5b66a6', '#343a5f']}
                    className='rounded-2xl'
                />
                <View className='absolute z-50 bg-white ml-[82%] mt-4   flex-1'>

                    <Switch
                        // onClick={toggleFunction}
                        onValueChange={toggleFunction}
                        value={toggle}
                        className='absolute p-5 z-50 '

                    />
                </View>
                <View className='h-[200px] items-center  '>
                    {

                        toggle ? (
                            <View className='  p-4 items-center'>

                                <Image
                                    resizeMode='center'
                                    source={{
                                        uri: 'https://c4.wallpaperflare.com/wallpaper/536/402/410/awesome-black-lego-logo-alternate-entertainment-other-hd-art-wallpaper-thumb.jpg',
                                    }}
                                    className={'h-[50] w-20 top-[35] rounded-full '}
                                />
                                <Text className='top-6 pt-4 items-center text-gray-600 text-xs w-20 text-center font-semibold'>powered by cc4s3</Text>
                            </View>
                        ) : (
                            <View className=' items-center w-[full] '>

                                <Image
                                    resizeMode='contain'
                                    source={{
                                        uri: 'https://media.designrush.com/inspirations/129839/conversions/_1611238414_61_lego-logo-1-preview.jpg'
                                    }}
                                    className='h-12 top-[50] w-20 rounded-full '
                                />
                                <Text className='top-8 pt-6 items-center text-gray-600 text-xs w-20 text-center font-semibold'>powered by cc4s3</Text>
                            </View>
                        )
                    }
                </View>


                <LinearGradient
                    // Button Linear Gradient
                    colors={['#d6c675', '#a69a5b', '#776e41']}
                    className='rounded-2xl'
                >
                    <View className=' relative rounded-t-3xl h-screen  '>

                        <ScrollView>
                            <View className='  top-14 items-center w-full'>
                                <Text
                                    className='top-8 w-80 items-center absolute  text-gray-600 font-semibold text-lg'
                                >Name
                                </Text>
                                <TextInput
                                    // type='text'
                                    value={user.name}
                                    placeholder='Name'
                                    KeyboardType='numeric'
                                    onChangeText={(text) => setUser({ ...user, name: text })}
                                    className='w-80 p-4 absolute top-16 bg-gray-300 mx-auto rounded-full'
                                />

                            </View>
                            <View className=' top-40 mt-4 items-center w-full'>
                                <Text
                                    className='w-80 absolute ml-4 text-gray-600 font-semibold text-lg'
                                >Email
                                </Text>
                                <TextInput
                                    // type='text'
                                    value={user.email}
                                    placeholder='Email'
                                    onChangeText={(text) => setUser({ ...user, email: text })}
                                    className='w-80 p-4 top-7 bg-gray-300 absolute rounded-full'
                                />
                            </View>
                            <View className='absolute top-64 w-full items-center'>

                                <Text
                                    className=' w-80 text-gray-600 font-semibold text-lg'
                                >Password</Text>
                                <TextInput
                                    // type='text'
                                    value={user.password}
                                    placeholder='Password'
                                    secureTextEntry={true}
                                    onChangeText={(text) => setUser({ ...user, password: text })}
                                    className='w-80 p-4 top-7 bg-gray-300 absolute rounded-full items-center mx-auto'
                                />
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>

            <TouchableOpacity
                className={`absolute mx-[25%] items-center bottom-40 w-52 ${toggle ? 'bg-red-500 ' : 'bg-gray-300'} p-4 rounded-2xl`}
                // onPress={handleSignIn}
                // onPress={dispatch(login(user.email, user.password))}
                onPress={createUser}
            >
                <Text className={`text-xl font-bold ${toggle ? 'text-black' : ' text-gray-600'}  text-center`}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity

                // disabled={!request}
                className={`absolute mx-[25%] items-center bottom-20 w-52 ${toggle ? 'bg-red-500 ' : 'bg-gray-300'} p-4  z-50 rounded-2xl`}
                onPress={() => navigation.navigate('Login')}
            >
                <Text className={`text-xl font-bold ${toggle ? 'text-black' : ' text-gray-600'}  text-center`}>Sign In </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LoginScreen













