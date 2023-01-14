import { useState, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
// import sanityClient from '../sanity'
// import restaurant from '../deliveroo-clone/schemas/restaurant'
import ProductCard from './ProductCard'
import axios from "axios";
import useToggle from '../hooks/useToggle';


const FeaturedRow = ({ id, title, description }) => {
    // const [products, setProducts] = useState([])
    const { toggle, toggleFunction } = useToggle()
    const [products, setProducts] = useState([])

    return (
        <View className={`${toggle ? 'bg-black' : 'bg-red-600'} items-start `}>
            <View className={`mt-4 mx-8 px-4 rounded-xl ${toggle ? 'bg-yellow-500' : 'bg-blue-300'}`}>
                <Text className='font-bold text-white text-2xl'>{title}</Text>
                <Text className={`items-start font-medium text-lg ${toggle ? 'text-zinc-500' : 'text-zinc-500'}`}>{description}</Text>
                {/* {/* <ArrowRightIcon color='#00CCBB' /> */}
            </View>

            <ScrollView
                horizontal
                className=' m-4 '
                contentContainerStyle={{

                }}>

                {products?.map(product => (


                    <ProductCard
                        key={product.id} // number
                        id={product.id} //string
                        imgUrl={product.imgUrl} //convierto a string en restaurantCard
                        title={product.title} // string
                        rating={product.rating} //number
                        genre={product.genre} // string

                        address={product.address} // string
                        short_description={product.short_description} // string
                        // dishes={restaurant.dishes} // string
                        // long={restaurant.long} // number
                        price={product.price} // number

                    />
                ))
                }
            </ScrollView>
        </View>
    )
}

export default FeaturedRow
