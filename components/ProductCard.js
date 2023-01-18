import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MapPinIcon, MinusCircleIcon, PlusCircleIcon, StarIcon } from 'react-native-heroicons/outline'
import useToggle from '../hooks/useToggle'

// import { urlFor } from '../sanity'


const ProductCard = ({ id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    price, }) => {
    const navigation = useNavigation()


    const { toggle, toggleFunction } = useToggle()
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Product', {
                    id,
                    imgUrl,
                    title,
                    rating,
                    genre,
                    address,
                    short_description,
                    price,
                })
            }}
            className={`mt-6 rounded-b-full ${toggle ? ' bg-yellow-500' : 'bg-blue-300'} rounded-xl mx-5 w-[200px] shadow-sm h-[300px] `}
        >
            <Image
                resizeMode='stretch'
                source={{
                    uri: imgUrl,
                }}
                // source={{
                //     uri: {imgUrl},
                // }}
                className="h-[160px]   rounded-xl rounded-b-none "
            />

            <View className={` px-3 pb-4  rounded-b-2xl`}>
                <Text className="font-bold text-gray-700 text-lg pt-2">{title}</Text>
                <View className="flex-row  items-right space-x-1">

                    <View className="flex-row items-center space-x-1">
                        <StarIcon color="black" opacity={0.4} size={22} />
                        <Text className='text-zinc-600'>{rating}</Text>
                    </View>
                </View>
                <Text className='text-md pt-2 font-medium text-gray-600'>{genre}</Text>
                <View>
                    {/* <Text className='text-gray-500'>$ {price} COP</Text> */}
                    {/* <MapPinIcon color='gray' /> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard
