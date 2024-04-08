import React from 'react'
import { View, Text, Image, Link } from '../components/styled'

/* --- <ImagesScreen/> --------------------------------------------------------------------------- */

const ImagesScreen = () => {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Link
        href="/"
        className="text-blue-500 absolute top-8 web:top-0 left-0 p-4"
      >
        {`< Back`}
      </Link>
      {/* - 1 - */}
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} />
      <Text className="mt-2 mb-4 text-center text-base">src=static-require | width: 60 | height: 60</Text>
      {/* - 2 - */}
      <Image src="https://codinsonn.dev/_next/image?url=%2Fimg%2FCodelyFansLogoPic160x160.jpeg&w=256&q=75" width={60} height={60} />
      <Text className="mt-2 mb-4 text-center text-base">src=external-url | width: 60 | height: 60</Text>
      {/* - 3 - */}
      <View className="w-[60px] h-[80px] relative border-[1px] border-dashed border-black">
        <Image src={require('../assets/aetherspaceLogo.png')} fill />
      </View>
      <Text className="mt-2 mb-4 text-center text-base">wrapper=50x80, relative | fill=true</Text>
      {/* - 4 - */}
      <View className="w-[80px] h-[60px] relative border-[1px] border-dashed border-black">
        <Image src={require('../assets/aetherspaceLogo.png')} fill contentFit="contain" />
      </View>
      <Text className="mt-2 mb-4 text-center text-base">wrapper=80x60, relative | fill | contentFit=contain</Text>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default ImagesScreen
