import { View, Text } from 'react-native'
import React from 'react'

const SignUpScreen = () => {
    return (
        <View>
            <TouchableOpacity
                className='absolute mx-[25%] items-center bottom-40 w-52 bg-white p-4 rounded-2xl'
                onPress={handleSignIn}
            >
                <Text className='text-xl font-bold text-center'>Sign in </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUpScreen