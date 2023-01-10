import { View, Text, SafeAreaView, TouchableOpacity, Image, Switch, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import {
    AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon
} from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
// import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import useToggle from '../hooks/useToggle'
import FeaturedRow from '../components/FeaturedRow'
// import { Alert } from 'react-native-web'
import { app, auth } from '../firebase'


const HomeScreen = (
) => {
    const navigation = useNavigation()
    // const auth = getAuth(app)
    const user = auth.currentUser
    // console.log(user.email)


    // !Sign Out method
    const logout = () => {
        signOut(auth).then(() => {
            console.log('You are signing out. Come back later')
            navigation.navigate('Login')
        }).catch((error) => {
            // An error happened.
            // Alert.alert(error)
        });
    }
    const { toggle, toggleFunction } = useToggle()
    // console.log(toggle)


    return (
        <SafeAreaView
            className={`${toggle ? ' bg-yellow-500' : 'bg-blue-300'}`}>
            <View className={` flex-row items-center justify-between px-5`}>
                <Switch
                    onValueChange={toggleFunction}
                    value={toggle}
                    className={`rounded-full ${toggle ? ('bg-yellow-500') : ('bg-blue-300')}`}
                />

                <TouchableOpacity
                    title='Login'
                    // onPress={() => navigation.navigate('Login')}
                    onPress={logout}
                    className={`ml-5${toggle ? ('bg-black') : ('bg-red-500')} p-2 rounded-full`} >
                    {
                        user ?
                            (
                                <View className='items-center'>
                                    <Image
                                        source={{ uri: user.photoURL }}
                                        className='h-14 w-14 rounded-full'
                                    />
                                    <Text>We're in production mate {user.displayName}</Text>
                                </View>
                            ) :
                            (<UserIcon size={35} color={`${toggle ? ('yellow') : ('gray')}`} />
                            )}
                </TouchableOpacity>
                <TouchableOpacity
                    title='Login'
                    // onPress={() => navigation.navigate('Login')}
                    onPress={() => { logout }}
                    className={`ml-5 p-2 ${toggle ? ('bg-black') : ('bg-red-600')} rounded-full`}  >
                    <Image
                        source={{ uri: 'https://graffica.info/wp-content/uploads/2019/03/04-LEGO-logo-1200x754.jpg' }}
                        className='h-10 w-10 rounded-full b' />
                </TouchableOpacity>
                <TouchableOpacity
                    title='Cart'
                    // onPress={() => navigation.navigate('Cart')}

                    className={`l-5 ${toggle ? ('bg-black') : ('bg-red-600')} p-2 rounded-full`} >
                    <ShoppingCartIcon
                        size={35}
                        color={`${toggle ? ('yellow') : ('#93C5FD')}`}
                        className='h-10 w-10 ' />
                </TouchableOpacity>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                className='pt-4 h-screen '>
                <View className='flex-row items-center px-4 space-x-4 pb-4'>
                    {/* <Image source={{ uri: route.params.user.imgUrl }}
                        className='h-10 w-10 rounded-full b'
                        onPress={logout}
                    /> */}

                    {/* <Text className='font-semibold text-gray-600'>Hi! {route.params.user.name}. thanks for being here</Text> */}
                </View>
                {/* } */}
                <FeaturedRow
                    key={11}
                    id={11}
                    title='Adventure'
                    description='Last Arrivals for ADVENTURE'
                />
                <FeaturedRow
                    key={22}
                    id={22}
                    title='Shopping promo'
                    description=' Buy those clothes you may like'
                />
                <FeaturedRow
                    key={33}
                    id={33}
                    title='ADDS'
                    description='Some advertising campaign to get some founds'
                />


            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen