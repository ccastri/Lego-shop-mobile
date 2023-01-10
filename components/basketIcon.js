import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
// import Currency from 'react-currency-formatter';


export default BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation()
    const basketTotal = useSelector(selectBasketTotal)

    if (items.length === 0) return null

    return (
        <View className='absolute bottom-10 w-full z-50'>
            <TouchableOpacity
                onPress={() => navigation.navigate('Basket')}
                className=' mx-5 bg-[#00ccbb] p-4 flex-row rounded-lg items-center space-x-1 justify-between'>
                <Text className=' text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
                    {items.length}
                </Text>
                <Text className=' font-extrabold text-lg text-white'>
                    View Basket
                </Text>
                <Text className=' text-lg text-white font-extrabold'>
                    {basketTotal}

                    {/* <Currency quantity={basketTotal} currency='COP' /> */}
                </Text>
            </TouchableOpacity>
        </View>
    )
}