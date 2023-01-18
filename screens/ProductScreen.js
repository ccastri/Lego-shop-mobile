import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
    ArrowLeftIcon,
    ChevronRightIcon,
    MapPinIcon, MinusCircleIcon,
    PlusCircleIcon,
    QuestionMarkCircleIcon,
    StarIcon,
    HeartIcon,
} from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import BasketIcon from '../components/BasketIcon'
import { addToBasket, removeFromBasket } from '../features/basketSlice';
import { getProducts, selectProductById } from '../features/productSlice'


export default RestaurantScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { params: {
        id,
    } } = useRoute()
    // console.log(id);
    const items = useSelector(state => getProducts(state))
    dispatch(itemByID)
    const itemByID = useSelector(state => selectProductById(state, id))
    console.log(itemByID[0].genre);
    //! Hay que revisar que pasa con ese title
    const addItemToBasket = () => {
        dispatch(addToBasket({ id }))
    }
    const removeItemFromBasket = () => {
        if (!items.length > 0) {
            return;
        }
        dispatch(removeFromBasket({ id, title, short_description, price, imgUrl }))
    }


    return (
        <>
            <BasketIcon
                onPress={() => { navigation.navigate('Basket') }}
            />
            <ScrollView>
                <View className="relative ">

                    <Image
                        source={{
                            uri: itemByID[0].imgUrl,
                        }}
                        resizeMode='stretch'
                        className="w-full h-[320]"
                    />
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className=" bg-gray-100 rounded-full absolute top-8 left-5 p-2" >
                        <ArrowLeftIcon size={20} color="red" />
                    </TouchableOpacity>
                </View>
                <View className='bg-white'>
                    <View className='px-4 pt-4'>
                        <Text className='text-3xl font-bold'>{itemByID[0].title}</Text>
                        <Text className='text-gray-500 mt-2 pb-4'>{itemByID[0].short_description}</Text>
                        <View className='flex-row space-x-2 my-1'>
                            <View className="flex-row items-center space-x-1">
                                <StarIcon size={22} color='green' opacity={0.4} />
                                <Text className=' text-xs font-bold text-gray-500'>
                                    <Text className='text-green-500'>{itemByID[0].rating}</Text> · {itemByID[0].genre}
                                </Text>
                            </View>
                            <View className='items-center w-full flex-row space-x-1'>
                                {/* <MapPinIcon color='gray' opacity={0.4} size={22} /> */}
                                <TouchableOpacity className='ml-[30%] '>
                                    <HeartIcon color='red' size={30} />
                                </TouchableOpacity>
                                <Text className='text-xs text-gray-500'>Add to wishlist</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity className=' flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                        <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
                        <Text className='flex-1 pl-2 text-md font-bold'> Looking for complementary sets?</Text>
                        <ChevronRightIcon color='blue' />
                    </TouchableOpacity>
                    <View className='pl-3 flex-row w-full items-center py-2 space-x-2'>
                        <TouchableOpacity>
                            <MinusCircleIcon
                                disabled={!items.length}
                                onPress={removeItemFromBasket}
                                // color='gray'
                                color={items.length > 0 ? 'gray' : 'red'}
                                size={40}
                            />
                        </TouchableOpacity>
                        {/* <Text>{items.length}</Text> */}
                        <Text>{items.length}</Text>
                        <TouchableOpacity>
                            <PlusCircleIcon
                                onPress={addItemToBasket}
                                color='green'
                                size={40}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text className='ml-[25%]'>Add it as much as you prefer</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </>
    )
}