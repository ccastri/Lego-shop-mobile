import { useState, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
// import sanityClient from '../sanity'
// import restaurant from '../deliveroo-clone/schemas/restaurant'
import ProductCard from './ProductCard'
import axios from "axios";
import useToggler from '../hooks/useToggle';


const FeaturedRow = ({ id, title, description }) => {
    // const [products, setProducts] = useState([])
    const { toggle, toggleFunction } = useToggler()


    //         // look for featured and only give 
    //         // me the info (dishes per restaurant)
    //         //  from the first [0] id that matches!
    //         `
    // *[_type == 'featured' && _id == $id]{ 
    //             ...,
    //             restaurants[]->{
    //             ...,
    //               dishes[]->,
    //                 type->{
    //                   name
    //                 }
    //             },
    // }[0]`,
    //         { id } //

    //     ).then(data => { setRestaurants(data?.restaurants) })
    // }, [id])
    const [products, setProducts] = useState([])
    async function setProduct() {
        const response = await fetch('https://my-json-server.typicode.com/ccastri/dummy-data/products')
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setProducts(data)
        // console.log(products.imgUrl);

    }
    useEffect(() => {
        setProduct()

    }, [])
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
                {/* <ProductCard
                    key={6}
                    id={10}
                    imgUrl='https://links.papareact.com/gn7'
                    title='Set Lego City'
                    rating={5}
                    genre='pglo'
                    short_description='pglo'

                    price={10000}
                />
                <ProductCard
                    key={2}
                    id={10}
                    imgUrl='https://links.papareact.com/gn7'
                    title='pglo'
                    rating={5}
                    genre='pglo'
                    short_description='pglo'

                    price={10000}
                />
                <ProductCard
                    key={3}
                    id={10}
                    imgUrl='https://links.papareact.com/gn7'
                    title='pglo'
                    rating={5}
                    genre='pglo'
                    short_description='pglo'

                    price={10000}
                />
                <ProductCard
                    key={1}
                    id={10}
                    imgUrl='https://links.papareact.com/gn7'
                    title='pglo'
                    rating={5}
                    genre='pglo'
                    short_description='pglo'
                    price={10000}
                /> */}
                {/* <RestaurantCard
                    key={1}
                    id={10}
                    imgUrl='https://links.papareact.com/gn7'
                    title='pglo'
                    rating={5}
                    genre='pglo'
                    short_description='pglo'

                    price={10000}*/}


            </ScrollView>
        </View>
    )
}

export default FeaturedRow
