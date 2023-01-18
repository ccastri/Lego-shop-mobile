import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { selectProduct } from '../features/productSlice'
import { XCircleIcon } from 'react-native-heroicons/outline'
// import { urlFor } from '../sanity'
// import Currency from 'react-currency-formatter';

const BasketScreen = () => {
    const navigation = useNavigation()
    const product = useSelector(selectProduct)
    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const dispatch = useDispatch();
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const productT = JSON.stringify(product)
    // console.log(productT)
    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results
        }, {});

        setGroupedItemsInBasket(groupedItems)
        // console.log(groupedItemsInBasket);
    }, [items])

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-100'>
                <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
                    <Text className='text-lg font-bold text-center'> Basket</Text>
                    {/* <Text className='text-center text-gray-400'>{productt.product.basket.items[0].name}</Text> */}
                </View>

                <TouchableOpacity
                    onPress={navigation.goBack}
                    className='rounded-full bg-gray-100 absolute top-3 right-5'
                >
                    <XCircleIcon color='#00ccbb' height={50} width={50} />
                </TouchableOpacity>

                <View className='flex-row px-4 space-x-4 items-center py-3 bg-white my-5'>
                    <Image source={{
                        uri: 'https://links.papareact.com/wru',
                    }}
                        height={50} width={50}
                        className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                    />
                    <Text className='flex-1'>Deliver in 30-45 min</Text>
                    <TouchableOpacity >
                        <Text className='text-[#00ccbb]'>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className='divide-y divide-gray-200'>
                    {/* Como el reduce nos entrega un objeto extraigo los key y los objetos para mapear y mostrar data */}
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                        <View
                            key={key}
                            className='flex-row items-center space-x-3 bg-white py-2 px-5'
                        >
                            <Text>{items.length} X</Text>
                            {/* <Image
                                source={{
                                    uri: urlFor(items[0]?.image).url(),
                                }}
                                className='h-12 w-12 rounded-full'
                            /> */}
                            <Text className='flex-1'>{items[0].name}</Text>
                            <Text className='text-gray-600'>
                                {/* <Currency quantity={items[0]?.price} currency='COP' /> */}
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    className='text-[#00ccbb] text-xs'
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                >
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View className='p-5 bg-white mt-5 space-y-4'>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Subtotal</Text>
                        <Text className='text-gray-400'>
                            {/* <Currency quantity={basketTotal} currency='COP' /> */}
                        </Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Delivery Fee</Text>
                        <Text className='text-gray-400'>
                            {/* <Currency quantity={5000} currency='COP' /> */}
                        </Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='   '>Order Total</Text>
                        <Text className='font-extrabold'>
                            {/* <Currency quantity={basketTotal + 5000} currency='COP' /> */}
                        </Text>
                    </View>
                    <TouchableOpacity
                        className='rounded-lg bg-[#00ccbb] p-4'
                    // onPress={() => navigation.navigate('PreparingOrder')}
                    >
                        <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default BasketScreen