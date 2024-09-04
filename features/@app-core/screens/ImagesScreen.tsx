import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Image, ScrollView } from '../components/styled'
import BackButton from '../components/BackButton'

/* --- Images ---------------------------------------------------------------------------------- */

const greenStackLogo = require('../assets/green-stack-logo.png')

/* --- <ImagesScreen/> ------------------------------------------------------------------------- */

const ImagesScreen = () => (
  <>
    <StatusBar style="light" />
    <ScrollView
      className="flex flex-1 min-h-screen bg-slate-800"
      contentContainerClassName="min-h-screen"
    >
      <View className="flex flex-1 min-h-screen py-16 justify-center items-center bg-slate-800">
        {/* - Example 1 - */}
        <Image
          src={greenStackLogo}
          alt="Example Green Stack Logo"
          width={60}
          height={60}
        />
        <Text className="mt-2 mb-4 text-gray-200 text-center text-base">
          <Text className="font-bold">src=static-require</Text>
          <Text> | width: 60 | height: 60</Text>
        </Text>
        {/* - Example 2 - */}
        <Image
          src="https://codinsonn.dev/_next/image?url=%2Fimg%2FCodelyFansLogoPic160x160.jpeg&w=256&q=75"
          alt="Example Profile picture"
          width={60}
          height={60}
        />
        <Text className="mt-2 mb-4 text-gray-200 text-center text-base">
          <Text className="font-bold">src=external-url</Text>
          <Text> | width: 60 | height: 60</Text>
        </Text>
        {/* - Example 3 - */}
        <View className="w-[60px] h-[80px] relative border-[1px] border-dashed border-gray-200">
          <Image src={greenStackLogo} alt="Example Green Stack Logo" fill />
        </View>
        <Text className="mt-2 mb-4 text-gray-200 text-center text-base">
          <Text>wrapper=50x80, </Text>
          <Text className="font-bold">relative | fill=true</Text>
        </Text>
        {/* - Example 4 - */}
        <View className="w-[80px] h-[60px] relative border-[1px] border-dashed border-gray-200">
          <Image
            src={greenStackLogo}
            alt="Example Green Stack Logo"
            contentFit="contain"
            fill
          />
        </View>
        <Text className="mt-2 mb-4 text-gray-200 text-center text-base">
          <Text>wrapper=80x60, </Text>
          <Text className="font-bold">relative | fill | contentFit=contain</Text>
        </Text>
      </View>
    </ScrollView>
    <BackButton backLink="/subpages/Universal%20Nav" />
  </>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default ImagesScreen
