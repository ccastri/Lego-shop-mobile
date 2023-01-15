import { useNavigation, useRoute } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Image, SafeAreaView, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { ShoppingCartIcon, UserIcon } from 'react-native-heroicons/outline'
import { Alert } from 'react-native-web'
import { useSelector } from 'react-redux'
import FeaturedRow from '../components/FeaturedRow'
import { setProducts } from '../features/productSlice'
import { auth, db } from '../firebase'
import useToggle from '../hooks/useToggle'


const HomeScreen = () => {
    // const getProducts = async () => {
    //     try {
    //         const resp = await axios.get('https://my-json-server.typicode.com/ccastri/dummy-data/products');
    //         const data = await resp.data()
    //         setProducts(data)
    //         return data;
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }
    // const products = useSelector(state => setProducts(state))
    // console.log(JSON.stringify(products));
    const { toggle, toggleFunction } = useToggle()
    const navigation = useNavigation()
    // const {
    //     params: {
    //         id,
    //         imgUrl,
    //         title,
    //         rating,
    //         genre,
    //         short_description,
    //         price,
    //     },
    // } = useRoute()
    // const selecProduct =

    const user = auth.currentUser
    const products = useSelector(state => setProducts(state.product))
    // console.log(products.product)

    // !Sign Out method
    const logout = () => {
        signOut(auth).then(() => {
            console.log('You are signing out. Come back later')
            navigation.navigate('Login')
        }).catch((error) => {
            // An error happened.
            Alert.alert(error)
        });
    }
    // !Store user in db
    const setUser = async (user) => {
        // console.log(user);
        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            // id_token: user.id_token,
            timeStamp: serverTimestamp(),
        }
        )
    };

    user && useEffect(() => {
        setUser(user);
        // console.log(user)
    }, [user])


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
                    onPress={logout}
                    className={`ml-5${toggle ? ('bg-black') : ('bg-red-500')} p-2 rounded-full`} >
                    {user ?
                        (
                            <Image
                                source={{ uri: user.photoURL }}
                                className='h-14 w-14 rounded-full'
                            />
                        ) :
                        (<UserIcon
                            size={35}
                            color={`${toggle ? ('yellow') : ('gray')}`}
                            className={`${toggle ? ('bg-yellow-500') : ('bg-blue-300')}`} />
                        )
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { logout }}
                    className={`ml-5 p-2 ${toggle ? ('bg-black') : ('bg-red-600')} rounded-full`}  >
                    <Image
                        source={{ uri: 'https://graffica.info/wp-content/uploads/2019/03/04-LEGO-logo-1200x754.jpg' }}
                        className='h-10 w-10 rounded-full b' />
                </TouchableOpacity>
                <TouchableOpacity
                    className={`l-5 ${toggle ? ('bg-black') : ('bg-red-600')} p-2 rounded-full`} >
                    <ShoppingCartIcon
                        size={35}
                        color={`${toggle ? ('yellow') : ('#93C5FD')}`}
                        className='h-10 w-10 ' />
                </TouchableOpacity>
            </View>
            {/*Card Rows */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                className='pt-4 h-screen '>
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