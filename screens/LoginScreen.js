import { View, Text, Button, SafeAreaView, TouchableScreen, TouchableOpacity, Image, TextInput, ImageBackground, Switch, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import * as Google from 'expo-auth-session/providers/google';
// import { ResponseType } from 'expo-auth-session';
import { 
    // createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithCredential,
    onAuthStateChanged,
    } from 'firebase/auth'
import * as WebBrowser from 'expo-web-browser';

import {app, auth} from '../firebase' //Revisarrrrr
import useToggle from '../hooks/useToggle'


WebBrowser.maybeCompleteAuthSession();
// const auth = getAuth(app)
//! Is almost working now
const LoginScreen = () => {

    const navigation = useNavigation();
    const [user, setUser] = useState(
        {
        name: null,
        email: null,
        password: null,
        imgUrl: null,
        id_token: null,
    });

//!Sign in with Email and pasword
    const handleSignIn = async () => {  
        await signInWithEmailAndPassword(auth, user?.email, user?.password)
            .then((userCredential) => {
                // console.log(`Welcome ${user.email}!`)
                const userData = userCredential.user;
                // console.log(userData)
                userData && navigation.navigate('Home', {user:userData})
            }).catch(err => {
                Alert.alert(err.code)
                Alert.alert(err.message)
            })
    }
//!Sign In wit Google (Ongoing)
console.log('holaaaa')
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: '693208400867-jh81kg2dlvcp1f6utschpfff7fk7v6dc.apps.googleusercontent.com',
        androidClientId: '693208400867-4576kt3auk33od4hj6ua8f46978mrvrj.apps.googleusercontent.com'
        // [
            // '693208400867-s83tm2ckt5mqh0udud62hj5fffogsuku.apps.googleusercontent.com',
        // ],
    })
    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params
            // const auth = getAuth(app)
            const credential = GoogleAuthProvider.credential(id_token);
            console.log('holaaaa')
            signInWithCredential(auth, credential)
            .then(() => {
                                navigation.navigate('Home')
                            })
                            }
                        }, [response]);
                            
                            
                    
            
            // useEffect(() => {
            //     const unsubscribe = onAuthStateChanged(auth, (userLogged) => {
            //         if (userLogged) {
            //             const uid = userLogged.uid;

            //         } else {
            //             console.log('logged out currently');
            //         }
            //     });
            //     unsubscribe;
            // }, [])


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
                        onChangeText={(text) => setUser({...user, email:text})}
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
                    className={`absolute mx-[25%] items-center bottom-60 w-52 ${toggle ? 'bg-red-500 ' : 'bg-black'} p-4 rounded-2xl`}
                    onPress={handleSignIn}
                    >
                <Text className={`text-xl font-bold ${toggle ? 'text-black' : ' text-white'}  text-center`}>Login </Text>
                    </TouchableOpacity>
                <TouchableOpacity
                    className={`absolute mx-[25%] items-center bottom-40 w-52 ${toggle ? 'bg-red-500 ' : 'bg-black'} p-4 rounded-2xl`}
                onPress={
                    ()=>{promptAsync()
                    }}
                    >
                <Text className={`text-xl font-bold ${toggle ? 'text-black' : ' text-white'}  text-center`}>Google login </Text>
                    </TouchableOpacity>
                <TouchableOpacity
                    className={`absolute mx-[25%] items-center bottom-20 w-52 ${toggle ? 'bg-red-500 ' : 'bg-black'} p-4 rounded-2xl`}
                    onPress = { ()=> navigation.navigate('SignUp') }
                    >
                <Text className={`text-xl font-bold ${toggle ? 'text-black' : ' text-white'}  text-center`}>Sign Up </Text>
                    </TouchableOpacity>
 
        </SafeAreaView>    
    )
}

export default LoginScreen


{/* <SafeAreaView className=' h-screen bg-white'>
            <View className='flex-row justify-between p-6 bg-[#1144] '>
                <TouchableOpacity
                    className=' '
                    title='Login'
                    onPress={()=> navigation.navigate('Home')} 
                    >
                        <ArrowLeftIcon size={35} color='black' className='p-4' />
                    </TouchableOpacity>
                <Text className='font-bold text-lg'>Register</Text>
            </View>
            <View className='p-8 '>
                <Text className='text-[#114444] mx-6 text-4xl text-center letter tracking-widest'>
                    You want to be part of the fun?
                </Text>
            </View>
           
                <View className='h-[400px] items-center py-5 px-2  rounded-2xl'>
                   <View>

                   <TextInput
                        type='text'
                            value={email}
                        placeholder='Email'
                        onChangeText={(text) => setEmail(text)}
                   />
                   </View>
                   <View>

                   <TextInput
                        type='text'
                            value={password}
                        placeholder='Password'
                        onChangeText={(text)=>setPassword(text)}
                   />
                   </View>

                   
                </View>


                    <TouchableOpacity className=' bg-black justify-center my-auto rounded-2xl p-4' onPress={handleSignIn}> 
                        <Text className=' text-lg text-white font-bold '>Login</Text>
                    </TouchableOpacity>
                
                <Text className='p-10 text-center text-xs text-orange-500'>Do you have a question? Ask for further assistance on the<Text> Help section</Text></Text>
            
        </SafeAreaView> */}
















//! Dev deps
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import * as Linking from 'expo-linking';

// TODO: Logic login Google
  // This should be the authSlice function
  // export const Auth = () => {
    // const [accessToken, setAccessToken] = useState();
    // This is the local user state on a random component down to the three
  // const [user, setUser] = useState(null);
  // This is the AutHRequest method to get authenticated through firebase those are the client ID's for each clientID
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // webClientId: '693208400867-s83tm2ckt5mqh0udud62hj5fffogsuku.apps.googleusercontent.com',
    // androidClientId: '693208400867-4576kt3auk33od4hj6ua8f46978mrvrj.apps.googleusercontent.com',
    // iosClientId: '693208400867-k1b2gt58omfnnb39ap6pga7oa7cdtla7.apps.googleusercontent.com',
    // expoClientId: '693208400867-s83tm2ckt5mqh0udud62hj5fffogsuku.apps.googleusercontent.com',
  // })

  // Keep listening until the client sends the request to Google Auth
  // Is successful? set the token and just if there is an access token
  // fetchuserInfo            (Async Thunk)
  // Reload whenever the response or the accessToken changes
  // useEffect(() => {
    // if (response?.type === 'success') {
      //! console.log(response?.type); la peticion es exitosa pero trae null en el authetication
      // !console.log(response.params.id_token) aquí hay un token que no es el auth token de google
      //* setAccessToken(response.authentication.accessToken)
      // *accessToken && fetchUserInfo
    // *}
  //* }, [response]);

  //Now you gotta deal with thunks:
  // You got this response from the google API servic.
  // You got the headers and inside of it you got the Authorization Property and the key is the Google Auth accessToken 
  // async function fetchUserInfo() {
  //   let response = await fetch('https://www.googleapis.com/userinfo/v2/me',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     }
  //   )
    // console.log(response.headers)
    // Now am just mocking a slice by setting the user into a local userInfo state  
  //   const userInfo = await response.json()
  //   console.log(userInfo)
  //   setUser(userInfo)
  // }


  // console.log(user)
  // const showUserInfo = () => {

  //   if (user) {
  //     return (
  //       <SafeAreaView className='font-bold text-lg'>
  //         {showUserInfo()}
  //         <Text>
  //           Welcome {user.name}
  //         </Text>
  //         <Image
  //           source={{ uri: user.picture }}
  //         />
  //       </SafeAreaView>
  //     )
  //   }
  // }


    //*     <SafeAreaView className='bg-blue-200 flex-1 w-full'>
    //* < Text > Y el boton ??</ >
    //*     <Button
    //*         title={accessToken ? "Get User Data" : "Login"}
    //*         onPress={accessToken ? fetchUserInfo : () => { promptAsync({ showInEvents: true }) }} />
    //* </SafeAreaView >