import React from 'react'
import { View, Text, Image } from '../components/styled'
import BackButton from '../components/BackButton'

/* --- Images ---------------------------------------------------------------------------------- */

const greenStackLogo = require('../assets/green-stack-logo.png')

/* --- <ImagesScreen/> ------------------------------------------------------------------------- */

const ImagesScreen = () => (
  <View className="flex flex-1 justify-center items-center bg-slate-800">
    <BackButton backLink="/subpages/Universal%20Nav" />
    {/* - Example 1 - */}
    <Image
      src={greenStackLogo}
      alt="Example Green Stack Logo"
      width={60}
      height={60}
    />
    <Text className="mt-2 mb-4 text-gray-200 text-center text-base">src=static-require | width: 60 | height: 60</Text>
    {/* - Example 2 - */}
    <Image
      src="https://codinsonn.dev/_next/image?url=%2Fimg%2FCodelyFansLogoPic160x160.jpeg&w=256&q=75"
      alt="Example Profile picture"
      width={60}
      height={60}
    />
    <Text className="mt-2 mb-4 text-gray-200 text-center text-base">src=external-url | width: 60 | height: 60</Text>
    {/* - Example 3 - */}
    <View className="w-[60px] h-[80px] relative border-[1px] border-dashed border-gray-200">
      <Image src={greenStackLogo} alt="Example Green Stack Logo" fill />
    </View>
    <Text className="mt-2 mb-4 text-gray-200 text-center text-base">wrapper=50x80, relative | fill=true</Text>
    {/* - Example 4 - */}
    <View className="w-[80px] h-[60px] relative border-[1px] border-dashed border-gray-200">
      <Image
        src={greenStackLogo}
        alt="Example Green Stack Logo"
        contentFit="contain"
        fill
      />
    </View>
    <Text className="mt-2 mb-4 text-gray-200 text-center text-base">wrapper=80x60, relative | fill | contentFit=contain</Text>
  </View>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default ImagesScreen
