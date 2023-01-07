import { View, Text, SafeAreaView, TouchableOpacity, Image, Switch, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import {
    AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon
} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import useToggle from '../hooks/useToggle'
import FeaturedRow from '../components/FeaturedRow'
// import { setProducts } from '../features/productSlice'
// import RestaurantCard from '../components/RestaurantCard'

const HomeScreen = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    short_description,
    price, }) => {
    const navigation = useNavigation()
    const { email, handleSignIn, password } = useAuth()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
    // const [products, setProducts] = useState([])
    // async function setProduct() {
    //     const response = await fetch('https://my-json-server.typicode.com/ccastri/dummy-data/products')
    //     if (!response.ok) {
    //         console.log(`HTTP error! status: ${response.status}`)
    //     }
    //     const data = await response.json()
    //     setProducts(data)
    //     console.log(products);

    // }
    // useEffect(() => {
    //     setProduct()

    // }, [])
    // TODO: FetchLegoMinifigs() from the legoMinifig reducer:
    // useEffect(() => {
    //     dispatch(setLegoMinifig({
    //         id,
    //         imgUrl,
    //         title,
    //         rating,
    //         category, 
    //         short_description,
    //         stock,
    //     }))
    // }, [dispatch])


    const { toggle, toggleFunction } = useToggle()
    // console.log(toggle)
    return (
        <SafeAreaView
            className={`${toggle ? ' bg-yellow-500' : 'bg-blue-300'}`}>
            {/* Session persistence */}
            {/* <Text>{`{Welcome ${email}`}</Text> */}
            {/* Header */}


            <View className={` flex-row items-center justify-between px-5`}>
                <View className=' z-50  '>

                    <Switch
                        // onClick={toggleFunction}
                        onValueChange={toggleFunction}
                        value={toggle}
                        className=' '

                    />
                </View>
                <TouchableOpacity
                    title='Login'
                    onPress={() => navigation.navigate('Login')}
                    // onPress={() => { handleSignOut }}
                    className='ml-5 bg-black p-2 rounded-full' >
                    <UserIcon size={35} color='gray' />
                </TouchableOpacity>
                <TouchableOpacity
                    title='Login'
                    onPress={() => navigation.navigate('Login')}
                    // onPress={() => { handleSignOut }}
                    className='ml-5 p-2 bg-black rounded-full' >
                    <Image
                        source={{ uri: 'https://graffica.info/wp-content/uploads/2019/03/04-LEGO-logo-1200x754.jpg' }}
                        className='h-10 w-10 rounded-full b' />
                </TouchableOpacity>
                <TouchableOpacity
                    title='Cart'
                    // onPress={() => navigation.navigate('Cart')}

                    className='ml-5 bg-black p-2 rounded-full' >
                    <ShoppingCartIcon
                        size={35}
                        color='gray'
                        className='h-10 w-10 ' />
                </TouchableOpacity>

            </View>
            <ScrollView

                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                className='pt-4 h-screen '>

                {/* <RestaurantCard
                    key={1}
                    id={10}
                    imgUrl='https://links.papareact.com/gn7'
                    title='pglo'
                    rating={5}
                    genre='pglo'

                    short_description='pglo'


                    price={0}
                /> */}
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